import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const response = await axios
      .get("https://mern-blog-app-backend-ohon.onrender.com/api/blog")
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            user={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
