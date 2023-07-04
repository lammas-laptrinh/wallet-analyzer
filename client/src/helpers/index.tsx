import {
  PieChartOutlined,
  TransactionOutlined,
  // AppstoreOutlined,
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
  // type?: "group",
  disabled?: boolean
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    // type,
    disabled,
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
  getItem("Wallet Info", "/", <WalletOutlined />),
  getItem("Tags", "tags", <PieChartOutlined />),
  getItem("Goals", "goal", <TransactionOutlined />),
  // getItem("Navigation One", "sub1", <AppstoreOutlined />, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Option 7", "7"),
  //   getItem("Option 8", "8"),
  // ]),
  // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 11", "11"),
  //     getItem("Option 12", "12"),
  //   ]),
  // ]),
];

export const TagsAchievement = [
  {
    id: "1",
    title: "NFT Groundbreaker",
    description: "You need 1 NFT to get the Tag",
    coverUrl:
      "https://image.lexica.art/full_jpg/26dc048d-05f3-4a6d-8d9a-2613eef67948",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Token Genius",
    description: "You need 10 token quantity greater 1 to get the tag",
    coverUrl:
      "https://image.lexica.art/full_jpg/e03a9691-bd1c-48f1-b068-31e62deed413",
    isCompleted: false,
  },
  // {
  //   id: "3",
  //   title: "Leaderboard",
  //   description: "This tag is used to a player's position on a leaderboard",
  //   coverUrl:
  //     "https://image.lexica.art/full_jpg/2d4b46ef-245d-4a29-a41e-61c8a2edab54",
  //   isCompleted: false,
  // },
  // {
  //   id: "4",
  //   title: "Rare",
  //   description: "This tag is used to  a rare or special achievement",
  //   coverUrl:
  //     "https://image.lexica.art/full_jpg/d66d99aa-b2f8-48ec-a42b-a1fa65961f4f",
  //   isCompleted: false,
  // },
  // {
  //   id: "8",
  //   title: "Exclusive",
  //   description: "This tag is only available to a select group of people",
  //   coverUrl:
  //     "https://image.lexica.art/full_jpg/b9b34d36-e3e7-4e9c-b354-ef4dd3c98c86",
  //   isCompleted: false,
  // },
  // {
  //   id: "5",
  //   title: "Limited Edition",
  //   description: "This tag is  only available for a limited time",
  //   coverUrl:
  //     "https://image.lexica.art/full_jpg/068fff49-5d59-4155-9f2c-55a60cf193c6",
  //   isCompleted: false,
  // },
  // {
  //   id: "6",
  //   title: "Collectible",
  //   description: "This tag is used to an achievement that is collectible",
  //   coverUrl:
  //     "https://image.lexica.art/full_jpg/1b9517b3-ef37-4c3e-a377-351eff070cff",
  //   isCompleted: false,
  // },
  // {
  //   id: "7",
  //   title: "Soulbound",
  //   description: "non-transferable",
  //   coverUrl:
  //     "https://image.lexica.art/full_jpg/9bb53d6a-aeff-4e4f-97f0-bf7eabcca78b",
  //   isCompleted: false,
  // },
];
