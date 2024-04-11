const sequelize = require('../config/connection');
const { User, Trails, Review, Index, Comments } = require('../models');

const userData = require('./userData.json');
const trailsData = require('./trailsData.json');
const reviewData = require('./reviewData.json');
const indexData = require('./indexData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const usersPromise = User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const trailsPromise = Trails.bulkCreate(trailsData, { returning: true });

    const reviewsPromise = Review.bulkCreate(reviewData, { returning: true });

    const indexPromise = Index.bulkCreate(indexData, { returning: true });

    const commentsPromise = Comments.bulkCreate(commentsData, { returning: true });

    const [users, trails, reviews, index, comments] = await Promise.all([
        usersPromise,
        trailsPromise,
        reviewsPromise,
        indexPromise,
        commentsPromise,
    ]);

    // Associate reviews with users
    for (const review of reviews) {
        await review.setUser(users[Math.floor(Math.random() * users.length)]);
    }

    // Associate index with users
    for (const item of index) {
        await item.setUser(users[Math.floor(Math.random() * users.length)]);
    }

    // Associate comments with users and reviews
    for (const comment of comments) {
        await comment.setUser(users[Math.floor(Math.random() * users.length)]);
        await comment.setReview(reviews[Math.floor(Math.random() * reviews.length)]);
    }

    process.exit(0);
};

seedDatabase();
