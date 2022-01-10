import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Report } from "../index";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Statistics } from "../index";
import useStyles from "./LibraryCardStyles";
import axios from "axios";
import apiUrl from "../apiUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
const LibraryCard = ({ user, setEdit }) => {
  const classes = useStyles({});
  const activeUser = useSelector((state) => state.user.user);
  const [statistics, setStatistics] = useState(false);
  const [isBanned, setIsBanned] = useState(user?.banned);
  const [modal, setModal] = useState(false);
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
      console.log(error.response.data.message);
    }
  };

  const banUser = async () => {
    try {
      await axios.put(
        `${apiUrl}/api/users/ban/${user.username}`,
        {
          banStatus: user.banned ? false : true,
        },
        { withCredentials: true }
      );
      setIsBanned(!isBanned);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const pendingRequests = () => {
    const n = user?.requests.filter((r) => r.type === "INCOMING");
    if (n?.length > 0) return `(${n?.length} pending)`;
    return "";
  };
  const notify = () =>
    toast.success("Report submitted!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    if (user?.banned !== isBanned) setIsBanned(user.banned);
  }, [user]);
  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        <Typography variant="h5" className={classes.cardHolder}>
          {user?.username}'s library card
        </Typography>
        <div className={classes.personalInfo}>
          <img src={user?.avatar} alt="" className={classes.picture} />

          {isBanned ? (
            <Typography variant="h6" sx={{ color: "crimson" }}>
              BANNED
            </Typography>
          ) : (
            <Typography variant="body2">
              {user?.description || "There seems to be nothing here...."}
            </Typography>
          )}
        </div>
        {!statistics && (
          <ul>
            <Link to="/upload" className={classes.link}>
              {activeUserCheck() && !activeUser?.banned && (
                <li className={classes.listItem}>Add a book</li>
              )}
            </Link>
            <Link
              to={`/profile/${user?.username}/friends`}
              state={{ username: user?.username, user: user }}
              className={classes.link}
            >
              {activeUserCheck() ? (
                <li className={classes.listItem}>
                  Friends {pendingRequests()}
                </li>
              ) : (
                <li className={classes.listItem}>{`Friends `}</li>
              )}
            </Link>
            {!activeUserCheck() &&
              !user?.friends.includes(activeUser.username) && (
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
            {!activeUserCheck() && (
              <li className={classes.listItem} onClick={() => setModal(true)}>
                Report user
              </li>
            )}
            {!activeUserCheck() && activeUser.isAdmin && (
              <li className={classes.listItem} onClick={banUser}>
                {!isBanned ? "Ban user" : "Unban user"}
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
      {modal && (
        <Report setModal={setModal} user={user.username} notify={notify} />
      )}
      <ToastContainer />
    </div>
  );
};

export default LibraryCard;
