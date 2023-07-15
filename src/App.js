import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import { useDispatch, useSelector } from "react-redux";
import UsersBlog from "./components/UsersBlog";
import { useEffect } from "react";
import { authActions } from "./store";
import Register from "./components/Register";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  console.log(isLoggedIn);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/mern-blog-app" element={<Login />} />
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myblogs" element={<UsersBlog />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/myblogs/:id" element={<BlogDetails />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
