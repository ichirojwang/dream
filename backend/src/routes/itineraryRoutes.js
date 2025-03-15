const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all itineraries
router.get('/itineraries', async (req, res) => {
    try {
        const itineraries = await prisma.itinerary.findMany({
            include: { locations: true },
        });
        res.json(itineraries);
        res.status(200);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single itinerary by ID
router.get('/itineraries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const itinerary = await prisma.itinerary.findUnique({
            where: { id },
            include: { locations: true },
        });
        if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
        res.json(itinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create an itinerary
router.post('/itineraries', async (req, res) => {
    try {
        const { name, locationIds } = req.body;
        const newItinerary = await prisma.itinerary.create({
            data: {
                name,
                locationIds,
                locations: { connect: locationIds.map((id) => ({ id })) },
            },
            include: { locations: true },
        });
        res.status(201).json(newItinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an itinerary
router.put('/itineraries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, locationIds } = req.body;
        const updatedItinerary = await prisma.itinerary.update({
            where: { id },
            data: {
                name,
                locationIds,
                locations: { set: locationIds.map((id) => ({ id })) },
            },
            include: { locations: true },
        });
        res.json(updatedItinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an itinerary
router.delete('/itineraries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.itinerary.delete({ where: { id } });
        res.json({ message: 'Itinerary deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router ;