import { Layout, Menu } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Logo from "../../assets/logo2.png";
import { SiderItems, HeaderItems } from "../../helpers";
import React from "react";
import Wallet from "../../pages/Analyer/Wallet";

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};
const contentStyle: React.CSSProperties = {
  backgroundColor: "#222327",
};
const siderStyle: React.CSSProperties = {
  height: "100vh",
  overflowY: "auto",
  opacity: 0.95,
};

export default function MainLayout() {
  return (
    <Layout>
      <Sider style={siderStyle}>
        <div className="header-logo">
          <img style={{ width: 64, height: 64 }} src={Logo} alt="logo" />
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={true}
          items={SiderItems}
        />
      </Sider>
      {/* <Layout style={{ overflowY: "auto" }}> */}
      <Layout>
        <Header style={headerStyle} className="header-container">
          <div className="header-title">
            <h2>Wallet Analyer</h2>
          </div>
          <Menu
            activeKey={undefined}
            theme="dark"
            mode="horizontal"
            items={HeaderItems}
          />
        </Header>
        <Content style={contentStyle}>
          <Wallet />
        </Content>
      </Layout>
    </Layout>
  );
}
