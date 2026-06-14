import axios from "axios";

const API ="https://expense-tracker-backend-cqgv.onrender.com/api/transactions";

export const getTransactions =
async () => {

  const token =
  localStorage.getItem("token");

  const response =
  await axios.get(API, {
    headers: {
      Authorization:
      `Bearer ${token}`
    }
  });

  return response.data;
};

export const deleteTransaction =
async (id) => {

  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await axios.delete(
      `${API}/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};

export const addTransaction =
async (transactionData) => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.post(
      API,
      transactionData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};

export const updateTransaction =
async (id, updatedData) => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.put(
      `${API}/${id}`,
      updatedData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};

export const getAllTransactions = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.get(
      `${API}/lmt`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
};
