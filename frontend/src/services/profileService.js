import axios from "axios";

const API =
"http://localhost:5000/api/users/profile";

export const getProfile =
async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.get(
      API,
      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

  return response.data;
};

export const updateProfile =
async (profileData) => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.put(
      API,
      profileData,
      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }
    );

  return response.data;
};