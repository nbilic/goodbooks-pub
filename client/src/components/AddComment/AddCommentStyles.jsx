import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  inputField: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: 15,
    border: "1px solid black",
    width: "100%",
    padding: "5px 10px",
    "&:focus": {
      outline: "none",
    },
  },
  reviewInput: {
    marginLeft: 20,
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    resize: "none",
    padding: 15,
    minHeight: 100,
  },
  postCommentDiv: {
    padding: 10,
    borderBottom: "1px solid black",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
  },
  postCommentDivUpper: {
    display: "flex",
  },
  postCommentDivBottom: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
}));

export default useStyles;
