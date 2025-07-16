const multer = require("multer");
const path = require("path");

// Папка для сохранения загруженных изображений
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //  папка uploads в корне проекта
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    // Можно проверить тип файла
    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

module.exports = upload;
