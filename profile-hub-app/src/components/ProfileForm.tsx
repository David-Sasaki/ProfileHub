import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProfile, updateProfile } from "../redux/actions";
import { Profile } from "../types/profileTypes";

interface ProfileFormProps {
  profile?: Profile | null;
  setEditing: (editing: boolean) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, setEditing }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [profile]);

  const handleSubmit = () => {
    const newProfile = { firstName, lastName };
    if (profile && profile.id) {
      dispatch(updateProfile(profile.id, newProfile));
    } else {
      dispatch(createProfile(newProfile));
    }
    setEditing(false);
  };

  return (
    <div className="p-4 shadow-lg rounded bg-white">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="first-name"
        >
          First Name
        </label>
        <input
          id="first-name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="last-name"
        >
          Last Name
        </label>
        <input
          id="last-name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {profile ? "Update" : "Create"}
      </button>
    </div>
  );
};

export default ProfileForm;
