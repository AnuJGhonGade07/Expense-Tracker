import axios from "axios";

const API = "https://expense-tracker-backend-cqgv.onrender.com/api/analytics";

export const getCategoryAnalytics = async () => {
    
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`${API}/category`,
        {
             headers: {
          Authorization:
            `Bearer ${token}`
        }
        }
    )
    return response.data
}

export const getMonthlyAnalytics = async () => {

    const token = localStorage.getItem('token');

    const response = await  axios.get(`${API}/monthly`,
        {
             headers: {
          Authorization:
            `Bearer ${token}`
        }
        }        
    )
    return response.data
}
