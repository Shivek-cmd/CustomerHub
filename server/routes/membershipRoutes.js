const express = require("express");
const router = express.Router();
const Membership = require("../models/membership");

// Route to create a new membership
router.post("/create", async (req, res) => {
  try {
    const { memberName, membershipType, status } = req.body;
    const membership = new Membership({ memberName, membershipType, status });
    await membership.save();
    res.status(201).json(membership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all memberships
router.get("/get", async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Route to get a membership by ID
router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const membership = await Membership.findById(id);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.json(membership);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Route to update a membership by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { memberName, membershipType, status } = req.body;
    const membership = await Membership.findByIdAndUpdate(
      id,
      { memberName, membershipType, status },
      { new: true }
    );
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.json(membership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete a membership by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const membership = await Membership.findByIdAndDelete(id);
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }
    res.json({ message: "Membership deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
