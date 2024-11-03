import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SchoolProvider } from "./hooks/SchoolContextProvider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="w-screen h-screen m-0 p-0 bg-gray-100">
    <SchoolProvider>
      <App />
    </SchoolProvider>
    </div>
  </StrictMode>
);
