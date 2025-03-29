// main.tsx or index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import App from "./App";
import "./index.css"; // Ensure Tailwind's styles are included

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HeroUIProvider>
      {/* Adding 'dark' class directly here */}
      <main >
        <App />
      </main>
    </HeroUIProvider>
  </React.StrictMode>
);
