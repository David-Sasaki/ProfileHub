from fastapi import FastAPI, HTTPException, status
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List, Optional
from pymongo import MongoClient
from pymongo.collection import ReturnDocument
from bson import ObjectId
import os

app = FastAPI()

# MongoDB connection
client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017'))
db = client['profile_management']
profiles_collection = db.profiles

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, schema):
        schema.update(type='string')

class Profile(BaseModel):
    id: Optional[PyObjectId] = None
    first_name: str
    last_name: str

    class Config:
        json_encoders = {
            ObjectId: str
        }
        json_schema_extra = {
            "example": {
                "first_name": "John",
                "last_name": "Doe"
            }
        }

@app.post("/profiles/", response_model=Profile, status_code=status.HTTP_201_CREATED)
def create_profile(profile: Profile):
    new_profile = jsonable_encoder(profile)
    new_profile_id = profiles_collection.insert_one(new_profile).inserted_id
    created_profile = profiles_collection.find_one({"_id": new_profile_id})
    return created_profile

@app.get("/profiles/{profile_id}", response_model=Profile)
def read_profile(profile_id: PyObjectId):
    profile = profiles_collection.find_one({"_id": profile_id})
    if profile is not None:
        return profile
    raise HTTPException(status_code=404, detail=f"Profile {profile_id} not found")

@app.put("/profiles/{profile_id}", response_model=Profile)
def update_profile(profile_id: PyObjectId, profile: Profile):
    updated_profile = profiles_collection.find_one_and_update(
        {"_id": profile_id},
        {"$set": jsonable_encoder(profile)},
        return_document=ReturnDocument.AFTER
    )
    if updated_profile is not None:
        return updated_profile
    raise HTTPException(status_code=404, detail=f"Profile {profile_id} not found")

@app.delete("/profiles/{profile_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_profile(profile_id: PyObjectId):
    delete_result = profiles_collection.delete_one({"_id": profile_id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Profile {profile_id} not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
