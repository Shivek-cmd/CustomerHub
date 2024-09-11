const express = require("express");

const cors = require("cors");
const customerRoutes = require("./routes/customerRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const dotenv = require("dotenv");
const connectdb = require("./config/connectdb");
const errorHandler = require("./middleware/errorHandler");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
connectdb();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/memberships", membershipRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
