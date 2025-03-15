const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();


// Get all locations
router.get('/locations', async (req, res) => {
    try {
        const locations = await prisma.location.findMany();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single location by ID
router.get('/locations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const location = await prisma.location.findUnique({
            where: { id },
        });
        if (!location) return res.status(404).json({ error: 'Location not found' });
        res.json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", (req, res) => {
    // result shows on localhost:3000
  
    res.send("hello world");
});

// Create a location
router.post('/locations', async (req, res) => {
    try {
        const { name, description, latitude, longitude, itineraryId } = req.body;
        const newLocation = await prisma.location.create({
            data: { name, description, latitude, longitude, itineraryId },
        });
        res.status(200).json(newLocation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a location
router.put('/locations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, latitude, longitude, itineraryId } = req.body;
        const updatedLocation = await prisma.location.update({
            where: { id },
            data: { name, description, latitude, longitude, itineraryId },
        });
        res.json(updatedLocation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a location
router.delete('/locations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.location.delete({ where: { id } });
        res.json({ message: 'Location deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
