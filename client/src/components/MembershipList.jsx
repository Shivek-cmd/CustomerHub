import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllMemberships, deleteMembership } from "../api/membershipApi";

const MembershipList = () => {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const getMemberships = async () => {
      try {
        const data = await fetchAllMemberships();
        setMemberships(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };

    getMemberships();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMembership(id);
      setMemberships(memberships.filter((membership) => membership._id !== id));
    } catch (error) {
      console.error("Error deleting membership:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Memberships</h2>
      <Link
        to="/memberships/new"
        className="mb-4 inline-block bg-green-500 text-white py-2 px-4 rounded"
      >
        Add New Membership
      </Link>
      <ul>
        {memberships.map((membership) => (
          <li
            key={membership._id}
            className="mb-2 p-4 border border-gray-200 rounded shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {membership.memberName}
                </h3>
                <p>Type: {membership.membershipType}</p>
                <p>Status: {membership.status}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/memberships/edit/${membership._id}`}
                  className="text-blue-500"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(membership._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipList;
