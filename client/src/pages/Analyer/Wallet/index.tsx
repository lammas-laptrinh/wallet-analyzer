import { Card, Input, Space } from "antd";
import Coin from "../../../assets/coin.png";
import Nft from "../../../assets/nft.png";
import Solana from "../../../assets/solana2.png";
import Tags from "../../../assets/tags.png";
import WalletAvatar from "../../../assets/walletAvatar.svg";
import Section from "../../../component/Section";
import LineChartSimple from "../../../component/LineChart";

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

const walletAddress = "3YNyqvs6aGGtgtRKQ27ysP6GK5vVJ37vq86JWqyfyLD2";

export default function Wallet() {
  return (
    <div id="wallet-container" style={{ margin: 12 }}>
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
        <Card>
          <Card.Meta
            avatar={<img style={{ width: 64 }} alt="coin" src={Solana} />}
            title="30000"
            description="Balance"
          />
        </Card>
        <Card>
          <Card.Meta
            avatar={<img style={{ width: 64 }} alt="nft" src={Nft} />}
            title="20"
            description="NFTs"
          />
        </Card>
        <Card>
          <Card.Meta
            avatar={<img style={{ width: 64 }} alt="example" src={Coin} />}
            title="300"
            description="Tokens"
          />
        </Card>
        <Card>
          <Card.Meta
            avatar={<img style={{ width: 64 }} alt="tags" src={Tags} />}
            title="3"
            description="Tags"
          />
        </Card>
      </Section>
      <Section title="Recent Wallets Search">
        {new Array(20).fill(null).map((_, index) => (
          <Card key={index} title={new Date().toDateString()}>
            <Card.Meta
              avatar={
                <img style={{ width: 24 }} alt="tags" src={WalletAvatar} />
              }
              title={`${walletAddress.slice(0, 5)}...${walletAddress.slice(
                walletAddress.length - 20,
                walletAddress.length - 1
              )}`}
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
              title={`${walletAddress.slice(0, 5)}...${walletAddress.slice(
                walletAddress.length - 20,
                walletAddress.length - 1
              )}`}
            />
          </Card>
        ))}
      </Section>
      {/* <Section title="Te">
        <LineChartSimple />
      </Section> */}
    </div>
  );
}
