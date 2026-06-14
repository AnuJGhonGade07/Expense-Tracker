import { useState } from "react";
import {addTransaction,updateTransaction,} from "../services/transactionService";
import toast from "react-hot-toast";
export default function TransactionModal({onClose,onSuccess,transaction,}) {
  
  const [title, setTitle] = useState(
    transaction?.title || ""
  );

  const [amount, setAmount] = useState(
    transaction?.amount || ""
  );

  const [category, setCategory] = useState(
    transaction?.category || ""
  );

  const [type, setType] = useState(
    transaction?.type || "expense"
  );

  const handleSave = async () => {
    try {
      const transactionData = {
        title,
        amount,
        category,
        type,
      };

      if (transaction) {
        await updateTransaction(
          transaction._id,
          transactionData
          
        );
        toast.success('Transaction Updated');

      } else {
        await addTransaction(
          transactionData
        
        );
        toast.success('Transaction Added');

        
      }
      onSuccess();
      onClose();

    } catch (error) {
      toast.error("Failed to save transaction");

      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-5 text-slate-800">
          {transaction
            ? "Edit Transaction"
            : "Add Transaction"}
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>
          </select>

          <div className="flex justify-end gap-3 pt-2">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {transaction
                ? "Update"
                : "Save"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}