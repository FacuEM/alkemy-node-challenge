const User = require("./User");
const Character = require("./Character");
const Movie = require("./Movie");

Movie.belongsToMany(Character, { through: "character_movie" });
Character.belongsToMany(Movie, { through: "character_movie" });

module.exports = { User, Character, Movie };
