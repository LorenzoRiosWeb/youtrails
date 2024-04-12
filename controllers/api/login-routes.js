const router = require('express').Router();
const { User } = require('../../models');

// Route to log in a user (POST /api/login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      res.status(400).json({ message: 'Please provide both email and password' });
      return;
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // If user not found or password does not match, return error
    if (!user || !(await user.checkPassword(password))) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Set user session and redirect to explore page
    req.session.user_id = user.id;
    res.redirect('/explore'); // Redirect to explore page after successful login
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
