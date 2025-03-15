

// Get all locations
const getAllLocations= async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM locations");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single location by ID
const getLocationById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM locations WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new Location
const createLocation = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await pool.query(
            "INSERT INTO locations (name) VALUES ($1) RETURNING *",
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an Location by ID
const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await pool.query(
            "UPDATE locations SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an location by ID
const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM locations WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Location not found" });
        }
        res.json({ message: "Location deleted", location: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
};
