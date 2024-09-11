import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCustomers, deleteCustomer } from "../api/customerApi"; // Adjust the import path as needed

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        toast.error("Failed to fetch customers.");
      }
    };

    getCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((customer) => customer._id !== id));
      toast.success("Customer Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete customer.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer List</h2>
      <Link
        to="/add"
        className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 transition duration-200"
      >
        Add New Customer
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                First Name
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Last Name
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Contact
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Email
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Membership
              </th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">
                  {customer.firstname}
                </td>
                <td className="py-3 px-4 text-gray-700">{customer.lastname}</td>
                <td className="py-3 px-4 text-gray-700">{customer.contact}</td>
                <td className="py-3 px-4 text-gray-700">{customer.email}</td>
                <td className="py-3 px-4 text-gray-700">{customer.status}</td>
                <td className="py-3 px-4 text-gray-700">
                  {customer.membership
                    ? customer.membership.membershipType
                    : "N/A"}
                </td>
                <td className="py-3 px-4">
                  <Link
                    to={`/edit/${customer._id}`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
