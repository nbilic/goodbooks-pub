import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputCard: {
    backgroundColor: "white",
    width: "50%",
    margin: "auto",
    display: "flex",
    [theme.breakpoints.up("1921")]: {
      width: "40%",
    },
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
    alignItems: "space-between",
    justifyContent: "space-between",
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
    height: 220,
    width: 140,
    margin: "20px auto",
    marginTop: "50px",
  },
  tips: {
    width: "65%",
    margin: "auto",
    backgroundColor: "wheat",
    paddingBottom: "5px",
    boxShadow: "2px 2px grey",
  },
  liItem: {
    padding: 5,
    margin: "10px 15px 10px 20px",
  },
  tipsHeader: {
    textAlign: "center",
    borderBottom: "2px solid black",
  },
  bar: {
    borderBottom: "2px solid black",
    margin: "2px 0px",
  },

  // RIGHT SIDE OF THE INPUT CARD
  rightSideCard: {
    width: "70%",
    border: "0px solid black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 50,
  },
  required: {
    color: "red",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "lightgreen",
    borderRadius: 10,
    border: "none",
    padding: "5px 15px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  inputArea: {
    display: "flex",
    marginBottom: 15,

    //justifyContent: "space-between",
  },
  inputField: {
    position: "relative",
    backgroundColor: "wheat",
    borderRadius: 15,
    border: "1px solid black",
    width: "100%",
    padding: 10,
  },
  checkButton: {
    marginLeft: 10,
  },
  reviewInput: {
    marginTop: 10,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    resize: "none",
    padding: 15,
  },
  submitButton: {
    marginTop: 20,
    padding: "10px 50px",
  },
  submitButtonDiv: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    width: "100%",
  },
  pageType: {
    marginLeft: 100,
    marginTop: 20,
    color: "black",
    borderBottom: "2px solid black",
    width: "fit-content",
  },
}));

export default useStyles;
