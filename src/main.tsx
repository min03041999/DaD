import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ComponentProvider } from "./context/componentsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ComponentProvider>
    <App />
  </ComponentProvider>
);
