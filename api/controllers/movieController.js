const { Movie, Character } = require("../models/");

const movieController = {
  //
  fetchMovies(req, res) {
    Movie.findAll({ attributes: ["title", "image", "date"] })
      .then((movies) => res.json(movies))
      .catch((err) => res.status(401).send(err));
  },
  //
  addMovie(req, res) {
    Movie.create(req.body)
      .then((movie) => res.json(movie))
      .catch((err) => res.status(401).send(err));
  },
  //
  editMovie(req, res) {
    const { id } = req.params;
    Movie.update(req.body, {
      where: { id },
      returning: true,
      plain: true,
    })
      .then(() => Movie.findByPk(id))
      .then((movie) => res.json(movie))
      .catch((err) => res.status(401).send(err));
  },
  //
  removeMovie(req, res) {
    const { id } = req.params;
    Movie.destroy({
      where: {
        id,
      },
    })
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(401).send(err));
  },
  //
  fetchMovie(req, res) {
    const { id } = req.params;
    Movie.findByPk(id, {
      include: { model: Character, attributes: ["name"] },
      attributes: ["title", "image", "date", "score", "genre"],
    })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => res.status(401).send(err));
  },
  //
  fetchMovieByTitle(req, res) {
    const { title, genre, order = "ASC" } = req.query;
    Movie.findAll({
      where: { title },
      order: [["date", order]],
      include: { model: Character, attributes: ["name"] },
      attributes: ["title", "image", "date", "score", "genre"],
    })
      .then((movie) => {
        if (genre) {
          movie = movie.filter((m) => m.genre === genre);
        }
        res.json(movie);
      })
      .catch((err) => res.status(401).send(err));
  },
};

module.exports = movieController;
