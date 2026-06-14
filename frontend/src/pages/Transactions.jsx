import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardLayout from "../layouts/DashboardLayout";
import TransactionModal from "../components/TransactionModal";

import {
  getAllTransactions,
  deleteTransaction,
} from "../services/transactionService";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchItem,setSearchItem] = useState('');

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data.transactions);
    } catch (error) {
      console.error(
        "Failed to fetch transactions:",
        error
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTransaction(id);
      fetchTransactions();
    } catch (error) {
      console.error(
        "Failed to delete transaction:",
        error
      );
    }
  };

  

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Transactions
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          + Add Transaction
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            All Transactions
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Manage your income and expenses
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 font-semibold">
                  Title
                </th>

                <th className="text-left p-4 font-semibold">
                  Amount
                </th>

                <th className="text-left p-4 font-semibold">
                  Category
                </th>

                <th className="text-left p-4 font-semibold">
                  Type
                </th>

                <th className="text-left p-4 font-semibold">
                  Date
                </th>

                <th className="text-left p-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {transactions.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >
                    <h3 className="text-lg font-semibold text-slate-700">
                      No Transactions Found
                    </h3>

                    <p className="text-slate-500 mt-1">
                      Add your first transaction.
                    </p>
                  </td>
                </tr>

              ) : (

                transactions.map((transaction) => (

                  <tr
                    key={transaction._id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="p-4 font-medium">
                      {transaction.title}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹
                      {new Intl.NumberFormat(
                        "en-IN"
                      ).format(
                        transaction.amount
                      )}
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        {transaction.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={
                          transaction.type ===
                          "income"
                            ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                            : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(
                        transaction.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          setSelectedTransaction(
                            transaction
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            transaction._id
                          )
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {showModal && (
        <TransactionModal
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={fetchTransactions}
        />
      )}

      {selectedTransaction && (
        <TransactionModal
          transaction={
            selectedTransaction
          }
          onClose={() =>
            setSelectedTransaction(null)
          }
          onSuccess={fetchTransactions}
        />
      )}
    </DashboardLayout>
  );
}