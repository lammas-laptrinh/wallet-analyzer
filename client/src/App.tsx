// import "./App.css";
import MainLayout from "./component/Layouts/MainLayout";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#28b1e0",
          fontFamily: "Nunito",
          colorTextDisabled:'gray'
        },

        components: {
          Menu: {
            colorPrimary: "#28b1e0",
          },
          Table: {
            colorPrimary: "white",
          },
        },
      }}
    >
      <MainLayout />
    </ConfigProvider>
  );
}

export default App;
