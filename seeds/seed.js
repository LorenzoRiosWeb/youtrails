const sequelize = require('../config/connection');
const { User, Trails, Review, Index, Comments } = require('../models');
const userData = require('./userData.json');
const trailsData = require('./trailsData.json');

const seedDatabase = async () => {
    try {
        // Ensure that the database tables are created
        await sequelize.sync({ force: true });

        // Seed users data
        const usersPromise = User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        // Seed trails data
        const trailsPromise = Trails.bulkCreate(trailsData, { returning: true });

        // Wait for both promises to resolve
        const [users, trails] = await Promise.all([usersPromise, trailsPromise]);

        // Log success message
        console.log('Database seeded successfully!');

        // Exit the process with a success status code
        process.exit(0);
    } catch (error) {
        // Log any errors that occur during the seeding process
        console.error('Error seeding database:', error);

        // Exit the process with a failure status code
        process.exit(1);
    }
};

// Call the seedDatabase function to start the seeding process
seedDatabase();
