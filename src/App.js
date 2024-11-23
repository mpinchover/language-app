import "./App.css";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
// import { system } from "@chakra-ui/react/preset";
import Navbar from "./components/navbar";
import Feed from "./components/feed";
import CreatePost from "./components/create-post/create-post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPosts from "./components/my-posts/my-posts";
import Post from "./components/post/post";

function App() {
  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        {/* <Feed /> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Feed} />
            <Route path="/create-post" Component={CreatePost} />
            <Route path="/my-posts" Component={MyPosts} />
            <Route path="/post/:id" Component={Post} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
