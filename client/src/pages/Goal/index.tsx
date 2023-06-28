import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  
} from "@ant-design/icons";
import { Card, Col, Row, Space } from "antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

export default function Goal() {
  return (
    <Space direction="vertical" style={{ width: "100%", padding: 12 }}>
      <Title color="white" level={2}>
        Goal
      </Title>
      <Text type="secondary">Ant Design (secondary)</Text>
      <Row>
        <Col span={6} order={4}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Card.Meta title="test" description="test" />
          </Card>
        </Col>
        <Col span={6} order={3}>
          2 col-order-3
        </Col>
        <Col span={6} order={2}>
          3 col-order-2
        </Col>
        <Col span={6} order={1}>
          4 col-order-1
        </Col>
      </Row>
    </Space>
  );
}
