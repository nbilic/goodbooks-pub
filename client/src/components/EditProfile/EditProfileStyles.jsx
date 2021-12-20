import { makeStyles } from "@material-ui/core/styles";
import bg from "../../images/lib-card-bg.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0px",
    },
  },
  cardContainer: {
    width: 270,
    minHeight: 400,
    margin: 50,
    backgroundImage: `url(${bg})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    position: "relative",
  },
  personalInfo: {
    display: "flex",
    alignItems: "center",
  },
  picture: {
    maxHeight: 200,
    maxWidth: 150,
    margin: "auto",
    marginTop: 10,
  },
  cardHolder: {
    width: "100%",
    textAlign: "center",
    borderBottom: "2px solid black",
  },
  reviewInput: {
    marginTop: 10,
    width: "100%",

    boxSizing: "border-box",
    resize: "none",
  },
  inputField: {
    position: "relative",
    backgroundColor: "wheat",
    borderRadius: 0,
    borderTop: "1px solid black",
    borderRight: "none",
    borderLeft: "none",
    borderBottom: "1px solid black",
    width: "100%",
    padding: 10,
  },
  bottomBorder: {
    position: "absolute",
    width: "100%",
    bottom: 10,
    borderBottom: "5px solid brown",
  },
  bottomBorder2: {
    position: "absolute",
    width: "100%",
    bottom: 18,
    borderBottom: "5px solid black",
  },
}));

export default useStyles;
