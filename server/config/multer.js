const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/svg" ||
      file.mimetype === "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error("Only .png .jpg  .jpeg and .svg uploads allowed.")
      );
    }
  },
}).single("file");

module.exports = upload;
