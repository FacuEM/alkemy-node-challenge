const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Movie extends Model {}

Movie.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    genre: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "Movie",
  }
);

module.exports = Movie;
