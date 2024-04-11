// controllers/api/index.js
const router = require('express').Router();
const userRoutes = require('./user-routes');
const trailRoutes = require('./trail-routes'); // Corrected typo
const loginRoutes = require('./login-routes');
const contactRoutes = require('./contact-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/trails', trailRoutes);
router.use('/login', loginRoutes);
router.use('/contact', contactRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
