import { TextField } from "@mui/material";
import useStyles from "./FormInputStyles";
const FormInput = (props) => {
  const classes = useStyles({});
  const {
    label,
    onChange,
    errorMessage,
    id,
    pattern,
    badInput,
    ...inputProps
  } = props;

  return (
    <div className={classes.inputField}>
      <TextField
        id="standard-basic"
        variant="standard"
        {...inputProps}
        label={label}
        onChange={onChange}
      />
      <span className={classes.error}>{badInput && errorMessage}</span>
    </div>
  );
};

export default FormInput;
