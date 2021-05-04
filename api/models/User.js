const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
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
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

// Password hash
User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

User.prototype.hash = function (password, salt) {
  return bcrypt.hash(password, salt);
};

module.exports = User;
