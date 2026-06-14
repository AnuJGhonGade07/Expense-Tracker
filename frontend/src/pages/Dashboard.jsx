import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardData, getRecentTransactions } from "../services/dashboardService";
import { FaArrowTrendUp,FaArrowTrendDown,FaWallet,FaReceipt,} from "react-icons/fa6";
import { getCategoryAnalytics } from "../services/analyticsService";
import ExpensePieChart from "../components/ExpensePieChart";


export default function Dashboard() {

    const[dashboard,setDashboard] = useState(null);
    const[recentTransactions,setrecentTransaction] = useState([]);
    const[categoryData, setCategoryData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    const fetchDashboard = async () => {
        try {
            const data = await getDashboardData();
            console.log(data)
            setDashboard(data)

            const recent = await getRecentTransactions();
            setrecentTransaction(recent);

            const analytics = await getCategoryAnalytics();
            console.log("Analytics Data:", analytics);
            setCategoryData(analytics)
        } catch (error) {
            console.log(error)
        }
    }
      const filteredTransactions =
        recentTransactions.filter(
          (transaction) =>
            transaction.title
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||

            transaction.category
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        );

    useEffect(()=>{
        fetchDashboard()
    },[])

    if(!dashboard){
        return (<h1>Loading...</h1>);
    }

  return (
    <DashboardLayout>

        <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}/>

        <div className="grid grid-cols-4  gap-5 mt-6">
            <StatCard
          title="Income"
          value={`₹${dashboard.totalIncome}`}
          color="text-green-500"
          icon ={<FaArrowTrendUp/>}
        />

        <StatCard
          title="Expense"
          value={`₹${dashboard.totalExpense}`}
          color="text-red-500"
          icon={<FaArrowTrendDown />}
        />

        <StatCard
          title="Balance"
          value={`₹${dashboard.balance}`}
          color="text-blue-500"
           icon={<FaWallet />}
        />

        <StatCard
          title="Transactions"
          value={dashboard.totalTransactions}
          color="text-indigo-500"
           icon={<FaReceipt />}
        />
        </div>

        <h1 className="text-3xl font-bold mt-6">Dashboard</h1>

        <div className="mt-8">
        <ExpensePieChart
            data={categoryData} />
        </div>

<div className=" bg-white rounded-2xl
  shadow-sm
  border
  border-slate-200
  mt-8
  overflow-hidden
  "
>
  <div className="p-6 border-b border-slate-200">
    <h2 className="text-xl font-bold text-slate-800">
      Recent Transactions
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      Your latest financial activities
    </p>
  </div>

  <table className="w-full">
    <thead>
      <tr className="bg-slate-50">
        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
          Title
        </th>

        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
          Amount
        </th>

        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
          Category
        </th>

        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
          Type
        </th>
      </tr>
    </thead>

    <tbody>
      {filteredTransactions.map((transaction) => (
        <tr
          key={transaction._id}
          className="
          border-t
          border-slate-100
          hover:bg-slate-50
          transition
          "
        >
          <td className="px-6 py-4 font-medium text-slate-800">
            {transaction.title}
          </td>

          <td className="px-6 py-4 font-semibold">
            ₹
            {new Intl.NumberFormat(
              "en-IN"
            ).format(
              transaction.amount
            )}
          </td>

          <td className="px-6 py-4">
            <span
              className="
              px-3
              py-1
              rounded-full
              bg-blue-100
              text-blue-700
              text-sm
              "
            >
              {transaction.category}
            </span>
          </td>

          <td className="px-6 py-4">
            <span
              className={
                transaction.type ===
                "income"
                  ? `
                    px-3
                    py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                    text-sm
                  `
                  : `
                    px-3
                    py-1
                    rounded-full
                    bg-red-100
                    text-red-700
                    text-sm
                  `
              }
            >
              {transaction.type}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </DashboardLayout>
  );
}