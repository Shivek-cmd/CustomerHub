const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["Gold", "Diamond"],
    required: true,
  },
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Membership",
  },
});

module.exports = mongoose.model("Customer", customerSchema);
