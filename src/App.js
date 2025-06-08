import "./App.css";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
// import { system } from "@chakra-ui/react/preset";
import Navbar from "./components/navbar";
import Feed from "./components/feed/feed";
import CreatePost from "./components/create-post/create-post";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MyPosts from "./components/my-posts/my-posts";
import Post from "./components/post/post";
import Account from "./components/account/account";
import { AuthProvider } from "./auth/auth-context";
import Login from "./components/login/login";
import ProtectedRoute from "./auth/protected-route";
import PublicRoute from "./auth/public-route";
import VideoDashboard from "./components/video-editor/video-dashboard";
import VideoChat from "./components/video-chat";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"]; // Define routes where the Navbar should be hidden

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <ChakraProvider>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          {/* <Feed /> */}
          {/* <BrowserRouter> */}
          {shouldShowNavbar && <Navbar />}{" "}
          {/* Conditionally render the Navbar */}
          <Routes>
            <Route
              path="/"
              element={
                // <ProtectedRoute>
                <Feed />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/video-chat"
              element={
                // <ProtectedRoute>
                <VideoChat />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-posts"
              element={
                <ProtectedRoute>
                  <MyPosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:id"
              element={
                <ProtectedRoute>
                  <Post />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/video-editor"
              element={
                // <PublicRoute>
                <VideoDashboard />
                // </PublicRoute>
              }
            />
          </Routes>
          {/* </BrowserRouter> */}
        </Box>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
