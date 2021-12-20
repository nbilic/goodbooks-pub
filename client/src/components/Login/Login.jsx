import { useState } from "react";
import { FormInput } from "../index";
import { Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import useStyles from "./LoginStyles";
import apiUrl from "../apiUrl";
import axios from "axios";
import { updateUser } from "../../redux/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = ({ setLogin }) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const login = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        {
          password: values.password,
          email: values.email,
        },
        { withCredentials: true }
      );

      //console.log(response.data);
      await updateUser(response.data, dispatch);
      navigate(`/profile/${response.data.username}`);
    } catch (error) {
      notify(error.response.data.message);
    }
  };
  const notify = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">{"Log in"}</Typography>
      <Typography variant="body2" className={classes.routePath}>
        New to GoodBooks?
        <span
          className={classes.formType}
          onClick={() => setLogin(false)}
        >{` Sign up now`}</span>
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
          Log in
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

export default Login;
