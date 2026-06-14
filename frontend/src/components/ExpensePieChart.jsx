import {Cell,Legend,Pie,PieChart,ResponsiveContainer,Tooltip,} from "recharts";

const COLORS = ["#3B82F6","#10B981","#F59E0B","#EF4444","#8B5CF6",];

export default function ExpensePieChart({ data }) {
  if (!data?.length) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-xl font-bold text-slate-800">
          Expenses by Category
        </h2>

        <p className="text-slate-500 mt-4">
          No expense data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">
          Expenses by Category
        </h2>

        <p className="text-sm text-slate-500">
          Expense distribution across categories
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={100}
            label={({ payload }) => payload.category}
          >
            {data.map((item, index) => (
              <Cell
                key={item.category}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              `₹${value}`,
              "Amount",
            ]}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}