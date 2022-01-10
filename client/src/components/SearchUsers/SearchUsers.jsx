import useStyles from "./SearchUsersStyles";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Paper, Typography, Avatar, LinearProgress } from "@mui/material";
import axios from "axios";
import apiUrl from "../apiUrl";

const SearchUsers = () => {
  const classes = useStyles({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { filter } = location.state;
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${apiUrl}/api/users/filter`,
          {
            string: filter,
          },
          { withCredentials: true }
        );

        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    filter.length > 0 && getUsers();
  }, [filter]);

  if (loading) return <LinearProgress />;
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
