const router = require('express').Router();
const { Trail, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the login page by default
router.get('/', (req, res) => {
  // If the user is already logged in, redirect to the explore page
  if (req.session.logged_in) {
    res.redirect('/explore');
  } else {
    res.render('login');
  }
});

// Route to render the explore page with trails
router.get('/explore', async (req, res) => {
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

// Route to render the signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to render trails for a specific user
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    // Find the user by ID
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Trail
        }
      ]
    });

    if (!userData) {
      // If user not found, return 404
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Serialize user data
    const user = userData.get({ plain: true });

    // Send the user data as JSON response
    res.render('user-profile', {
      user,
      logged_in: true
    });
  } catch (err) {
    // Handle server errors
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

module.exports = router;
