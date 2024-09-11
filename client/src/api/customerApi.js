// src/api/customerApi.js
import axios from "axios";
import { BASE_URL } from "./BASE_URL";
const API_URL = `${BASE_URL}/customers`;

export const fetchCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const fetchCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    await axios.post(`${API_URL}/post`, customerData);
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    await axios.put(`${API_URL}/update/${id}`, customerData);
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
