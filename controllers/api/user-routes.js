// controllers/api/user-routes.js
const router = require('express').Router();
const { User } = require('../../models');

// Route to sign up a new user (POST /api/signup)

// Route to sign up a new user
router.post('/signup', async (req, res) => {
  try {
    // Extract user input from request body
    const { name, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: {
        $or: [{ name }, { email }],
      },
    });

    if (existingUser) {
      // User with the same username or email already exists
      return res.status(400).json({ message: 'User with the same username or email already exists' });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password, // Make sure to hash the password before storing it in the database
    });

    // Set loggedIn session variable to true after successful signup
    req.session.loggedIn = true;

    // Send a success response
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to log in a user (POST /api/login)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !user.checkPassword(req.body.password)) {
      // If user does not exist or password is incorrect, return error
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    // Set loggedIn session to true
    req.session.loggedIn = true;

    // Remove the password hash from the user object before sending it in the response
    const { password, ...userData } = user.toJSON();

    res.status(200).json(userData); // Send user data without password
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Failed to log in' });
  }
});


module.exports = router;
