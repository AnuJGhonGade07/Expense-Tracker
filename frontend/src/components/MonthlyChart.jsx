import { BarChart,Bar,XAxis,YAxis,Tooltip, ResponsiveContainer,} from "recharts";

export  default function MonthlyChart({data}){
    return(
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4">
                Monthly Expenses
            </h2>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data} >
                    <XAxis dataKey="month"/>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#10B981"  name="Income" />
                    <Bar dataKey="expense" fill="#EF4444" name="Expense"/>
                </BarChart>


            </ResponsiveContainer>
        </div>
    )
}