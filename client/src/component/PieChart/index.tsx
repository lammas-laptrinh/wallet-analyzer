import { Tooltip } from "antd";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  LabelList,
} from "recharts";

const data01 = [
  { name: "Group A", value: 400, v: 89, fill: "#57c0e8" },
  { name: "Group B", value: 300, v: 100, fill: "#FF6565" },
  { name: "Group C", value: 200, v: 200, fill: "#960018" },
  { name: "Group D", value: 200, v: 20, fill: "#FC6A03" },
  { name: "Group E", value: 278, v: 40, fill: "#DCD7A0" },
  { name: "Group F", value: 189, v: 60, fill: "#52B2BF" },
];

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
];

export default function PieChartDonut() {
  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie data={data01} dataKey="value" innerRadius="45%" outerRadius="80%">
          <LabelList position="inside" />
        </Pie>
        <Legend values="test" />
        <Tooltip trigger="hover" />
      </PieChart>
    </ResponsiveContainer>
  );
}
