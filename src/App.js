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
function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          {/* <Feed /> */}

          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" Component={Feed} />
              <Route path="/create-post" Component={CreatePost} />
              <Route path="/my-posts" Component={MyPosts} />
              <Route path="/post/:id" Component={Post} />
              <Route path="/account" Component={Account} />
              <Route path="/account" Component={Account} />
              <Route path="/login" Component={Login} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
