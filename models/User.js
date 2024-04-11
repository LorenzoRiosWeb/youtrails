const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // Import bcrypt
const sequelize = require('../config/connection');

class User extends Model {
  // Method to hash a password
  async hashPassword(password) {
    return await bcrypt.hash(password, 10); // Hash password with bcrypt (salt factor: 10)
  }

  // Method to check if a password matches the hashed password
  async checkPassword(loginPassword) {
    return await bcrypt.compare(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      // Hook to hash password before saving to database
      async beforeCreate(newUserData) {
        newUserData.password = await newUserData.hashPassword(newUserData.password);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await updatedUserData.hashPassword(updatedUserData.password);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
