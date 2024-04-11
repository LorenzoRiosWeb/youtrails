const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // Extract user input from request body
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: {
        $or: [{ username }, { email }],
      },
    });

    if (existingUser) {
      // User with the same username or email already exists
      return res.status(400).json({ message: 'User with the same username or email already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with username, email, and password
    const newUser = await User.create({
      username, // Include username in the user creation process
      email,
      password: hashedPassword,
    });

    // Set loggedIn session variable to true after successful signup
    req.session.loggedIn = true;

    // Send a success response
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    // Handle errors
    console.error('Error signing up:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
