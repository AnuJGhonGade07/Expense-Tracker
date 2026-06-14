import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";
import toast from "react-hot-toast";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const fetchProfile = async () => {
    try {
      const data =
        await getProfile();

      setName(data.name);
      setEmail(data.email);

    } catch (error) {
      console.error(
        "Failed to load profile:",
        error
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProfile({
        name,
        password,
      });

      localStorage.setItem(
        "name",
        name
      );

      setPassword("");

    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            {name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Profile
            </h1>

            <p className="text-slate-500">
              Manage your account details
            </p>
          </div>

        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              Email
            </label>

            <input
              value={email}
              disabled
              className="w-full border border-slate-300 rounded-xl p-3 bg-slate-100 text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
              className="w-full border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {loading
              ? "Updating..."
              : "Update Profile"}
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}