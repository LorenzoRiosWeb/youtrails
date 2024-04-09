
const router = require('express').Router();

// Route handler for the "/about" route
router.get('/about', (req, res) => {
  // Render the "about" Handlebars template
  res.render('about');
});

module.exports = router;
