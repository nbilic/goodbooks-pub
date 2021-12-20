import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  routePath: {
    marginBottom: 10,
  },
  inputField: {
    marginTop: 5,
    marginBottom: 5,
  },
  formType: {
    color: "crimson",

    "&:hover": {
      cursor: "pointer",
    },
  },
  button: {
    marginTop: 15,
    display: "flex",
    justifyContent: "center",
  },
}));

export default useStyles;
