import {
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Typography,
} from "@mui/material";
import useStyles from "./FriendsStyles";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiUrl from "../apiUrl";
import { useSelector } from "react-redux";

const Friends = () => {
  const location = useLocation();
  const [alignment, setAlignment] = useState("left");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles({});
  const { username, user } = location.state;
  const [requests, setRequests] = useState([]);
  const activeUser = useSelector((state) => state.user.user);
  const activeUserCheck = () => activeUser?.username === user?.username;
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleAccept = async (acceptedUser) => {
    try {
      await axios.put(
        `${apiUrl}/api/users/acceptfriend/${user.username}`,
        {
          userAccepting: user?.username,
          userAccepted: acceptedUser.username,
        },
        { withCredentials: true }
      );
      const c = requests;
      const x = c.filter((r) => r.source === acceptedUser.username);
      setRequests(x);
      setFriends([...friends, acceptedUser]);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleDenie = async (acceptedUser) => {
    try {
      await axios.put(
        `${apiUrl}/api/users/deniefriend/${user.username}`,
        {
          userAccepting: user?.username,
          userAccepted: acceptedUser.username,
        },
        { withCredentials: true }
      );
      const c = requests;
      const x = c.filter((r) => r.source === acceptedUser.username);
      setRequests(x);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleCancel = async (acceptedUser) => {
    try {
      await axios.put(
        `${apiUrl}/api/users/cancelfriend/${user.username}`,
        {
          userAccepting: user?.username,
          userAccepted: acceptedUser.username,
        },
        { withCredentials: true }
      );
      const c = requests;
      const x = c.filter((r) => r.source === acceptedUser.username);
      setRequests(x);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const removeFriend = async (acceptedUser) => {
    try {
      await axios.put(
        `${apiUrl}/api/users/removefriend/${user.username}`,
        {
          userAccepting: user?.username,
          userAccepted: acceptedUser.username,
        },
        { withCredentials: true }
      );
      const c = friends;
      const x = c.filter((r) => r.username !== acceptedUser.username);
      setFriends(x);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const getRequests = async () => {
      try {
        const pendingRequests = await axios.get(
          `${apiUrl}/api/users/requests/${username}`
        );
        setRequests(pendingRequests.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getFriends = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${apiUrl}/api/users/friends/${user.username}`
        );
        setFriends(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    getRequests();
    getFriends();
  }, []);

  return (
    <Paper elevation={5} className={classes.container}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="left" aria-label="left aligned">
          Friends
        </ToggleButton>
        {activeUserCheck() && (
          <ToggleButton value="center" aria-label="centered">
            Incoming requests
          </ToggleButton>
        )}
        {activeUserCheck() && (
          <ToggleButton value="right" aria-label="right aligned">
            Outgoing requests
          </ToggleButton>
        )}
      </ToggleButtonGroup>
      {alignment === "left" && (
        <>
          {friends?.map((friend) => (
            <div key={friend.username}>
              <div className={classes.userDiv}>
                <div className={classes.leftSide}>
                  <Link to={`/profile/${friend.username}`}>
                    <Avatar src={friend.avatar} />
                  </Link>
                  <div className={classes.userDivInfo}>
                    <Link
                      to={`/profile/${friend.username}`}
                      className={classes.link}
                    >
                      <p>{friend.username}</p>
                    </Link>

                    <p>{friend.description || <i>No description</i>}</p>
                  </div>
                </div>
                <div className={classes.rightSide}>
                  {activeUserCheck() && (
                    <CloseIcon
                      className={`${classes.icons} ${classes.declineIcon}`}
                      onClick={() => removeFriend(friend)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {friends.length === 0 && !loading && (
            <Typography
              variant="subtitle2"
              sx={{ marginTop: 2 }}
            >{`${username} has no friends :(`}</Typography>
          )}
        </>
      )}

      {alignment === "center" &&
        requests.map((request) => (
          <div key={`${request.type}${request.username}`}>
            {request.type === "INCOMING" && (
              <div className={classes.userDiv}>
                <div className={classes.leftSide}>
                  <Link to={`/profile/${request.username}`}>
                    <Avatar src={request.avatar} />
                  </Link>
                  <div className={classes.userDivInfo}>
                    <Link
                      to={`/profile/${request.username}`}
                      className={classes.link}
                    >
                      <p>{request.username}</p>
                    </Link>

                    <p>{request.description || <i>No description</i>}</p>
                  </div>
                </div>
                <div className={classes.rightSide}>
                  <DoneIcon
                    className={`${classes.icons} ${classes.acceptIcon}`}
                    onClick={() => handleAccept(request)}
                  />
                  <CloseIcon
                    className={`${classes.icons} ${classes.declineIcon}`}
                    onClick={() => handleDenie(request)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

      {alignment === "right" &&
        requests.map((request) => (
          <div key={`${request.type}${request.username}`}>
            {request.type === "OUTGOING" && (
              <div className={classes.userDiv}>
                <div className={classes.leftSide}>
                  <Link to={`/profile/${request.username}`}>
                    <Avatar src={request.avatar} />
                  </Link>

                  <div className={classes.userDivInfo}>
                    <Link
                      to={`/profile/${request.username}`}
                      className={classes.link}
                    >
                      <p>{request.username}</p>
                    </Link>
                    <p>{request.description || <i>No description</i>}</p>
                  </div>
                </div>
                <div className={classes.rightSide}>
                  <CloseIcon
                    className={`${classes.icons} ${classes.declineIcon}`}
                    onClick={() => handleCancel(request)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
    </Paper>
  );
};

export default Friends;
