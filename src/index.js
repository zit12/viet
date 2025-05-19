import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; // thêm dòng này

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* thêm BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: dùng để đo hiệu năng
reportWebVitals();
