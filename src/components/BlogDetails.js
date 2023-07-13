import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const response = await axios
      .get(`https://mern-blog-app-backend-ohon.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  const sendRequest = async () => {
    const response = await axios
      .put(
        `https://mern-blog-app-backend-ohon.onrender.com/api/blog/update/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
        }
      )
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myblogs"));
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    });
  }, [id]);
  console.log(blog);
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
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
              value={inputs.title}
              name="title"
              onChange={handleChange}
            />
            <InputLabel sx={{ mt: 1, mb: 2 }}>Description</InputLabel>
            <TextField
              type="text"
              value={inputs.description}
              name="description"
              onChange={handleChange}
            />
            <InputLabel sx={{ mt: 1, mb: 2 }}>Image</InputLabel>
            <TextField
              value={inputs.image}
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
              Update Now
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
