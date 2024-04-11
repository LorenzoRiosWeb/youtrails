// controllers/api/index.js
const router = require('express').Router();
const userRoutes = require('./user-routes');
const signupRoutes = require('./signup-routes'); // Import the signup routes
const trailRoutes = require('./trail-routes');
const loginRoutes = require('./login-routes');
const contactRoutes = require('./contact-routes');
const commentRoutes = require('./comment-routes');
const exploreRoutes = require('./explore-routes');

router.use('/users', userRoutes);
router.use('/signup', signupRoutes); // Use the signup routes
router.use('/trails', trailRoutes);
router.use('/login', loginRoutes);
router.use('/explore', exploreRoutes);
router.use('/contact', contactRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
