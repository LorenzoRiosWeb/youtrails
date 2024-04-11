// controllers/api/user-routes.js
const router = require('express').Router();
const { User } = require('../../models');

// Route to sign up a new user (POST /api/signup)
router.post('/signup', async (req, res) => {
  try {
      // Extract user input from request body
      const { username, email, password } = req.body;

      // Check if the username or email already exists
      const existingUser = await User.findOne({
          where: {
              // Check for existing username or email
              [Op.or]: [{ username }, { email }]
          }
      });

      if (existingUser) {
          // User with the same username or email already exists
          return res.status(400).send('User with the same username or email already exists');
      }

      // Create a new user
      const newUser = await User.create({
          username,
          email,
          password
      });

      // Set loggedIn session variable to true after successful signup
      req.session.loggedIn = true;

      // Redirect user to homepage
      res.redirect('/');
  } catch (err) {
      // Handle errors
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});


// Route to log in a user (POST /api/login)
router.post('/login', async (req, res) => {
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

module.exports = router;
