const User = require("../models/User");
const Book = require("../models/Book");
const Review = require("../models/Review");
const UserBook = require("../models/UserBook");
const Comment = require("../models/Comments");
const verify = require("../middleware/verify");
const router = require("express").Router();
const axios = require("axios");

//GET EVERY BOOK FROM DB
router.get("/all/books", async (req, res) => {
  try {
    const books = await Book.find({});
    const filtered = books.filter(
      (f) =>
        !f.title
          .toUpperCase()
          .indexOf(req.query.filter.toUpperCase() || !f.approved)
    );
    //console.log(filtered);
    res.status(200).json(filtered);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

//USER BOOK UPLOAD
router.post("/upload2", async (req, res) => {
  try {
    const userId = await User.findOne({ username: req.body.username });
    const newReview = new Review({
      userBookId: "placeholder",
      userId: userId._id,
      text: req.body.review.text,
      rating: req.body.review.rating,
    });

    const review = await newReview.save();

    const newBook = new UserBook({
      bookId: req.body.bookId,
      google: req.body.google,
      userId: userId._id,
      review: review._id,
      cover: req.body.cover,
    });
    const book = await newBook.save();

    await Review.findByIdAndUpdate(
      { _id: review._id },
      { userBookId: book._id },
      { new: true }
    );
    await User.findByIdAndUpdate(
      { _id: userId._id },
      { $addToSet: { books: book._id } },
      { new: true }
    );
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//ADD BOOK SUGGESTION
router.post("/suggestion", async (req, res) => {
  try {
    await Book.create({
      title: req.body.book.title,
      authors: req.body.book.authors,
      edition: req.body.book.edition,
      pages: req.body.book.pages,
      genre: req.body.book.genre,
      cover: req.body.book.cover,
      google: false,
      submittedBy: req.body.username,
    });

    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//ACCEPT BOOK SUGGESTION
router.put("/suggestion/approve/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.approved = true;
    book.save();
    res.status(200).json("APPROVED");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

//ACCEPT BOOK SUGGESTION
router.delete("/suggestion/denie/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json("DELETED");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

//UPDATE BOOK REVIEW
router.put("/:id", async (req, res) => {
  try {
    const userbook = await UserBook.findById(req.params.id);
    req.body.cover && (userbook.cover = req.body.cover);
    userbook.save();

    const review = await Review.findById(userbook.review);

    req.body.text && (review.text = req.body.text);
    req.body.rating && (review.rating = req.body.rating);
    review.save();
    return res.status(200).json("OK");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});
//GET ALL BOOKS FROM USER
router.get("/all/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const books = await UserBook.find({ userId: user._id });
    const userBooks = await Promise.all(
      books.map(async (book) => {
        let bookInfo;

        if (book.google) {
          const url =
            "https://www.googleapis.com/books/v1/volumes?fields=items(volumeInfo(title,authors,publishedDate,pageCount,categories,imageLinks,industryIdentifiers))&maxResults=10&q=isbn:";
          bookInfo = await axios.get(`${url}${book.bookId}`);
        } else {
          const res = await Book.findById(book.bookId);

          bookInfo = {
            title: res.title,
            authors: res.authors,
            publishedDate: res.edition,
            pageCount: res.pages,
            categories: res.genre,
          };
        }
        const cover = book.cover;
        const review = await Review.findOne({ userBookId: book._id });

        return {
          bookId: book.bookId,
          review,
          cover,
          bookInfo: bookInfo?.data?.items[0]?.volumeInfo || bookInfo,
        };
        //return { review, cover, bookInfo };
      })
    );

    res.status(200).json(userBooks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

//GET PENDINGS BOOKS
router.get("/pending", async (req, res) => {
  try {
    const books = await Book.find({ approved: false });
    console.log(books);
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
});

//GET A SINGLE BOOK
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET COMMENTS ON A BOOK
router.get("/comments/:id", async (req, res) => {
  try {
    const comments = await (
      await Comment.find({ userBookId: req.params.id })
    ).reverse();
    const assembledComments = await Promise.all(
      comments.map(async (comment) => {
        const date = comment.createdAt.toLocaleString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const user = await User.findById(comment.userId);
        const text = comment.text;
        const { _id } = comment;
        const { username, avatar } = user;
        return { username, avatar, text, date, _id };
      })
    );
    return res.status(200).json(assembledComments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

//ADD A COMMENT
router.post("/comment", async (req, res) => {
  try {
    // Get user id
    const user = await User.findOne({ username: req.body.username });
    //Assemble comment
    const newComment = new Comment({
      userBookId: req.body.userBook,
      userId: user._id,
      text: req.body.comment,
    });

    const submittedComment = await newComment.save();

    const { avatar, username } = user;
    const date = submittedComment.createdAt.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const { text, _id } = submittedComment;

    return res.status(200).json({ avatar, username, text, date, _id });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//DELETE COMMENT
router.delete("/comment/:id", async (req, res) => {
  try {
    await Comment.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
module.exports = router;
