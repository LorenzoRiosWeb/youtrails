// controllers/api/comment-routes.js
const router = require('express').Router();
const { Comment } = require('../../models');

// Route to add a comment to a trail (POST /api/comments)
router.post('/', async (req, res) => {
  try {
    // Extract data from the request body
    const { trail_id, user_id, comment } = req.body;

    // Create a new comment in the database
    const newComment = await Comment.create({
      trail_id,
      user_id,
      comment,
    });

    res.status(201).json(newComment); // Send the newly created comment as JSON response
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Route to get all comments for a specific trail (GET /api/comments/:trail_id)
router.get('/:trail_id', async (req, res) => {
  try {
    // Fetch all comments for the specified trail
    const comments = await Comment.findAll({
      where: { trail_id: req.params.trail_id },
    });

    res.status(200).json(comments); // Send the comments as JSON response
  } catch (err) {
    console.error('Error getting comments:', err);
    res.status(500).json({ error: 'Failed to get comments' });
  }
});

module.exports = router;
