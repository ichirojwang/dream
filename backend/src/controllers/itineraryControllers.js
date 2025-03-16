const { default: prisma } = require("../db/prisma");

// Get all itineraries
const getAllItineraries = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM itineraries");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single itinerary by ID
const getItineraryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM itineraries WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new itinerary
const createItinerary = async (req, res) => {
  try {
    const { name } = req.body;
    const itinerary = await prisma.itinerary.create({
      name,
    });
    res.status(201).json(itinerary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an itinerary by ID
const updateItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query("UPDATE itineraries SET name = $1 WHERE id = $2 RETURNING *", [
      name,
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an itinerary by ID
const deleteItinerary = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM itineraries WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Itinerary not found" });
    }
    res.json({ message: "Itinerary deleted", itinerary: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllItineraries,
  getItineraryById,
  createItinerary,
  updateItinerary,
  deleteItinerary,
};
