import { Card, Empty, Input, Radio, Space } from "antd";
import Section from "../../../component/Section";
import LineChartSimple from "../../../component/LineChart";
import { shorterAddress } from "../../../utils";
import WalletAvatar from "../../../assets/walletAvatar.svg";

import PieChartDonut from "../../../component/PieChart";
import { TableBasic } from "../../../component/Table";
import { useNavigate } from "react-router-dom";
import useWallet from "./useWallet";

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

const tokenContainerStyle: React.CSSProperties = {
  backgroundColor: "#171921",
  borderWidth: 1,
  borderColor: "#4244a",
  borderStyle: "solid",
  borderRadius: 12,
};

const piechartStyle: React.CSSProperties = {
  width: "31%",
  backgroundColor: "black",
  borderRadius: 12,
  // borderWidth: 1,
  // borderColor: "#4244a",
  // borderStyle: "solid",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  position: "relative",
};
const lineChartStyle: React.CSSProperties = {
  width: "68%",
  backgroundColor: "black",
  borderRadius: 12,
  padding: 12,
  // borderWidth: 1,
  // borderColor: "#4244a",
  // borderStyle: "solid",
};

const optionsWithDisabled = [
  { label: "Top 5", value: 5 },
  { label: "Top 10", value: 10 },
  { label: "Top 15", value: 15 },
];

export default function Wallet() {
  const {
    portfolioInfo,
    allTokens,
    topTokens,
    searchParrams,
    handleSearch,
    handleCardClick,
    handleSelectTopValue,
    recentSearchWallet,
    pieChartData,
    lineChartData,
  } = useWallet();
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
            onSearch={(value: string) => handleSearch(value)}
            style={inputStyle}
            placeholder="search wallet address"
          />
        </Space>
      </section>
      <Section size={[48, 16]} title="Wallet Portfolio">
        {portfolioInfo.map(({ avatarUrl, title, description, id, to }) => (
          <Card
            style={{ cursor: to ? "pointer" : "" }}
            onClick={to !== undefined ? () => navigate({pathname:to,search:searchParrams.toString()}) : to}
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
      {recentSearchWallet.length > 0 && (
        <Section title="Recent Wallets Search">
          {recentSearchWallet.map((item, index) => (
            <Card
              onClick={() => handleCardClick(item.address)}
              key={index}
              title={item.time}
            >
              <Card.Meta
                avatar={
                  <img style={{ width: 24 }} alt="tags" src={WalletAvatar} />
                }
                title={shorterAddress(item.address)}
              />
            </Card>
          ))}
        </Section>
      )}

      <Section title="Token Portfolio" />
      <div style={tokenContainerStyle}>
        <div
          style={{
            display: "flex",
            height: 500,
            overflowX: "auto",
            padding: 12,
            justifyContent: "space-between",
          }}
        >
          <div style={piechartStyle}>
            <Radio.Group
              style={{ position: "absolute", top: 10, zIndex: 1 }}
              options={optionsWithDisabled}
              onChange={handleSelectTopValue}
              value={topTokens}
              optionType="button"
              buttonStyle="solid"
            />
            {pieChartData.length > 0 ? (
              <PieChartDonut data={pieChartData.slice(0, topTokens)} />
            ) : (
              <Empty description={false} />
            )}
          </div>
          <div style={lineChartStyle}>
            <LineChartSimple data={lineChartData} />
          </div>
        </div>
        <div style={{ padding: 24 }}>
          <TableBasic data={allTokens} />
        </div>
      </div>
    </div>
  );
}
