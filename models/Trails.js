const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
<<<<<<< HEAD
const Review = require('./Review');
=======
const review = require('./Review');
>>>>>>> fde85fe85278f81d929cbc7f679191400e4dc407

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
<<<<<<< HEAD
        freezeTableName: true,
        modelName: 'trails'
    }
);

=======
        freezeTableName:true,
        modelName:'trails'
    }
);
>>>>>>> fde85fe85278f81d929cbc7f679191400e4dc407
module.exports = Trails;