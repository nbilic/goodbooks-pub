import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "#301911",
    padding: 5,
    display: "flex",
    justifyContent: "space-between",
  },
  leftSide: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: -10,
    },
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    maxWidth: 75,
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 36,
    },
  },
  titleLG: {
    paddingLeft: 10,
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  titleSM: {
    paddingLeft: 5,
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    backgroundColor: "wheat",
    borderRadius: 35,
    width: 300,
    height: 40,
    paddingLeft: 10,
    [theme.breakpoints.down("sm")]: {
      transition: ".3s",
      width: (props) => (props.open ? 0 : 180),
      backgroundColor: (props) => (props.open ? "rgb(110, 37, 3)" : "wheat"),
      fontSize: "12px",
    },
  },
  searchIcon: {
    marginLeft: -35,
    zIndex: 100,
    "&:hover": {
      cursor: "pointer",
    },
  },
  avatar: {
    marginLeft: 10,

    "&:hover": {
      cursor: "pointer",
    },
  },
  dropDownMenuItem: {
    backgroundColor: "#301911",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    height: 64,
    "&:hover": {
      cursor: "pointer",
      color: "lightgreen",
    },
  },
}));

export default useStyles;
