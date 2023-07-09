import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tabs,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState(0);
  console.log(value);
  const username = localStorage.getItem("username");
  return (
    <AppBar
      position="sticky"
      className="container"
      sx={{ background: "black" }}
    >
      <Toolbar>
        <Typography marginRight={10} variant="h5">
          Blogs App
        </Typography>
        {isLoggedIn && (
          <Box>
            <Tabs value={value} onChange={(e, value) => setValue(value)}>
              <Tab
                value={0}
                LinkComponent={Link}
                to="/blogs"
                sx={{ color: "white", margin: 1 }}
                label="All BLogs"
              ></Tab>
              <Tab
                value={1}
                LinkComponent={Link}
                to="/myblogs"
                sx={{ color: "white", margin: 1 }}
                label="My BLogs"
              ></Tab>
              <Tab
                value={2}
                LinkComponent={Link}
                to="/blogs/add"
                sx={{ color: "white", margin: 1 }}
                label="Add BLog "
              ></Tab>
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{ color: "white", margin: 1, borderRadius: 3 }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/register"
                variant="contained"
                sx={{ color: "white", margin: 1, borderRadius: 3 }}
              >
                Register
              </Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <p>
                <b>Welcome&nbsp; </b>
                {username}&nbsp;
              </p>
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{ color: "white", margin: 1, borderRadius: 3 }}
              >
                LogOut
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
