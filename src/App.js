import "./App.css";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
// import { system } from "@chakra-ui/react/preset";
import Navbar from "./components/navbar";
import Feed from "./components/feed";
import CreatePost from "./components/create-post/create-post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPosts from "./components/my-posts/my-posts";
import Post from "./components/post/post";
import Account from "./components/account/account";
import { AuthProvider } from "./auth/auth-context";
import Login from "./components/login/login";
import ProtectedRoute from "./auth/protected-route";
import PublicRoute from "./auth/public-route";
function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          {/* <Feed /> */}

          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-post"
                Component={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-posts"
                Component={
                  <ProtectedRoute>
                    <MyPosts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post/:id"
                Component={
                  <ProtectedRoute>
                    <Post />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                Component={
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
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
