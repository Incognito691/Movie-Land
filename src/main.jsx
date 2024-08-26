import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);
