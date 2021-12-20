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
    margin: 5,
  },
  listItem: {
    listStyle: "none",
    marginLeft: 15,
    marginTop: 5,
    width: "100%",
    textAlign: "start",
    textDecoration: "underline",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardHolder: {
    width: "100%",
    textAlign: "center",
    borderBottom: "2px solid black",
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
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default useStyles;
