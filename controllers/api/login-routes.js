const router = require('express').Router();
const { User } = require('../../models');

// Route to log in a user (POST /api/login)
router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ error: 'Incorrect email or password' });
      return;
    }

    // Set loggedIn session to true
    req.session.loggedIn = true;

    res.status(200).json(user);
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Sign up route (POST /api/signup)
router.post('/signup', async (req, res) => {
  try {
    // Extract user input from request body
    const { email, password } = req.body;

    // Create a new user
    const newUser = await User.create({
      email,
      password
    });

    // Set loggedIn session to true after successful signup
    req.session.loggedIn = true;

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

router.post('/logout', (req, res) => {
    try {
      if (req.session.loggedIn) {
        // Destroy the session
        req.session.destroy(() => {
          // Redirect the user to the login page or any other desired route
          res.status(204).end();
        });
      } else {
        res.status(401).json({ error: 'You are not logged in' });
      }
    } catch (err) {
      console.error('Error logging out:', err);
      res.status(500).json({ error: 'Failed to log out' });
    }
  });

module.exports = router;
