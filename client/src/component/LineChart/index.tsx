import { Tooltip } from "antd";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Label,
} from "recharts";

type Item = {
  name: string;
  receiver: number;
  sender: number;
};
type LineChartSimpleProps = {
  data: Array<Item>;
};

export default function LineChartSimple({ data }: LineChartSimpleProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip showArrow trigger="hover" />
        <Label />
        <Legend />
        <Line
          type="monotone"
          dataKey="sender"
          stroke="#8884d8"
          activeDot={{
            r: 8,
          }}
        />
        <Line type="monotone" dataKey="receiver" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
