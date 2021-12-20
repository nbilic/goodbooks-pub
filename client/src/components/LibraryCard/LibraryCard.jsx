import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Statistics } from "../index";
import useStyles from "./LibraryCardStyles";
import axios from "axios";
import apiUrl from "../apiUrl";
//const apiUrl = "https://goodbooks-550.herokuapp.com";
//const apiUrl = "http://localhost:8080";

const LibraryCard = ({ user, setEdit }) => {
  const classes = useStyles({});
  const activeUser = useSelector((state) => state.user.user);
  const [statistics, setStatistics] = useState(false);
  const activeUserCheck = () => activeUser?.username === user?.username;
  const handleFriendRequest = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/users/addfriend`,
        {
          source: activeUser.username,
          destination: user.username,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        <Typography variant="h5" className={classes.cardHolder}>
          {user?.username}'s library card
        </Typography>
        <div className={classes.personalInfo}>
          <img src={user?.avatar} alt="" className={classes.picture} />
          <Typography variant="body2">
            {user?.description || "There seems to be nothing here...."}
          </Typography>
        </div>
        {!statistics && (
          <ul>
            <Link to="/upload" className={classes.link}>
              {activeUserCheck() && (
                <li className={classes.listItem}>Add a book</li>
              )}
            </Link>
            <Link
              to={`/profile/${user?.username}/friends`}
              state={{ username: user?.username }}
              className={classes.link}
            >
              <li className={classes.listItem}>Friends</li>
            </Link>
            {!activeUserCheck() && (
              <li className={classes.listItem} onClick={handleFriendRequest}>
                Add as friend
              </li>
            )}
            <li
              className={classes.listItem}
              onClick={() => setStatistics(true)}
            >
              Statistics
            </li>
            {activeUserCheck() && (
              <li onClick={() => setEdit(true)} className={classes.listItem}>
                Edit profile
              </li>
            )}
          </ul>
        )}
        {statistics && (
          <Statistics user={user.username} setStatistics={setStatistics} />
        )}
        <div className={classes.bottomBorder}></div>
        <div className={classes.bottomBorder2}></div>
      </div>
    </div>
  );
};

export default LibraryCard;
