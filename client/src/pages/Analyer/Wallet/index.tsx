import { Card, Input, Space } from "antd";
import Coin from "../../../assets/coin.png";
import Nft from "../../../assets/nft.png";
import Solana from "../../../assets/solana2.png";
import Achivement from "../../../assets/achivement.png";
import Tags from "../../../assets/tags.png";
import WalletAvatar from "../../../assets/walletAvatar.svg";
import Section from "../../../component/Section";
import LineChartSimple from "../../../component/LineChart";
import { shorterAddress } from "../../../utils";
import PieChartDonut from "../../../component/PieChart";
import { TableBasic } from "../../../component/Table";
import { useNavigate } from "react-router-dom";

const formItemStyle: React.CSSProperties = {
  borderWidth: 1,
  borderColor: "black",
  borderRadius: 12,
  padding: 24,
  width: "100%",
  backgroundColor: "#001529",
};
const inputStyle: React.CSSProperties = {
  backgroundColor: "#0c2033",
  borderWidth: 1,
  color: "white",
};

const walletStyle: React.CSSProperties = {
  margin: 12,
  overflowY: "scroll",
  height: "85vh",
};

const walletAddress = "3YNyqvs6aGGtgtRKQ27ysP6GK5vVJ37vq86JWqyfyLD2";

const walletPortfolio = [
  { id: "1", avatarUrl: Solana, description: "Balance", title: "30000" },
  { id: "2", avatarUrl: Nft, description: "NFTs", title: "20" },
  { id: "3", avatarUrl: Coin, description: "Tokens", title: "300" },
  { id: "4", avatarUrl: Tags, description: "Tags", title: "3", to: "tags" },
  {
    id: "5",
    avatarUrl: Achivement,
    description: "Goals",
    title: "2",
    to: "goal",
  },
];

const pageData = [
  { name: new Date().toDateString(), receive: 3000, send: 2600, amt: 3400 },
  { name: new Date().toDateString(), receive: 400, send: 4367, amt: 6400 },
  { name: new Date().toDateString(), receive: 300, send: 1398, amt: 2400 },
  { name: new Date().toDateString(), receive: 6000, send: 9800, amt: 2400 },
  { name: new Date().toDateString(), receive: 278, send: 3908, amt: 2400 },
  { name: new Date().toDateString(), receive: 1890, send: 4800, amt: 2400 },
  { name: new Date().toDateString(), receive: 1890, send: 4800, amt: 2400 },
];

export default function Wallet() {
  const navigate = useNavigate();

  return (
    <div id="wallet-container" style={walletStyle}>
      <section>
        <h2 style={{ color: "white", margin: 8 }}>
          Search for wallet addresses to follow past transaction
        </h2>
        <Space direction="vertical" style={formItemStyle}>
          <Input.Search
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value: string) => console.log(value)}
            style={inputStyle}
            placeholder="search wallet address"
          />
        </Space>
      </section>
      <Section size={[48, 16]} title="Wallet Portfolio">
        {walletPortfolio.map(({ avatarUrl, title, description, id, to }) => (
          <Card
            style={{ cursor: to ? "pointer" : "" }}
            onClick={to !== undefined ? () => navigate(to) : to}
            key={id}
          >
            <Card.Meta
              avatar={<img style={{ width: 64 }} alt="coin" src={avatarUrl} />}
              title={title}
              description={description}
            />
          </Card>
        ))}
      </Section>
      <Section title="Recent Wallets Search">
        {new Array(20).fill(null).map((_, index) => (
          <Card key={index} title={new Date().toDateString()}>
            <Card.Meta
              avatar={
                <img style={{ width: 24 }} alt="tags" src={WalletAvatar} />
              }
              title={shorterAddress(walletAddress)}
            />
          </Card>
        ))}
      </Section>
      <Section title="Token Portfolio" />
      <div
        style={{
          backgroundColor: "#171921",
          borderWidth: 1,
          borderColor: "#4244a",
          borderStyle: "solid",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            height: 500,
            overflowX: "auto",
            padding: 12,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "30%",
              backgroundColor: "#171921",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#4244a",
              borderStyle: "solid",
            }}
          >
            <PieChartDonut />
          </div>
          <div
            style={{
              width: "68%",
              backgroundColor: "#171921",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#4244a",
              borderStyle: "solid",
            }}
          >
            <LineChartSimple data={pageData} />
          </div>
        </div>
        <div style={{ padding: 24 }}>
          <TableBasic />
        </div>
      </div>
    </div>
  );
}
