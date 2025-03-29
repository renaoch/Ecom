import React, { useEffect, useRef } from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import "../index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import the CSS

export default function Auth() {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [focused, setFocused] = React.useState(false); // Track if input is focused
  const [touched, setTouched] = React.useState({}); // Track if fields have been touched

  // Real-time password validation
  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
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

    // Username validation
    if (
      data.name === "admin" ||
      data.name === "motherchod" ||
      data.name === "rendi" ||
      data.name === "bokachoda" ||
      data.name === "fuck" ||
      data.name === "mc" ||
      data.name === "bc"
    ) {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (data.terms !== "true") {
      setErrors({ terms: "Please accept the terms" });
      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);

    try {
      // Sending data to the backend (localhost:5000/api/auth/register)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send the form data as JSON
      });

      if (response.ok) {
        // Handle success, e.g., navigate to a different page or show a success message
        toast.success("Registration successful!");
        console.log("Registration successful:", await response.json());
      } else {
        // Handle error response from the server
        toast.error("Error during registration:!");
        console.error("Error during registration:", await response.json());
      }
    } catch (error) {
      toast.error("Server Error");
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
      googleButtonRef.current.style.padding = "10px 20px"; // Adjust padding for round shape
    }
  }, []);

  return (
    <Form
      className="w-full justify-center items-center space-y-4 m-3 bg-blue-500"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <ToastContainer
        position="top-left"
        autoClose={3000} // Show for 3 seconds
        hideProgressBar={true} // Hide progress bar
        newestOnTop={false} // Old toasts show up on top
        closeOnClick={false} // Toast won't close when clicked
      />
      <h1 style={{ marginBottom: "20px" }} className="futuristic-text">
        Create Account
      </h1>
      <div className="flex flex-col gap-4 max-w-md w-full">
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Please enter your name";
            }

            return errors.name;
          }}
          label=""
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
        />

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
          errorMessage={focused || password ? getPasswordError(password) : null}
          isInvalid={getPasswordError(password) !== null}
          label=""
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onFocus={() => setFocused(true)} // Mark as focused when the user focuses on the input
          onBlur={() => setFocused(false)} // Mark as unfocused when the user leaves the input
          onValueChange={setPassword}
        />

        <Select
          isRequired
          label=""
          labelPlacement="outside"
          name="country"
          placeholder="Select country"
          className="w-full"
        >
          <SelectItem key="ar">India</SelectItem>
          <SelectItem key="us">United States</SelectItem>
          <SelectItem key="ca">Canada</SelectItem>
          <SelectItem key="uk">United Kingdom</SelectItem>
          <SelectItem key="au">Australia</SelectItem>
        </Select>

        <Checkbox
          isRequired
          classNames={{
            label: "text-small",
          }}
          isInvalid={!!errors.terms}
          name="terms"
          validationBehavior="aria"
          value="true"
          onValueChange={() =>
            setErrors((prev) => ({ ...prev, terms: undefined }))
          }
        >
          I agree to the terms and conditions
        </Checkbox>

        {errors.terms && (
          <span className="text-danger text-small">{errors.terms}</span>
        )}

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>

        {/* Add Google OAuth Login Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="custom-google-btn-container google-btn-wrapper"
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
    </Form>
  );
}
