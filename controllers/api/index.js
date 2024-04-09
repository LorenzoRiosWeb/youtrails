const router = require('express').Router();
const userRoutes = require('./user-routes');
const contactRoutes = require('./contact-routes');
// const aboutRoutes = require('./about-routes');
const loginRoutes = require('./login-routes');
const trailRoutes = require('./trails-routes');

// Use the routes
router.use('/users', userRoutes);
router.use('/contact', contactRoutes);
// router.use('/about', aboutRoutes);
router.use('/login', loginRoutes);
router.use('/trails', trailRoutes);

module.exports = router;
