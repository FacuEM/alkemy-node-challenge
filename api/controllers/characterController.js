const { Movie, Character } = require("../models/");

const characterController = {
  //
  fetchCharacters(req, res) {
    Character.findAll({
      attributes: ["name", "image"],
    })
      .then((character) => {
        res.json(character);
      })
      .catch((err) => res.status(401).send(err));
  },
  //
  addCharacter(req, res) {
    Character.create(req.body)
      .then((character) => res.json(character))
      .catch((err) => res.status(401).send(err));
  },
  //
  editCharacter(req, res) {
    const { id } = req.params;
    Character.update(req.body, {
      where: { id },
      returning: true,
      plain: true,
    })
      .then(() => Character.findByPk(id))
      .then((character) => res.json(character))
      .catch((err) => res.status(401).send(err));
  },
  //
  removeCharacter(req, res) {
    const { id } = req.params;
    Character.destroy({
      where: {
        id,
      },
    })
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(401).send(err));
  },
  //
  fetchCharacter(req, res) {
    const { id } = req.params;
    Character.findByPk(id, {
      include: { model: Movie, attributes: ["title"] },
      attributes: ["name", "image", "age", "weight", "history"],
    })
      .then((character) => {
        res.json(character);
      })
      .catch((err) => res.status(401).send(err));
  },
  //
  fetchCharacterByName(req, res) {
    const { name, age, weight, movieTitle } = req.query;

    Character.findAll({
      where: { name },
      include: { model: Movie, attributes: ["title"] },
      attributes: ["name", "image", "age", "weight", "history"],
    })
      .then((character) => {
        if (age) {
          character = character.filter((ch) => +ch.age === +age);
        }
        if (weight) {
          character = character.filter((ch) => +ch.weight === +weight);
        }
        /* if (movieTitle) {
          let moviesFiltered = character.map((ch) =>
            ch.Movies.filter((m) => m.title === movieTitle)
          );

          character = character.filter((ch) => ch.Movies === moviesFiltered[0]);
        } */
        res.json(character);
      })
      .catch((err) => res.status(401).send(err));
  },
};

module.exports = characterController;
