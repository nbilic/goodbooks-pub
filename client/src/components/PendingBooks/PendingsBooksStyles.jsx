import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputCard: {
    backgroundColor: "white",
    width: "50%",
    margin: "auto",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  leftSideCard: {
    width: "30%",
    height: "inherit",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    color: "green",
    "&:hover": {
      cursor: "pointer",
      color: "red",
    },
  },
  noCover: {
    height: 220,
    width: 140,
    backgroundColor: "wheat",
    border: "2px solid black",
    margin: "30px auto 10px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    height: 260,
    width: 160,
    margin: "20px auto",
    marginTop: "50px",
  },

  rightSideCard: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    padding: 30,
  },
  inputArea: {
    display: "flex",
    marginBottom: 15,
  },
  inputField: {
    position: "relative",
    backgroundColor: "wheat",
    borderRadius: 15,
    border: "1px solid black",
    width: "100%",
    padding: "5px 10px",
    "&:focus": {
      outline: "none",
    },
  },
  ratingArea: {
    display: "flex",
    alignItems: "center",
  },
  reviewInput: {
    marginTop: 10,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    resize: "none",
    padding: 15,
    minHeight: 200,
    color: "black",
    fontFamily: "arial",
    fontSize: 12,
  },
  submitButton: {
    marginTop: 20,
    padding: "10px 50px",
  },
  pageType: {
    margin: 50,
    marginLeft: 100,
    color: "black",
    borderBottom: "2px solid black",
    width: "fit-content",
  },
  actionButtonsDiv: {
    width: "100%",
    display: "flex",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  userOptions: {
    display: "flex",
    alignItems: "center",
  },
  whiteSpace: {
    height: 20,
  },
  editIcon: {
    color: "green",
    "&:hover": {
      cursor: "pointer",
    },
    width: "fit-content",
    marginRight: 10,
  },
  deleteIcon: {
    color: "red",
    "&:hover": {
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
    color: "crimson",
  },
  thumbnail: {
    height: 124,
    width: 86,
  },
  body: {
    display: "flex",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px dashed black",
  },
  bookInfo: {
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
}));

export default useStyles;
