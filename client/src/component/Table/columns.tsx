import { Image, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { shorterAddress } from "../../utils";
import React from "react";

export interface DataType {
  key: React.Key;
  name: string;
  address: string;
  balance: number;
  symbol: string;
  image: string;
}

const textStyle: React.CSSProperties = {
  color: "white",
};

const tokenNameStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.5",
};

export const columns: ColumnsType<DataType> = [
  {
    title: "Token Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
    render: (_, { name, symbol, image }) => (
      <Space style={{ width: "100%" }} direction="horizontal">
        <Image width={48} height={48} src={image} />
        <Typography.Text style={textStyle}>{name}</Typography.Text>
        <Typography.Text style={tokenNameStyle} type="secondary">
          {symbol}
        </Typography.Text>
      </Space>
    ),
  },
  {
    title: "Balance",
    dataIndex: "balance",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.balance - b.balance,
  },
  {
    title: "Address",
    dataIndex: "address",
    sorter: (a, b) => a.address.length - b.address.length,
    render: (_, { address }) => (
      <Typography.Text style={textStyle} copyable={{ text: address }}>
        {shorterAddress(address)}
      </Typography.Text>
    ),
  },
];
