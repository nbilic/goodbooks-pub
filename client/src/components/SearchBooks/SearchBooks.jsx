import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import axios from "axios";
import useStyles from "./SearchBookStyles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Header, SuggestedBook, SearchBooksInputField } from "../index";
import apiUrl from "../apiUrl";
const Test = () => {
  const [books, setBooks] = useState([]);
  const classes = useStyles({});
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const getBooks = async () => {
    const url = "https://www.googleapis.com/books/v1/volumes";
    const fields =
      "?fields=items(id,volumeInfo(title,authors,averageRating,ratingsCount,publishedDate,pageCount,categories,imageLinks,industryIdentifiers))&maxResults=40&q=intitle:";
    try {
      const result = await axios.get(`${url}${fields}${title}`);
      const filtered = result.data.items.filter((f) => {
        let isbn = false;
        let cover = f.volumeInfo?.imageLinks?.thumbnail || null;
        let title = f.volumeInfo?.title || null;
        let authors = f.volumeInfo?.authors || null;
        f?.volumeInfo?.industryIdentifiers?.forEach((id) => {
          if (["ISBN_13", "ISBN_10"].includes(id.type)) isbn = true;
        });
        if (isbn && cover && title && authors) return f;
      });

      const res = await axios.get(`${apiUrl}/api/books/all/books`, {
        params: { filter: title },
      });
      setError(false);
      setBooks([...res.data, ...filtered]);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const notify = () => {
    return toast.success("Book added!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div>
      <Header />
      <Paper elevation={10} className={classes.container}>
        <SearchBooksInputField
          setTitle={setTitle}
          title={title}
          getBooks={getBooks}
        />
        {error && "No results match parameters"}
        {!error && (
          <Grid container className={classes.modal}>
            {books?.map((book, index) => (
              <SuggestedBook book={book} key={book.id} notify={notify} />
            ))}
          </Grid>
        )}
      </Paper>
      <ToastContainer />
    </div>
  );
};

export default Test;
