// src/services/file-upload.service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: `${import.meta.env.VITE_SERVER_URL}`
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

// Configuring of USER - uploadUserImage
const uploadUserImage = (userPicture) => {
  return api.post("/uploaduserpicture", userPicture)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  uploadUserImage
};
