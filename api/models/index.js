const User = require("./User");
const Character = require("./Character");
const Movie = require("./Movie");

Movie.hasMany(Character);
Character.belongsTo(Movie);

module.exports = { User, Character, Movie };
