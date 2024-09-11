import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchCustomerById,
  createCustomer,
  updateCustomer,
} from "../api/customerApi";
import axios from "axios";

const CustomerForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Gold");
  const statusOptions = ["Gold", "Diamond"];
  const [membership, setMembership] = useState("");
  const [membershipOptions, setMembershipOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/memberships/get"
        );
        setMembershipOptions(response.data);
        console.log("membership otpion", membershipOptions);
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };

    fetchMemberships();
    if (id) {
      const fetchCustomer = async () => {
        try {
          const customer = await fetchCustomerById(id);
          setFirstname(customer.firstname);
          setLastname(customer.lastname);
          setContact(customer.contact);
          setEmail(customer.email);
          setStatus(customer.status);
          setMembership(customer.membership ? customer.membership._id : "");
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      };

      fetchCustomer();
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!firstname) newErrors.firstname = "First name is required";
    if (!lastname) newErrors.lastname = "Last name is required";
    // if (!contact) newErrors.contact = "Contact is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!status) newErrors.status = "Status is required";
    if (!membership) newErrors.membership = "Membership type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Something is wrong.");
      return;
    }
    try {
      const customerData = {
        firstname,
        lastname,
        contact,
        email,
        status,
        membership,
      };
      if (id) {
        await updateCustomer(id, customerData);
        toast.success("Customer updated successfully.");
      } else {
        await createCustomer(customerData);
        toast.success("Customer added successfully.");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving customer:", error);
      toast.error("Failed to save customer.");
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-center p-4 text-3xl font-bold">
        Fill Customer Details
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            value={membership}
            onChange={(e) => setMembership(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Membership</option>
            {membershipOptions.map((membership) => (
              <option key={membership._id} value={membership._id}>
                {membership.membershipType}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {id ? "Update" : "Add"} Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
