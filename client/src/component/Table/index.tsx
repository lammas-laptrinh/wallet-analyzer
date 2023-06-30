import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd/es/table";
import { DataType, columns } from "./columns";

interface TableBasicProps {
  data: Array<DataType>;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export const TableBasic: React.FC<TableBasicProps> = ({ data }) => (
  <Table columns={columns} dataSource={data} onChange={onChange} />
);
