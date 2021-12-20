import {
  Typography,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
} from "@mui/material";
import useStyles from "./FriendsStyles";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiUrl from "../apiUrl";
//const apiUrl = "https://goodbooks-550.herokuapp.com";
//const apiUrl = "http://localhost:8080";

const Friends = () => {
  const location = useLocation();
  const [alignment, setAlignment] = useState("left");
  const [friends, setFriends] = useState([]);
  const classes = useStyles({});
  const { username } = location.state;
  const [requests, setRequests] = useState([]);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
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
    getRequests();
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
        <ToggleButton value="center" aria-label="centered">
          Incoming requests
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          Outgoing requests
        </ToggleButton>
      </ToggleButtonGroup>
      {alignment === "left" && friends.map((friend) => <div></div>)}
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
                  />
                  <CloseIcon
                    className={`${classes.icons} ${classes.declineIcon}`}
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
