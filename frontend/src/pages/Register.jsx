import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {name,email,password};

            const data = await registerUser(userData);
            toast.success('User Registered');
            navigate('/login');
            console.log(data)
        } catch (error) {
                toast.error(
                error.response?.data?.message ||
                "Registration Failed"
                );
             console.log(error);
        }
    }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
                    Expense Tracker
            </h1>

            <p className="text-center text-gray-500 mb-6">
                Create Account
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Name 
                    </label>
                    <input type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}
                    value={name} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Email 
                    </label>
                    <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}
                    value={email} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium" >
                        Password 
                    </label>
                    <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={password}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                <button className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Register
                </button>
                 <p className="text-center mt-5 text-gray-600">Already have an account?
                    <Link to="/login" className="text-blue-600 ml-2 ">Login</Link></p>
            </form>
        </div>
    </div>
  );
}