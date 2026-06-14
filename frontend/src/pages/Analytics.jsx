import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import MonthlyChart from "../components/MonthlyChart";
import CategoryBreakdownChart from "../components/CategoryBreakdownChart";
import StatCard from "../components/StatCard";

import {
  getCategoryAnalytics,
  getMonthlyAnalytics,
} from "../services/analyticsService";

import { getDashboardData } from "../services/dashboardService";

import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaWallet,
} from "react-icons/fa6";

export default function Analytics() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  const fetchMonthlyData = async () => {
    try {
      const data = await getMonthlyAnalytics();
      setMonthlyData(data);
    } catch (error) {
      console.error(
        "Failed to fetch monthly analytics:",
        error
      );
    }
  };

  const fetchCategoryData = async () => {
    try {
      const data =
        await getCategoryAnalytics();

      setCategoryData(data);
    } catch (error) {
      console.error(
        "Failed to fetch category analytics:",
        error
      );
    }
  };

  const fetchDashboardData = async () => {
    try {
      const data =
        await getDashboardData();

      setDashboard(data);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard data:",
        error
      );
    }
  };

  useEffect(() => {
    fetchMonthlyData();
    fetchDashboardData();
    fetchCategoryData();
  }, []);

  const transformedData = {};

  monthlyData.forEach((item) => {
    const month = item._id.month;

    if (!transformedData[month]) {
      transformedData[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    transformedData[month][item._id.type] =
      item.total;
  });

  const chartData =
    Object.values(transformedData);

  if (!dashboard) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <StatCard
          title="Income"
          value={`₹${dashboard.totalIncome}`}
          color="text-green-500"
          icon={<FaArrowTrendUp />}
        />

        <StatCard
          title="Expense"
          value={`₹${dashboard.totalExpense}`}
          color="text-red-500"
          icon={<FaArrowTrendDown />}
        />

        <StatCard
          title="Savings"
          value={`₹${dashboard.balance}`}
          color="text-blue-500"
          icon={<FaWallet />}
        />

      </div>

      <div className="space-y-6">
        <MonthlyChart data={chartData} />
        <CategoryBreakdownChart data={categoryData} />
      </div>

    </DashboardLayout>
  );
}