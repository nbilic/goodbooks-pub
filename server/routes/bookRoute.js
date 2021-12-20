const User = require("../models/User");
const Book = require("../models/Book");
const Review = require("../models/Review");
const UserBook = require("../models/UserBook");
const Comment = require("../models/Comments");
const verify = require("../middleware/verify");
const router = require("express").Router();
const axios = require("axios");
//Admin book upload
router.post("/upload", verify, async (req, res) => {
  if (req.body.isAdmin) {
    try {
      const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors,
        publisher: req.body.publisher,
        description: req.body.description,
        language: req.body.language,
      });

      const book = await newBook.save();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("Only admin can upload a new book");
  }
});

//User book upload
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

//get all books from user
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
          // FOR LATER
        }
        const cover = book.cover;
        const review = await Review.findOne({ userBookId: book._id });

        return {
          review,
          cover,
          bookInfo: bookInfo.data.items[0].volumeInfo,
        };
        //return { review, cover, bookInfo };
      })
    );

    res.status(200).json(userBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//get a single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get comments on a user book
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
//Add a comment
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

//Delete a comment
router.delete("/comment/:id", async (req, res) => {
  try {
    await Comment.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
module.exports = router;
