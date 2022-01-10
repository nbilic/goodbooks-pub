import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    position: "relative",
    backgroundColor: "wheat",
  },
  bookPreview: {
    padding: 20,
    display: "flex",
    alignItems: "center",
    backgroundColor: "wheat",
    borderBottom: "1px solid black",
    transition: ".1s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgb(40,40,40)",
      color: "white",
    },
  },
  bookInfo: {
    marginLeft: 20,
    width: "100%",
  },
  thumbnail: {
    height: 240,
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    backgroundColor: "wheat",
    padding: 10,
    boxShadow: 24,
    overflowY: "auto",
    borderRadius: 5,

    [theme.breakpoints.down("xs")]: {
      width: "100%",
      top: "0",
      left: "0",
      transform: "translate(0,0)",
      margin: "auto",
    },
  },
  container: {
    width: "100%",
    display: "flex",
  },

  button: {
    display: "flex",
    justifyContent: "flex-end",

    marginTop: 5,
  },
  input: {
    width: "100%",
  },
}));

export default useStyles;
