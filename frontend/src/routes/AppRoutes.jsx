import {BrowserRouter,Routes,Route} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Transactions from "../pages/Transactions"
import Analytics from '../pages/Analytics';
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export  default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />}/>;
                <Route path="/dashboard" element={
                   <ProtectedRoute> <Dashboard /></ProtectedRoute>}/>;
                <Route path="/register" element={<Register />}/>;
                <Route path="/transactions" element={<ProtectedRoute> <Transactions /></ProtectedRoute>}/>;
                <Route path="/analytics" element={<ProtectedRoute> <Analytics /></ProtectedRoute>}/>;
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>;
                
                
            </Routes>
        </BrowserRouter>
    )
}