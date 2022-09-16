const multer = require('multer');
const path = require('path');
const { mkdir } = require('fs').promises;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destination = path.resolve(process.cwd(), './public/uploads');
    await mkdir(destination, { recursive: true });
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1];
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
    cb(null, fileName);
  },
});

const limits = {
  fileSize: 1024 ** 2 * 2, // 2MB
};

const fileFilter = (req, file, cb) => {
  const extensions = ['image/jpg', 'image/jpeg', 'image/png'];

  if (!extensions.includes(file.mimetype)) {
    cb(null, false);
  }

  cb(null, true);
};

module.exports = multer({ storage, limits, fileFilter });
