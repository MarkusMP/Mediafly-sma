import axios from "axios";
import { IUpdatedProfile } from "./profileSlice";

const getProfileById = async (id: string) => {
  const response = await axios.get(`/api/profile/${id}`);

  return response.data;
};

const getProfileByUsername = async (username: string) => {
  const response = await axios.get(`/api/profile/username/${username}`);

  return response.data;
};

export const deleteProfile = async (token: string) => {
  const response = await axios.delete("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateProfile = async (updatedProfile: IUpdatedProfile) => {
  const response = await axios.put(
    "/api/profile",
    {
      ...(updatedProfile.username && { username: updatedProfile.username }),
      firstName: updatedProfile.firstName,
      lastName: updatedProfile.lastName,
      bio: updatedProfile.bio,
      profile_image: updatedProfile.profile_image,
    },
    {
      headers: {
        Authorization: `Bearer ${updatedProfile.token}`,
      },
    }
  );

  return response.data;
};

const profileService = {
  getProfileById,
  deleteProfile,
  getProfileByUsername,
  updateProfile,
};

export default profileService;
