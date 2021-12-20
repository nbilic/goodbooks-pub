import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profileWall: {
    margin: 0,
    textAlign: "center",
  },
  body: {
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      flexDirection: "column-reverse",
    },
    toggleButton: {
      textAlign: "center",
    },
  },
  toggleButton: {
    display: "none",
    backgroundColor: "lightgreen",

    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  books: {
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.alignment === "books" ? "block" : "none"),
    },
  },
  card: {
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.alignment === "card" ? "block" : "none"),
    },
  },
}));

export default useStyles;
