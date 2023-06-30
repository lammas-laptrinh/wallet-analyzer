import { FileDoneOutlined, FileProtectOutlined } from "@ant-design/icons";
import { Card, Col, Radio, RadioChangeEvent, Row, Space } from "antd";
import { Typography } from "antd";
import { TagsAchievement } from "../../helpers";
import React from "react";
import { getWalletPortfolio } from "../../api";
import { useSearchParams } from "react-router-dom";

const { Title, Text } = Typography;

const textStyle: React.CSSProperties = {
  color: "white",
};
const goalContainerStyle: React.CSSProperties = {
  width: "100%",
  padding: 12,
  paddingLeft: 24,
  paddingRight: 24,
  overflowY: "scroll",
  height: "85vh",
};

const optionsWithDisabled = [
  { label: "Active", value: false },
  { label: "Archived", value: true },
];

export default function Goal() {
  const [isCompleted, setisCompleted] = React.useState(false);
  const [searchParams] = useSearchParams();
  const [goals, setGoals] = React.useState(TagsAchievement);

  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio4 checked", value);
    setisCompleted(value);
  };
  React.useEffect(() => {
    const wallet = searchParams.get("wl");
    const network = searchParams.get("network");
    if (wallet && network) {
      getWalletPortfolio(network, wallet).then((walletPortfolio) => {
        if (walletPortfolio.details) {
          const { nfts, num_nfts }: any = walletPortfolio.details;
          if (num_nfts > 1) {
            setGoals(
              goals.map((goal) => {
                goal.isCompleted =
                  nfts.filter((nft: any) => nft.name === goal.title).length > 0;
                return goal;
              })
            );
          }
        }
      });
    }
  }, []);
  return (
    <Space direction="vertical" size={[0, 24]} style={goalContainerStyle}>
      <Title style={textStyle} level={2}>
        Goal Openings
      </Title>
      <Text style={textStyle} type="secondary">
        Finish goal to get Achicevement
      </Text>
      <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange4}
        value={isCompleted}
        optionType="button"
        buttonStyle="solid"
      />
      <Row gutter={[28, 28]}>
        {TagsAchievement.filter((item) => item.isCompleted === isCompleted).map(
          (item) => {
            const statusIcon = item.isCompleted ? (
              <FileDoneOutlined />
            ) : (
              <FileProtectOutlined />
            );
            return (
              <Col
                key={item.id}
                md={8}
                order={item.id}
                style={{ width: "100%" }}
              >
                <Card
                  cover={
                    <img
                      height={200}
                      style={{
                        objectFit: "cover",
                        objectPosition: "center-bottom",
                      }}
                      alt="example"
                      src={item.coverUrl}
                    />
                  }
                  actions={[
                    statusIcon,
                    <Text type="secondary">
                      {/* <FileSyncOutlined key="progress" /> */}
                      {/* <span style={{ marginLeft: 6 }}>0</span> */}
                      Active
                    </Text>,
                  ]}
                >
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                </Card>
              </Col>
            );
          }
        )}
      </Row>
    </Space>
  );
}
