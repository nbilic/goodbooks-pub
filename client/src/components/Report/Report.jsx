import useStyles from "./ReportStyles";
import { Button, Modal, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../apiUrl";
import { useSelector } from "react-redux";

const Report = ({ setModal, user, notify }) => {
  const classes = useStyles({});
  const [open, setOpen] = useState(false);
  const activeUser = useSelector((state) => state.user.user);
  const [value, setValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModal(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/users/report`,
        {
          reportedUser: user,
          reportedBy: activeUser.username,
          additionalInformation: value,
        },
        { withCredentials: true }
      );
      notify();
      handleClose();
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleOpen();
  }, []);
  return (
    <div>
      <Modal
        open={open}
        sx={{ overflow: "scroll" }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className={classes.modal}>
            <Typography variant="subtitle2">Reporting user: {user}</Typography>
            <Typography variant="subtitle2">Report reason</Typography>

            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              cols="30"
              rows="10"
              required
              className={classes.input}
            ></textarea>

            <div className={classes.button}>
              <Button
                onClick={handleSubmit}
                className={classes.button}
                disabled={value.length > 0 ? false : true}
                variant="contained"
                sx={{ width: 100 }}
              >
                {" "}
                Submit{" "}
              </Button>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default Report;
