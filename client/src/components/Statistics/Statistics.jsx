import useStyles from "./StatisticsStyles";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useState } from "react";
import apiUrl from "../apiUrl";
//const apiUrl = "https://goodbooks-550.herokuapp.com";
//const apiUrl = "http://localhost:8080";

const Statistics = ({ user, setStatistics }) => {
  const classes = useStyles({});
  const [pagesRead, setPagesRead] = useState(0);
  const [booksRead, setBooksRead] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getGenre = (array) => {
      if (array.length == 0) return null;
      let modeMap = {};
      let maxEl = array[0].bookInfo.categories,
        maxCount = 1;
      for (let i = 0; i < array.length; i++) {
        let el = array[i].bookInfo.categories;
        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }
      return maxEl;
    };
    const getStats = async () => {
      let bookCounter = 0,
        pageCounter = 0,
        averageRatingCounter = 0;
      try {
        const books = await axios.get(`${apiUrl}/api/books/all/${user}`);

        books.data.forEach((book) => {
          bookCounter++;
          pageCounter += +book.bookInfo.pageCount;
          averageRatingCounter += +book.review.rating;
        });

        setFavoriteGenre(getGenre(books.data));
        setBooksRead(bookCounter);
        setPagesRead(pageCounter);
        setAverageRating(
          Math.round((averageRatingCounter / bookCounter) * 100) / 100
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, []);

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  return (
    <div className={classes.container}>
      <ul>
        <li className={classes.listItem}>
          <Typography variant="subtitle2"> Books read: </Typography>

          <span className={classes.counter}>{booksRead}</span>
        </li>
        <li className={classes.listItem}>
          <Typography variant="subtitle2"> Pages read: </Typography>
          <span className={classes.counter}>{pagesRead}</span>
        </li>
        <li className={classes.listItem}>
          <Typography variant="subtitle2"> Average rating: </Typography>{" "}
          <span className={classes.counter}> {averageRating}</span>
        </li>
        <li className={classes.listItem}>
          <Typography variant="subtitle2"> Most read genre: </Typography>{" "}
          <span className={classes.counter}> {favoriteGenre}</span>
        </li>
      </ul>
      <div className={classes.closeButton}>
        <Button
          sx={{ backgroundColor: "lightgreen", marginBottom: 5 }}
          variant="outlined"
          onClick={() => setStatistics(false)}
        >
          Close statistics
        </Button>
      </div>
    </div>
  );
};

export default Statistics;
