const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Character extends Model {}

Character.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    history: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  },
  {
    sequelize: db,
    modelName: "Character",
  }
);

module.exports = Character;
