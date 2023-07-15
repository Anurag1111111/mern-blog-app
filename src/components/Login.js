import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://mern-blog-app-backend-ohon.onrender.com/api/user/login`,
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => {
      if (data) {
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("username", data.user.name);
        dispatch(authActions.login());
        navigate("/blogs");
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 40px #ccc"
          margin="auto"
          marginTop={7}
          padding={5}
          borderRadius={10}
        >
          <Typography variant="h4">Login</Typography>
          <TextField
            required
            onChange={handleChange}
            name="email"
            value={inputs.email}
            type="email"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            required
            onChange={handleChange}
            name="password"
            value={inputs.password}
            type="password"
            placeholder="Password"
            margin="normal"
          />
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, margin: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
          <Link to="/register">
            <Button>New Here? Go to Register</Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Login;
