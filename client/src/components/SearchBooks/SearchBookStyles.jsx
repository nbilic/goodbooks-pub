import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    margin: "auto",
    //padding: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    //backgroundColor: "white",
    padding: 5,
    color: "black",
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
  modal: {
    display: "flex",
    //padding: 10,
    backgroundColor: "white",
  },
  bookPreview: {
    padding: 15,
    display: "flex",
    backgroundColor: "white",
    border: "1px dashed lightblue",
    margin: 5,

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(220,220,220,1)",
      color: "black",
    },
  },
  bookInfo: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    color: "inherit",
  },
  title: {
    color: "crimson",
  },
  thumbnail: {
    height: 160,
    width: 100,
  },
  informationDisplay: {
    display: "flex",
  },
}));

export default useStyles;
