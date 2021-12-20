import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    margin: "auto",
    padding: 20,
    marginTop: 30,
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
}));

export default useStyles;
