const Booksmodel = require('../model/Booksmodel');
const { v4: uuidv4 } = require('uuid');
const createError = require('../middlewares/error');

const addBook = async (req, res, next) => {
  const { Title, Author, Gener, PublishDate, Description } = req.body;

  try {
    if (!Title && !Author && !Gener && !PublishDate && !Description) {
      return next(createError(404, "Please Provide all the books's details"));
    }
    const RandomId = uuidv4();
    const createdBooks = await Booksmodel.create({
      ID: RandomId,
      Title: Title,
      Author: Author,
      Gener: Gener,
      PublishDate: PublishDate,
      Description: Description,
    });

    res
      .status(200)
      .json({ result: createdBooks, message: 'Created Successfully' });
  } catch (error) {
    next(error);
  }
};

const getSpacificBook = async (req, res, next) => {
  const { bookid } = req.params;

  try {
    const bookResponse = await Booksmodel.find({ ID: bookid });
    if (bookResponse.length === 0) {
      return next(createError(404, 'The Book with that id is no in Store'));
    }
    return res.status(202).json({ result: bookResponse });
  } catch (error) {
    next(error);
  }
};
const getAllBooks = async (req, res, next) => {
  try {
    const bookResponse = await Booksmodel.find();
    if (bookResponse.length === 0) {
      return next(createError(404, 'There are no books'));
    }
    return res.status(202).json({ result: bookResponse });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  const { bookid } = req.params;
  const { Title, Author, Gener, PublishDate, Description } = req.body;
  try {
    const bookResponse = await Booksmodel.findOneAndUpdate(
      { ID: bookid },
      {
        $set: {
          Title: Title,
          Author: Author,
          Gener: Gener,
          PublishDate: PublishDate,
          Description: Description,
        },
      },
      { new: true }
    );
    if (!bookResponse) {
      return next(
        createError(
          404,
          'The Book that you are trying to update is not in Store'
        )
      );
    }
    return res.status(202).json({ result: bookResponse });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteBook = async (req, res, next) => {
  const { bookid } = req.params;

  try {
    const bookResponse = await Booksmodel.findOneAndDelete({ ID: bookid });
    if (!bookResponse) {
      return next(
        createError(404, 'The Book you are trying to delete is not in Store')
      );
    }
    return res
      .status(202)
      .json({ Message: 'The book was deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  getSpacificBook,
  updateBook,
  deleteBook,
  getAllBooks,
};
