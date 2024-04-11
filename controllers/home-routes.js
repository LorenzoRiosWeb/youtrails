const router = require('express').Router();
const { Trail, User } = require('../models');
const withAuth = require('../utils/auth');


// (GET 3001/trails)
router.get('/', async (req, res) => {
  try {
    // Get all trails
    const trailData = await Trail.findAll();

    // Serialize trail data
    const trails = trailData.map(trail => trail.get({ plain: true }));

    // Render the explore page with trails
    res.render('explore', {
      trails,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET (3001/trails/:id)
router.get('/trails/:id', async (req, res) => {
  try {
    const trailData = await Trail.findByPk(req.params.id, {
      include: [
        {
          model: trail,
          attributes: ['trail_name', 'description', 'condition', 'location', 'review'],
        },
      ],
    });

    const trail = trailData.get({ plain: true });

    res.render('trail', {
      ...trail,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user/:id', withAuth, async (req, res) => {
  try {
    // Find the user by ID
    const userData = await User.findByPk(req.params.id, {
      // Exclude sensitive information like password
      attributes: { exclude: ['password'] }
    });

    if (!userData) {
      // If user not found, return 404
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Serialize user data
    const user = userData.get({ plain: true });

    // Send the user data as JSON response
    res.status(200).json(user);
  } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// 3001/login : if logged in will then redirect to /explore
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('explore');
    return;
  } else {
    
    res.render('login');
  }
});

module.exports = router;
