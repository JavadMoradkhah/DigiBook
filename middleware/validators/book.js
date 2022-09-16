const path = require('path');
const { unlink } = require('fs').promises;
const Genre = require('../../models/Genre');
const { BookSchema } = require('../../schemas/Book');

module.exports = async (req, res, next) => {
  try {
    const uploadedFilePath = path.resolve(process.cwd(), `./public/uploads/${req.file.filename}`);

    const validation = BookSchema.validate(req.body);
    if (validation.error) {
      await unlink(uploadedFilePath);
      return res.status(400).json({ status: 'fail', message: validation.error.message });
    }

    const genre = await Genre.findByPk(req.body.genre_id);
    if (!genre) {
      await unlink(uploadedFilePath);
      return res.status(400).json({ status: 'fail', message: 'Invalid genre Id.' });
    }

    next();
  } catch (error) {
    next(error);
  }
};
