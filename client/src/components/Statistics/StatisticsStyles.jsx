import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "start",
    height: "100%",
  },
  listItem: {
    listStyle: "none",
    margin: 5,
    display: "flex",
    alignItems: "center",
  },
  closeButton: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  loading: {
    margin: "auto",
  },
  counter: {
    marginLeft: 5,
  },
}));

export default useStyles;
