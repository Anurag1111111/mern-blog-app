import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UsersBlog = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const response = await axios
      .get(
        `https://mern-blog-app-backend-ohon.onrender.com/api/blog/user/${id}`
      )
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      console.log(data.user.name);
      setUser(data.user);
    });
  }, []);
  console.log(user);
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={true}
            key={index}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            user={user.name}
          />
        ))}
    </div>
  );
};

export default UsersBlog;
