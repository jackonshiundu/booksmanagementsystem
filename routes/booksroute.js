const express = require('express');
const {
  addBook,
  getSpacificBook,
  updateBook,
  deleteBook,
  getAllBooks,
} = require('../controllers/Bookcontroler');
const { verifyUser } = require('../middlewares/authmiddleware');

const router = express.Router();
router.post('/addbook/:id', verifyUser, addBook);
router.get('/getallbooks', getAllBooks);
router.get('/:bookid/:id', verifyUser, getSpacificBook);
router.patch('/:bookid/:id', verifyUser, updateBook);
router.delete('/:bookid/:id', verifyUser, deleteBook);

module.exports = router;
