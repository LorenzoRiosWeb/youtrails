const router = require('express').Router();
const { Trail, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/explore', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });


    if (!userData) {
      res.redirect('/login');
      return;
    }


    const trailData = await Trail.findAll();

    const trails = trailData.map(trail => trail.get({ plain: true }));

    res.render('explore', {
      trails,
      user: userData.get({ plain: true }),
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
