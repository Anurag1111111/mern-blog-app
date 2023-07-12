import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, image, user, isUser, id }) => {
  const navigate = useNavigate();

  const deleteRequest = async () => {
    const response = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  const handleDelete = () => {
    const result = window.confirm("Aro you sure!");
    if (result) {
      deleteRequest();
      window.location.reload();
    }
  };
  const handleEdit = (e) => {
    navigate(`/myblogs/${id}`);
  };
  return (
    <div>
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          mt: 5,
          mb: 5,
          padding: 4,
          borderRadius: 5,
          boxShadow: "10px 10px 40px #ccc",
          ":hover": {
            boxShadow: "10px 10px 80px #aaa",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {user[0]}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <b>{user}</b>
            {" : "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
