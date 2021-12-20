import { useState, useEffect } from "react";
import { Header } from "../index";
import axios from "axios";
import { Button, Modal, Grid, Typography } from "@mui/material";
import useStyles from "./SearchBooksStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const SearchBooks = ({ autoFill, title, setModal }) => {
  const [books, setBooks] = useState([]);
  //const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModal(false);
  };
  const classes = useStyles({});
  const getBooks = async (title) => {
    //setBooks(title.replace("+", " "));
    const url = "https://www.googleapis.com/books/v1/volumes";
    const fields =
      "?fields=items(volumeInfo(title,authors,publishedDate,pageCount,categories,imageLinks,industryIdentifiers))&maxResults=10&q=intitle:";
    try {
      const result = await axios.get(`${url}${fields}${title}`);
      setBooks(result.data.items);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (book) => {
    const payload = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      genre: book.volumeInfo.categories,
      cover: book.volumeInfo.imageLinks?.thumbnail,
      edition: book.volumeInfo.publishedDate,
      pages: book.volumeInfo.pageCount,
      bookId: book.volumeInfo.industryIdentifiers[1].identifier,
    };

    autoFill(payload);
    handleClose();
  };

  useEffect(() => {
    getBooks(title);
  }, []);

  return (
    <div>
      <Modal
        open={open}
        sx={{ overflow: "scroll" }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className={classes.modal}>
            <Grid container sx={{ border: "2px solid #000" }}>
              {books?.map((book) => (
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  key={book.id}
                  className={classes.bookPreview}
                  onClick={() => handleClick(book)}
                >
                  <img
                    src={book?.volumeInfo?.imageLinks?.thumbnail}
                    alt=""
                    className={classes.thumbnail}
                  />
                  <div className={classes.bookInfo}>
                    <p>{book?.volumeInfo?.title}</p>
                    <p>{book?.volumeInfo?.authors}</p>
                  </div>
                </Grid>
              ))}
            </Grid>
            <div className={classes.button}>
              <Button className={classes.button} variant="contained">
                {" "}
                CLOSE MODAL{" "}
              </Button>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default SearchBooks;
