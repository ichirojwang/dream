import "./config.js";
import express from "express";

import itineraryRoutes from "./routes/itineraryRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/itineraries", itineraryRoutes);
app.use("/api/locations", locationRoutes);

export default app;
