import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const MembershipForm = () => {
  const [memberName, setMemberName] = useState("");
  const [membershipType, setMembershipType] = useState("Basic");
  const [status, setStatus] = useState("Active");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchMembership = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/memberships/get/${id}`
          );
          const membership = response.data;
          setMemberName(membership.memberName);
          setMembershipType(membership.membershipType);
          setStatus(membership.status);
        } catch (error) {
          console.error("Error fetching membership:", error);
        }
      };

      fetchMembership();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const membershipData = { memberName, membershipType, status };
      if (id) {
        await axios.put(
          `http://localhost:3000/api/memberships/update/${id}`,
          membershipData
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/memberships/create",
          membershipData
        );
      }
      navigate("/memberships");
    } catch (error) {
      console.error("Error saving membership:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <input
          type="text"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          placeholder="Member Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <select
          value={membershipType}
          onChange={(e) => setMembershipType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="VIP">VIP</option>
        </select>
      </div>
      <div className="mb-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        {id ? "Update" : "Add"} Membership
      </button>
    </form>
  );
};

export default MembershipForm;
