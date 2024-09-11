// src/api/membershipApi.js
import axios from "axios";

import { BASE_URL } from "./BASE_URL";

const API_URL = `${BASE_URL}/memberships`;

export const fetchMembershipById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching membership:", error);
    throw error;
  }
};

export const createMembership = async (membershipData) => {
  try {
    await axios.post(`${API_URL}/create`, membershipData);
  } catch (error) {
    console.error("Error creating membership:", error);
    throw error;
  }
};

export const updateMembership = async (id, membershipData) => {
  try {
    await axios.put(`${API_URL}/update/${id}`, membershipData);
  } catch (error) {
    console.error("Error updating membership:", error);
    throw error;
  }
};
export const fetchAllMemberships = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching memberships:", error);
    throw error;
  }
};

export const deleteMembership = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error("Error deleting membership:", error);
    throw error;
  }
};
