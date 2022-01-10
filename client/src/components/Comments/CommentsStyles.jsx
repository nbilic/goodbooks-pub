import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  comment: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px dashed black",
    padding: 10,
  },
  avatar: {
    margin: 10,
  },
  text: {
    color: "black",
  },
  username: {
    color: "crimson",
    marginRight: 10,
  },
  rightSideCommentDiv: {
    display: "flex",
    border: "1px solid black",
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  grid: {
    display: "flex",
    alignItems: "center",
  },
  buttonAction: {
    display: "flex",
    justifyContent: "flex-end",
  },
  icons: {
    color: "green",
    "&:hover": {
      cursor: "pointer",
      color: "red",
    },
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default useStyles;
