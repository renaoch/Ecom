import React from "react";
import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomToastContainer({
  position,
  autoClose,
  hideProgressBar,
  newestOnTop,
  closeOnClick,
}) {
  return (
    <ReactToastContainer
      position={position || "top-right"} // Default to top-right
      autoClose={autoClose || 5000} // Default to 5 seconds
      hideProgressBar={hideProgressBar || false} // Default to false
      newestOnTop={newestOnTop || true} // Default to true
      closeOnClick={closeOnClick || true} // Default to true
    />
  );
}

export default CustomToastContainer;
