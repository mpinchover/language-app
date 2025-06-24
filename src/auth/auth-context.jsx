import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import app from "./firebase"; // Import your Firebase configuration

const AuthContext = createContext();

const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const navigate = useNavigate();

  // Listen for user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const handleSigninWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const name = user.displayName;
        const email = user.email;

        console.log("Google user signed in:");
        console.log("Name:", name);
        console.log("Email:", email);

        // Navigate or store in context if needed
        navigate("/translate");
      })
      .catch((error) => {
        console.error("Google Sign-In Error", error);
        toast({
          title: "Google Sign-In failed",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logOut,
        resetPassword,
        loading,
        handleSigninWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
