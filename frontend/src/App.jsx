import React, { useState } from "react";
import Auth from "./pages/Auth"; // Signup Component
import Login from "./pages/Login"; // Login Component (Create this component)
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import myGif from "./assets/save-money-unscreen.gif";
import WritingAnimation from "./components/type";

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  // Toggle function to switch between Login and Signup forms
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex-1 flex items-center justify-center p-4"
        style={{
          borderRadius: "20px",
        }}
      >
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <div>
            {isLogin ? <Login /> : <Auth />}{" "}
            {/* Conditionally render Login or Signup */}
            <button
              style={{ marginLeft: "20px" }}
              onClick={toggleForm}
              className="ml-2 p-4 bg-blue-500 text-white  rounded"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </GoogleOAuthProvider>
      </div>

      <div
        className="flex-1 flex items-center justify-center p-4"
        style={{
          backgroundColor: "#140201",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img
            src={myGif}
            alt="Saving money"
            style={{
              filter: "invert(1)",
              width: "200px",
              height: "auto",
              marginLeft: "60px",
            }}
          />
          <WritingAnimation />
        </div>
      </div>
    </div>
  );
};

export default App;
