const express = require("express");
const dotenv = require("dotenv");

const itineraryRoutes = require("./routes/itineraryRoutes");
const locationRoutes = require("./routes/locationRoutes");

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/itineraries", itineraryRoutes);
app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
