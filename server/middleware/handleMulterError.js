const multer = require("multer");

function handleMulterError(err, req, res, next) {
  console.log(err);
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File is too large." });
    }
  }
  next(err);
}
module.exports = handleMulterError;
