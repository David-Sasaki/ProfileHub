import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProfile } from "../redux/actions";
import { Profile } from "../types/profileTypes";
import { AppState } from "../redux/store";

interface ProfileListProps {
  setEditing: (editing: boolean) => void;
  setSelectedProfile: (profile: Profile | null) => void;
}

const ProfileList: React.FC<ProfileListProps> = ({
  setEditing,
  setSelectedProfile,
}) => {
  const profiles = useSelector((state: AppState) => state.profiles);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteProfile(id));
  };

  const handleEdit = (profile: Profile) => {
    setSelectedProfile(profile);
    setEditing(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-lg w-full">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-md shadow-md"
          >
            <div>
              <span className="text-lg font-semibold">
                {profile.firstName} {profile.lastName}
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(profile)}
                className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:bg-blue-200"
              >
                Edit
              </button>
              <button
                onClick={() => profile.id && handleDelete(profile.id)}
                className="px-4 py-2 text-sm font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            setEditing(true);
            setSelectedProfile(null);
          }}
          className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Create New Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileList;
