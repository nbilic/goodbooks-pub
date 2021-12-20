import {
  ProfileBooks,
  LibraryCard,
  EditProfile,
  Header,
} from "../../components/index";
import useStyles from "./ProfileStyles";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiUrl from "../../components/apiUrl";
//const apiUrl = "https://goodbooks-550.herokuapp.com";
//const apiUrl = "http://localhost:8080";

const Profile = () => {
  const [alignment, setAlignment] = useState("books");
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const { username } = useParams();
  const classes = useStyles({ alignment });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const n = await axios.get(`${apiUrl}/api/users/${username}`);

        setUser(n.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [username]);
  return (
    <div className={classes.profileWall}>
      <Header />
      <div className={classes.toggleButton} sx={{ marginTop: 10 }}>
        <Button value="books" onClick={() => setAlignment("books")}>
          Books
        </Button>
        <Button value="card" onClick={() => setAlignment("card")}>
          Card
        </Button>
      </div>
      <Grid container className={classes.body}>
        <Grid item lg={9} className={classes.books}>
          <ProfileBooks />
        </Grid>
        <Grid item lg={3} className={classes.card}>
          {edit ? (
            <EditProfile user={user} setEdit={setEdit} setUser={setUser} />
          ) : (
            <LibraryCard user={user} setEdit={setEdit} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
