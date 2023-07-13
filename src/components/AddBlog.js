import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: " ",
    description: " ",
    image: " ",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const response = await axios
      .post("https://mern-blog-app-backend-ohon.onrender.com/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputs("");
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          borderColor={grey}
          borderRadius={10}
          boxShadow="10px 10px 40px #ccc"
          padding={3}
          margin="auto"
          marginTop={3}
          display="flex"
          flexDirection="column"
          width="50%"
        >
          <Typography
            fontWeight="bold"
            variant="h4"
            padding={3}
            textAlign="center"
          >
            Post your Blog
          </Typography>
          <InputLabel sx={{ mt: 1, mb: 2 }}>Title</InputLabel>
          <TextField
            value={inputs.title || " "}
            name="title"
            onChange={handleChange}
          />
          <InputLabel sx={{ mt: 1, mb: 2 }}>Description</InputLabel>
          <TextField
            type="text"
            value={inputs.description || " "}
            name="description"
            onChange={handleChange}
          />
          <InputLabel sx={{ mt: 1, mb: 2 }}>Image</InputLabel>
          <TextField
            value={inputs.image || " "}
            name="image"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "25px",
              borderRadius: "15px",
              padding: "10px",
            }}
          >
            Post Now
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
