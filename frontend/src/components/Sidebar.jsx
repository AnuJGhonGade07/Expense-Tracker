import {FaChartPie,FaUser,FaWallet,} from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";

import {NavLink,useNavigate,} from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-100 text-blue-600 font-medium"
      : "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition";

  return (
    <div className="fiexd left-0 top-0 h-screen w-64 bg-white shadow-md border-r border-slate-200 flex flex-col justify-between p-6">

      <div>

        <h1 className="text-2xl font-extrabold text-blue-600 mb-10">
          ExpenseTracker
        </h1>

        <div className="space-y-2">

          <NavLink
            to="/dashboard"
            className={navLinkClass}
          >
            <FaChartPie />
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={navLinkClass}
          >
            <FaWallet />
            Transactions
          </NavLink>

          <NavLink
            to="/analytics"
            className={navLinkClass}
          >
            <FaChartPie />
            Analytics
          </NavLink>

          <NavLink
            to="/profile"
            className={navLinkClass}
          >
            <FaUser />
            Profile
          </NavLink>

        </div>

      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
      >
        <FiLogOut size={18} />
        Logout
      </button>

    </div>
  );
}