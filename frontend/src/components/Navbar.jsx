import { FaSearch } from "react-icons/fa";

export default function Navbar({searchTerm, setSearchTerm}) {
  const user = localStorage.getItem("name");
  const userInitial = user?.charAt(0).toUpperCase() || "U";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      
      <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3 w-full max-w-md">
        <FaSearch className="text-slate-400 text-sm" />

        <input
          type="text"
          placeholder="Search transactions..." value={searchTerm || ""} onChange={(e)=>setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <h3 className="font-semibold text-slate-800">
            {user || "User"}
          </h3>

          <p className="text-sm text-slate-500">
            Manage your finances
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
          {userInitial}
        </div>
      </div>

    </div>
  );
}