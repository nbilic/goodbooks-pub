import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    margin: "auto",
    padding: 20,
    marginTop: 30,
  },
  user: {
    display: "flex",
    alignItems: "center",
    margin: 20,
    borderBottom: "1px dashed black",
  },
  rightSide: {
    marginLeft: 20,
  },
  avatar: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  username: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  reportContainer: {
    padding: 5,
    borderBottom: "1px dashed black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reportedUser: {
    color: "crimson",
    fontWeight: 500,
    paddingRight: "5px",

    "&:hover": {
      cursor: "pointer",
    },
  },
  reportedBy: {
    color: "orange",
    fontWeight: 500,
    "&:hover": {
      cursor: "pointer",
    },
  },
  reportReason: {
    display: "flex",
    alignItems: "center",
    marginTop: 2,
  },
  resolveIcon: {
    color: "green",
    "&:hover": {
      cursor: "pointer",
      color: "crimson",
    },
  },
}));

export default useStyles;
