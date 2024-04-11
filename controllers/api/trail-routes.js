// controllers/api/trail-routes.js
const router = require('express').Router();
const { Trails } = require('../../models'); // Importing the Trail model

// GET all trails and their associated comments (GET /api/trails)
router.get('/', async (req, res) => {
  try {
    // Fetch all trails with their associated comments
    const trails = await Trails.findAll({
      attributes: ['id', 'trail_name', 'description', 'location', 'condition', 'review'], // Include specific attributes of the Trail model
    });

    res.status(200).json(trails); // Send the trails with comments as JSON response
  } catch (err) {
    console.error('Error getting trails:', err);
    res.status(500).json({ error: 'Failed to get trails' });
  }
});

// GET a specific trail by ID (GET /api/trails/:id)
router.get('/:id', async (req, res) => {
  try {
    // Fetch the trail by ID with its associated comments
    const trail = await Trails.findByPk(req.params.id, {
      attributes: ['id', 'trail_name', 'description', 'location', 'condition', 'review'], // Include specific attributes of the Trail model
    });

    if (!trail) {
      res.status(404).json({ error: 'Trail not found' });
      return;
    }

    res.status(200).json(trail); // Send the trail with comments as JSON response
  } catch (err) {
    console.error('Error getting trail by ID:', err);
    res.status(500).json({ error: 'Failed to get trail' });
  }
});

// POST a new trail (POST /api/trails)
router.post('/', async (req, res) => {
  try {
    // Create a new trail in the database
    const newTrail = await Trails.create({
      trail_name: req.body.trail_name,
      description: req.body.description,
      location: req.body.location,
      condition: req.body.condition,
      review: req.body.review,
    });

    res.status(201).json(newTrail); // Send the newly created trail as JSON response
  } catch (err) {
    console.error('Error adding new trail:', err);
    res.status(500).json({ error: 'Failed to add new trail' });
  }
});

module.exports = router;
