import { Tooltip } from 'antd';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line } from 'recharts';

const pageData = [
    { name: 'Page A', uv: 300, pv: 2600, amt: 3400 },
    { name: 'Page B', uv: 400, pv: 4367, amt: 6400 },
    { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
    { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page G', uv: 189, pv: 4800, amt: 2400 },
  ];

export default function LineChartSimple() {
  return (
    <ResponsiveContainer width="100%" height="100%">
    <LineChart width={500} height={300} data={pageData} margin={{
    top: 5,
    right: 30,
    left: 20,
    bottom: 5
  }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{
      r: 8
    }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
  )
}
