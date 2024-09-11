const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  memberName: {
    type: String,
    required: true,
    trim: true,
  },
  membershipType: {
    type: String,
    enum: ["Basic", "Premium", "VIP"], // Possible types of memberships
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Suspended"], // Possible statuses
    default: "Active",
  },
});

const Membership = mongoose.model("Membership", MembershipSchema);

module.exports = Membership;
