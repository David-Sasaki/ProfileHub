import React, { useState } from "react";
import ProfileList from "./components/ProfileList";
import ProfileForm from "./components/ProfileForm";
import { Profile } from "./types/profileTypes";

const App: React.FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-center text-3xl font-bold py-4">
        Profile Management
      </h1>
      <div className="flex flex-col md:flex-row justify-around items-start">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
          <ProfileList
            setEditing={setEditing}
            setSelectedProfile={setSelectedProfile}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          {editing && (
            <ProfileForm profile={selectedProfile} setEditing={setEditing} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
