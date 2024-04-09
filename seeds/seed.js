const sequelize = require('../config/connection');
const { User, Trails, Review, index, Comments } = require('../models');

const userData = require('./userData.json');
const trailsData = require('./trailsData.json');
const reviewData = require('./reviewData.json');
const indexData = require('./indexData.json');
const commentsData = require('./commentsData');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const trails of trailsData) {
        await Trails.create({
            ...trails,
            trails_id: trails,
        });
    }

    for (const review of reviewData) {
        await Review.create({
            ...review,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const index of indexData) {
        await index.create({
            ...index,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const comments of commentsData) {
        await Comments.create({
            ...comments,
            user_id: users[Math.floor()]
        });
    }

    process.exit(0);
};

seedDatabase();