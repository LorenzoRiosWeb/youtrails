const User = require('./User');
const Trails = require('./Trails');
const Review = require('./Review');
const Comments = require('./Comments');


Trails.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(Trails, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasOne(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Trails, Review, Comments };