const router = require('express').Router();
const { Trails } = require('../../models');

// Route to fetch all trails
router.get('/', async (req, res) => {
    try {
        const dbTrailData = await Trails.findAll({
            include: [
                // Assuming TextTrackList is the correct model name, adjust if necessary
                {
                    model: TextTrackList,
                    attributes: ['trail_name', 'description', 'location', 'condition', 'review']
                },
            ]
        });
        const trails = dbTrailData.map((trail) =>
            trail.get({ plain: true })
        );
        res.render('explore', {
            trails,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to fetch trail by ID
router.get('/:id', async (req, res) => {
    try {
        const trailData = await Trails.findByPk(req.params.id, {
            include: [
                // Assuming TextTrackList is the correct model name, adjust if necessary
                {
                    model: TextTrackList,
                    attributes: ['trail_name', 'description', 'location', 'condition', 'review']
                },
            ]
        });

        if (!trailData) {
            res.status(404).json({ message: 'Trail not found' });
            return;
        }

        const trail = trailData.get({ plain: true });
        res.render('trail', {
            trail,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
