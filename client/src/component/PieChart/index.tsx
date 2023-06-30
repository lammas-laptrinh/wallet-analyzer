import { Tooltip } from "antd";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  LabelList,
  Cell,
} from "recharts";

type pieChartProps = {
  data: Array<{
    name: string;
    value: number;
    v: number;
    fill: string;
  }>;
};

const colors = [
  "#57c0e8",
  "#FF6565",
  "#960018",
  "#FC6A03",
  "#FDA172",
  "#DFC98A",
  "#DCD7A0",
  "#3CB043",
  "#028A0F",
  "#52B2BF",
  "#fb879a",
  "#212745",
  "#706474",
  "#f3eed9",
  "#dfd9d9"
];

export default function PieChartDonut({ data }: pieChartProps) {
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius="45%" outerRadius="80%">
          {data.map((_, index) => (
            <Cell key={`slice-${index}`} fill={colors[index % 10] as string} />
          ))}
          <LabelList position="inside" />
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
