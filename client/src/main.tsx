import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#28b1e0",
          fontFamily: "Nunito",
        },
        components: {
          Menu: {
            colorPrimary: "#28b1e0",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
