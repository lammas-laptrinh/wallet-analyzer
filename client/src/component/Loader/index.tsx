import { Spin } from "antd";

export default function Loader() {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Spin size="large" />
    </div>
  );
}
