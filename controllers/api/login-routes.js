const router = require('express').Router();
const { User, Trails, Review } = require('../../models');

// Login route
router.post('/login', async (req, res) => {
    try {
        // Check if the request body contains both username and password
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Find the user by username and password in the database
        const user = await User.findOne({ 
            where: { username, password }
        });

        // If user doesn't exist or password is incorrect, return error
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }

        // Set the session variables for the authenticated user
        req.session.user = {
            id: user.id,
            username: user.username,
            // Add more user data to session as needed
        };

        res.status(200).json({ message: 'Login successful.', user: req.session.user });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
