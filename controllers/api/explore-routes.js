const router = require('express').Router();
const { Trail, User, Review, Index, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/explore', withAuth, async (req, res) => {
  try {
    // Find the current user's data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    // If the user is not found, redirect to the login page
    if (!userData) {
      res.redirect('/login');
      return;
    }

    // Get all trails
    const trailData = await Trail.findAll();

    // Get all reviews
    const reviewData = await Review.findAll();

    // Get all index data
    const indexData = await Index.findAll();

    // Get all comments data
    const commentsData = await Comments.findAll();

    // Serialize data
    const trails = trailData.map(trail => trail.get({ plain: true }));
    const reviews = reviewData.map(review => review.get({ plain: true }));
    const index = indexData.map(item => item.get({ plain: true }));
    const comments = commentsData.map(comment => comment.get({ plain: true }));

    // Render the explore page with all data
    res.render('explore', {
      trails,
      reviews,
      index,
      comments,
      user: userData.get({ plain: true }),
      logged_in: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
