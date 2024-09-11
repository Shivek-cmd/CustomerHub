const express = require("express");
const Customer = require("../models/Customer");
const router = express.Router();

// Create a new customer
router.post("/post", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all customers with populated membership
router.get("/get", async (req, res) => {
  try {
    const customers = await Customer.find().populate("membership");
    res.status(200).json(customers);
    console.log(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a customer by ID with populated membership
router.get("/get/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "membership"
    );
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a customer
router.put("/update/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("membership");
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a customer
router.delete("/delete/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
