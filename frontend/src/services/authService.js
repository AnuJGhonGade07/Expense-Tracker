import axios from 'axios';
import App from '../App';

const API = "https://expense-tracker-backend-cqgv.onrender.com";

export const registerUser = async (userData) => {
    const response = await axios.post(`${API}/register`,userData);
    return response.data;
}

export const loginUser = async (userData) => {
    const response = await axios.post(`${API}/login`,userData);
    return response.data;
    
}
