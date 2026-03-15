import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("[v0] App starting...");

const rootElement = document.getElementById("root");
if (rootElement) {
  console.log("[v0] Root element found, rendering app...");
  createRoot(rootElement).render(<App />);
} else {
  console.error("[v0] Root element not found!");
}
