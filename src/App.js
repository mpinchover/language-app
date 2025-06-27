import "./App.css";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
// import { system } from "@chakra-ui/react/preset";
import Navbar from "./components/navbar";
import Feed from "./components/feed/feed";
import CreatePost from "./components/create-post/create-post";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import MyPosts from "./components/my-posts/my-posts";
import Post from "./components/post/post";
import Account from "./components/account/account";
import { AuthProvider } from "./auth/auth-context";
import Login from "./components/login/login";
import ProtectedRoute from "./auth/protected-route";
import PublicRoute from "./auth/public-route";
import VideoDashboard from "./components/video-editor/video-dashboard";
import VideoChat from "./components/video-chat";
import Translate from "./components/translation/translate";
import PastTranslations from "./components/translation/past-translations";
import GenerateTranslation from "./components/translation/generate-translation";
import { getAuth } from "firebase/auth";
import Home from "./components/home/home";

const RootRedirect = () => {
  const user = getAuth().currentUser;
  console.log("User is ", user);
  if (user) {
    return <Navigate to="/translate" replace />;
  }
  return <Home />;
};

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"]; // Define routes where the Navbar should be hidden

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <ChakraProvider>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          {shouldShowNavbar && <Navbar />}{" "}
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />

            <Route
              path="/translate"
              element={
                <ProtectedRoute>
                  <GenerateTranslation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/translation/:translation_uuid"
              element={
                <ProtectedRoute>
                  <Translate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/past-translations"
              element={
                <ProtectedRoute>
                  <PastTranslations />
                </ProtectedRoute>
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
