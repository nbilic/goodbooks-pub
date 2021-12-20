import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Fade,
} from "@mui/material";

import logo from "../../images/logo.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import useStyles from "./HeaderStyles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/api";
import axios from "axios";
import apiUrl from "../apiUrl";
//const apiUrl = "https://goodbooks-550.herokuapp.com";
//const apiUrl = "http://localhost:8080";

// LOGOUT THING
//  <p onClick={() => logoutUser(dispatch)}>Logout</p>

const Header = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const classes = useStyles({ open });
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openx = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="sticky">
      <Toolbar className={classes.navbar}>
        <div className={classes.leftSide}>
          <Link to="/">
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Typography variant="h4" component="h4" className={classes.titleLG}>
              GoodBooks
            </Typography>
          </Link>

          <Typography variant="h6" component="h4" className={classes.titleSM}>
            GoodBooks
          </Typography>
        </div>
        <div className={classes.rightSide}>
          <InputBase
            placeholder="Search for users..."
            className={classes.search}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <Link
            to={filter.length > 0 ? `/search/${filter}` : "#"}
            state={{ filter: filter }}
            style={{ zIndex: "0" }}
            onClick={() => setFilter("")}
          >
            <SearchIcon
              className={classes.searchIcon}
              // onClick={() => setOpen(!open)}
              // onClick={() => navigate(`/search/${filter}`)}
            />
          </Link>

          <div className={classes.test}>
            {user.active ? (
              <>
                <div className={classes.actions}>
                  <Link to={`/profile/${user.username}`}>
                    <Avatar
                      src={user.avatar}
                      alt="profile picture"
                      className={classes.avatar}
                      //onClick={handleClick}
                    />
                  </Link>
                  <MoreVertIcon
                    className={classes.icon}
                    onClick={handleClick}
                  />
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openx}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  className={classes.dropDownMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    className={`${classes.dropDownMenuItem} `}
                    onClick={() => {
                      handleClose();
                      logoutUser(dispatch);

                      navigate("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/login" className={classes.link}>
                <Typography variant="body2" sx={{ marginLeft: 2 }}>
                  Sign in
                </Typography>
              </Link>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
