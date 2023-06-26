import {
  PieChartOutlined,
  TransactionOutlined,
  AppstoreOutlined,
  WalletOutlined,
  BellOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
export const HeaderItems: MenuItem[] = [
  getItem(null, "1", <BellOutlined />),
  getItem(
    null,
    "2",
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className=""
      viewBox="0 0 1024 1024"
    >
      <path d="M16 512c0 273.932 222.066 496 496 496s496-222.068 496-496S785.932 16 512 16 16 238.066 16 512z m496 368V144c203.41 0 368 164.622 368 368 0 203.41-164.622 368-368 368z"></path>
    </svg>
  ),
  getItem(null, "3", <GlobalOutlined />),
];

export const SiderItems: MenuItem[] = [
  getItem("Wallet Info", "1", <WalletOutlined />),
  getItem("Smart money", "2", <PieChartOutlined />),
  getItem("Transactions", "3", <TransactionOutlined />),
  getItem("Navigation One", "sub1", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];
