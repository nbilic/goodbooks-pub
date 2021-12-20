import { useState } from "react";
import { FormInput } from "../index";
import { Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import useStyles from "./RegisterStyles";
import apiUrl from "../apiUrl";
import axios from "axios";
const Register = ({ setLogin, triggerToast }) => {
  const classes = useStyles({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username must be between 3-12 characters and not include any special characters",
      label: "Username",
      pattern: /^[A-Za-z0-9]{3,12}$/,
      required: true,
      badInput: false,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Invalid email address",
      label: "Email",
      pattern: /\S+@\S+\.\S+/,
      required: true,
      badInput: false,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern:
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      required: true,
      badInput: false,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "",
      label: "Confirm Password",
      errorMessage: "Passwords don't match!",
      pattern: values.password,
      required: true,
      badInput: false,
    },
  ]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      await axios.post(
        `${apiUrl}/auth/register`,
        {
          username: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword,
          email: values.email,
        },
        { withCredentials: true }
      );

      triggerToast(true, "Account succesfully registered!");
      setLogin(true);
    } catch (error) {
      //console.log(error.response.data.message);
      triggerToast(false, error.response.data.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    inputs.forEach((input, index) => {
      let error = false;
      if (input.name === "confirmPassword") {
        if (values["password"] !== values[input.name]) error = true;
      } else if (!input.pattern.test(values[input.name])) error = true;

      const newInputs = inputs;
      if (error) {
        newInputs[index].badInput = true;
      } else {
        if (input.badInput) {
          newInputs[index].badInput = false;
        }
      }
      setInputs([...newInputs]);
    });

    const error = inputs.find((i) => i.badInput === true);
    if (!error) {
      register();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">{"Register"}</Typography>
      <Typography variant="body2" className={classes.routePath}>
        Already have an account?
        <span
          className={classes.formType}
          onClick={() => setLogin(true)}
        >{` Sign in`}</span>
      </Typography>

      {inputs.map((input) => (
        <div className={classes.inputField} key={input.id}>
          <FormInput
            {...input}
            value={values[input.name]}
            onChange={onChange}
            className={classes.inputField}
          />
        </div>
      ))}
      <div className={classes.button}>
        <Button variant="contained" type="submit">
          Register
        </Button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
};

export default Register;
