const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Review = require('./Review');
class Trails extends Model { }

Trails.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        trail_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
        },
        conditions: {
            type: DataTypes.STRING,
        },
        review: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'trails'
    }
);

module.exports = Trails;