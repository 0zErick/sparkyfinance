import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";

// Apply saved theme on load
const savedTheme = localStorage.getItem("sparky-theme") || "dark";
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Global capture for silent failures (Promise rejections + uncaught errors)
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    // eslint-disable-next-line no-console
    console.error("[unhandledrejection]", event.reason);
  });
  window.addEventListener("error", (event) => {
    // eslint-disable-next-line no-console
    console.error("[window.error]", event.message, event.error);
  });
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
