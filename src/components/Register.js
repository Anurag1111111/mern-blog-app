import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `https://mern-blog-app-backend-ohon.onrender.com/api/user/signup`,
        {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );
      const data = response.data;
      setErrorMessage("");
      console.log(data.message);
      setSuccessMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.log(error.response.data);
      setSuccessMessage("");
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
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
          <Typography variant="h4">Sign Up</Typography>
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography
              variant="body2"
              color="success"
              sx={{ marginBottom: 2 }}
            >
              {successMessage}
            </Typography>
          )}
          <TextField
            required
            onChange={handleChange}
            name="name"
            value={inputs.name}
            placeholder="Name"
            margin="normal"
          />
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
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, margin: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </Box>
      </form>
    </div>
  );
};

export default Register;
