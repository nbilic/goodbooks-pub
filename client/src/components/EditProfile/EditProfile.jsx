import useStyles from "./EditProfileStyles";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/api";
import apiUrl from "../apiUrl";

const EditProfile = ({ user, setEdit, setUser }) => {
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles({});

  const toDataURL = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitChanges = async () => {
    try {
      const changedUser = await axios.put(
        `${apiUrl}/api/users/${user.username}`,
        {
          username: user?.username,
          ...(avatar && { avatar: avatar }),
          ...(description && { description: description }),
        },
        { withCredentials: true }
      );

      const {
        avatar: changedAvatar,
        email,
        username,
        description: newDescription,
      } = changedUser.data;
      updateUser(
        { ...(avatar && { changedAvatar: avatar }), email, username },
        dispatch
      );
      setUser({
        ...user,
        ...(avatar && { avatar: avatar }),
        ...(description && { description: description }),
      });
      setEdit(false);
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
          <img
            src={avatar || user?.avatar}
            alt=""
            className={classes.picture}
          />
        </div>
        <Button component="label">
          Add picture
          <input
            type="file"
            hidden
            onChange={(e) => setAvatar(toDataURL(e.target.files[0]))}
          />
        </Button>
        <Typography variant="body2">Enter description:</Typography>
        <textarea
          placeholder={user?.description}
          className={`${classes.reviewInput} ${classes.inputField}`}
          name=""
          id=""
          cols="20"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <Button onClick={submitChanges}>Submit changes</Button>
        <Button
          onClick={() => setEdit(false)}
          sx={{ color: "red", marginBottom: 5 }}
        >
          Discard Changes
        </Button>
        <div className={classes.bottomBorder}></div>
        <div className={classes.bottomBorder2}></div>
      </div>
    </div>
  );
};

export default EditProfile;
