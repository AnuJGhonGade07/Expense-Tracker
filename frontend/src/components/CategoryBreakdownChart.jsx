import {Bar,BarChart,CartesianGrid,ResponsiveContainer,Tooltip,XAxis,YAxis,} from "recharts";

export default function CategoryBreakdownChart({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Category Breakdown
        </h2>

        <p className="text-sm text-slate-500">
          Spending by category
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height={220}
      >
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="category"
            width={80}
          />

          <Tooltip
            formatter={(value) => [
              `₹${value}`,
              "Amount",
            ]}
          />

          <Bar
            dataKey="amount"
            fill="#3B82F6"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}