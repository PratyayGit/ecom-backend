const fs = require("fs");
const path = require("path");

const uploadImage = (imagePath) => {
  try {
    const image = fs.readFileSync(path.resolve(imagePath));
    const adminProfilePicture = image.toString("base64");

    return adminProfilePicture;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  uploadImage,
};
