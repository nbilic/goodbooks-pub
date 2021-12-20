import useStyles from "./SearchUsersStyles";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Paper, Typography, Avatar } from "@mui/material";
import axios from "axios";
import apiUrl from "../apiUrl";
//const apiUrl = "https://goodbooks-550.herokuapp.com";
//const apiUrl = "http://localhost:8080";
const SearchUsers = () => {
  const classes = useStyles({});
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const { filter } = location.state;
  console.log(filter);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.post(
          `${apiUrl}/api/users/filter`,
          {
            string: filter,
          },
          { withCredentials: true }
        );

        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    filter.length > 0 && getUsers();
  }, [filter]);
  return (
    <Paper elevation={5} className={classes.container}>
      {users.length <= 0 && (
        <Typography variant="body1">No users match search term</Typography>
      )}
      {users.map((user) => (
        <div className={classes.user} key={user._id}>
          <div className={classes.leftSide}>
            <Link to={`/profile/${user.username}`}>
              <Avatar src={user.avatar} className={classes.avatar} />
            </Link>
            <Typography variant="body1" className={classes.username}>
              {user.username}
            </Typography>
          </div>
          <div className={classes.rightSide}>
            <Typography variant="body2">
              {user.description || <i>No description</i>}
            </Typography>
          </div>
        </div>
      ))}
    </Paper>
  );
};

export default SearchUsers;
