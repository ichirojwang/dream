import express from "express";
import prisma from "../db/prisma.js";

const router = express.Router();

// Get all itineraries
router.get("/", async (req, res) => {
  try {
    const itineraries = await prisma.itinerary.findMany({
      include: { locations: true },
    });
    res.status(200).json(itineraries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single itinerary by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itinerary = await prisma.itinerary.findUnique({
      where: { id },
      include: { locations: true },
    });
    if (!itinerary) return res.status(404).json({ error: "Itinerary not found" });
    res.json(itinerary).status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create an itinerary
router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    const newItinerary = await prisma.itinerary.create({
      data: {
        name,
      },
    });
    res.status(201).json(newItinerary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an itinerary
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedItinerary = await prisma.itinerary.update({
      where: { id },
      data: {
        name,
      },
      include: { locations: true },
    });
    res.json(updatedItinerary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an itinerary
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.itinerary.delete({ where: { id } });
    res.json({ message: "Itinerary deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
