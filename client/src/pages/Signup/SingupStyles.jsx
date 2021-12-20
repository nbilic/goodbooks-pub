import { makeStyles } from "@material-ui/core/styles";
import bg from "../../images/lib-card-bg.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    maxWidth: "550px",
    padding: 30,
    backgroundImage: `url(${bg})`,
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  middleSide: {
    border: "1px solid black",
    margin: "0px 20px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 20px 10px 20px",
    },
  },
  logo: {
    right: 0,
    maxHeight: 200,
    [theme.breakpoints.down("sm")]: {
      maxHeight: 100,
    },
  },
  formType: {
    color: "crimson",

    "&:hover": {
      cursor: "pointer",
    },
  },
  inputField: {
    marginTop: "2px",
  },
  routePath: {
    marginBottom: 10,
  },
  button: {
    display: "flex",
    justifyContent: "center",
  },
  goodbooksName: {
    fontSize: "32px",
    fontFamily: "Arial",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  rightSide: {
    width: "100%",
  },
}));

export default useStyles;
