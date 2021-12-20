import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    margin: "auto",
    marginTop: 30,
    padding: 20,
  },
  userDiv: {
    display: "flex",
    alignItems: "center",
    margin: 10,

    justifyContent: "space-between",
  },
  userDivInfo: {
    marginLeft: 10,
  },
  leftSide: {
    display: "flex",
    alignItems: "center",
  },
  icons: {
    marginRight: 10,
    "&:hover": {
      cursor: "pointer",
      color: "orange",
    },
  },
  acceptIcon: {
    color: "green",
  },
  declineIcon: {
    color: "red",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default useStyles;
