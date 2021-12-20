import { Paper } from "@mui/material";
import { useState } from "react";
import logo from "../../images/logo.png";
import { Login, Register } from "../../components/index";
import useStyles from "./SingupStyles";
import { ToastContainer, toast } from "react-toastify";
const Signup = () => {
  const [login, setLogin] = useState(true);

  const triggerToast = (success, msg) => {
    if (success) {
      toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
      });
    } else {
      toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  const classes = useStyles({});
  return (
    <div className={classes.container}>
      <Paper elevation={5}>
        <div className={classes.form}>
          <div className={classes.leftSide}>
            <img src={logo} alt="logo" className={classes.logo} />
            <span className={classes.goodbooksName}>GoodBooks</span>
          </div>
          <div className={classes.middleSide}></div>
          <div className={classes.rightSide}>
            {!login ? (
              <Register setLogin={setLogin} triggerToast={triggerToast} />
            ) : (
              <Login setLogin={setLogin} />
            )}

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
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Signup;
