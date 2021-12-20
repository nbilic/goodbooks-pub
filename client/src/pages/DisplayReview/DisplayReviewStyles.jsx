import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
  commentContainer: {
    width: "50%",
    margin: "auto",
    marginTop: 20,
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    backgroundColor: "wheat",
  },
}));

export default useStyles;
