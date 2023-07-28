import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ColorContextProvider } from "./context/ColorContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ColorContextProvider>
    <App />
  </ColorContextProvider>
);

reportWebVitals();
