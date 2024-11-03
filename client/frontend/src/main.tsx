import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SchoolProvider } from "./hooks/SchoolContextProvider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SchoolProvider>
      <App />
    </SchoolProvider>
  </StrictMode>
);
