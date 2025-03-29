import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button } from "@heroui/react";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import "../index.css";

export default function Login() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Real-time password validation
  const getPasswordError = (value) => {
    if (value.length < 6) {
      return "Password must be 6 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  // Handle Google login success
  const handleGoogleLogin = (response) => {
    console.log("Google login successful:", response);
    // You can send the token (response.credential) to your backend for validation
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed:", error);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (data.terms !== "true") {
      newErrors.terms = "Please accept the terms";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and set loading state
    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the form data as JSON
      });

      setIsLoading(false); // Reset loading state after the response

      if (response.ok) {
        // Handle success
        console.log("Login successful:", await response.json());
      } else {
        // Handle error response from the server
        console.error("Error during login:", await response.json());
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to connect to server:", error);
    }
  };

  const buttonConfig = {
    type: "icon", // Type of button (icon or standard)
    theme: "filled_black", // Button theme (outline, filled_blue, filled_black)
    shape: "circle", // Button shape (rectangular, pill, circle, square)
    locale: "en", // Language for the button
    click_listener: () => {
      console.log("Google button clicked");
    },
  };

  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (googleButtonRef.current) {
      googleButtonRef.current.style.backgroundColor = "black";
      googleButtonRef.current.style.borderRadius = "50%";
      googleButtonRef.current.style.padding = "10px 10px"; // Adjust padding for round shape
    }
  }, []);

  return (
    <Form
      className="w-full justify-center items-center "
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <h1 style={{ marginBottom: "20px" }} className="futuristic-text">
        Welcome Back
      </h1>
      <div className="flex flex-col gap-4 max-w-md w-full">
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Please enter your email";
            }
            if (validationDetails.typeMismatch) {
              return "Please enter a valid email address";
            }
          }}
          label=""
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage={errors.password} // Use the error from the state
          isInvalid={errors.password !== null} // Check if there's a password error
          label=""
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onValueChange={(value) => {
            setPassword(value);
            // Optionally handle real-time validation
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: getPasswordError(value),
            }));
          }}
        />

        <div className="flex gap-4">
          <Button
            className="w-full"
            color="primary"
            type="submit"
            disabled={isLoading} // Disable button during submission
          >
            {isLoading ? "Logging in..." : "Submit"}
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>

        {/* Google OAuth Login Button */}
        <div
          className="custom-google-btn-container google-btn-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginFailure}
            useOneTap
            {...buttonConfig}
            ref={googleButtonRef}
            className="custom-google-button"
          />
        </div>
      </div>

      {/* Display submitted data */}
      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
