import { Button, Layout, Menu } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Logo from "../../assets/logo2.png";
import { SiderItems, HeaderItems } from "../../helpers";
import React from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { WalletOutlined } from "@ant-design/icons";
import { onConnectWallet } from "../../utils";

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
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Layout>
      <Sider style={siderStyle}>
        <div className="header-logo">
          <Link to={{ pathname: "/", search: searchParams.toString() }}>
            <img style={{ width: 64, height: 64 }} src={Logo} alt="logo" />
          </Link>
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          items={SiderItems}
        />
      </Sider>
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
          (
          {searchParams.get("wl") === null && (
            <Button
              onClick={async () => {
                const walletAddress = await onConnectWallet();
                setSearchParams(`wl=${walletAddress}`);
              }}
              icon={<WalletOutlined />}
              type="primary"
            >
              Conenct
            </Button>
          )}
          )
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
