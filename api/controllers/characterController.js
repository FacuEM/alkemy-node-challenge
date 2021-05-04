const { Movie, Character } = require("../models/");

const characterController = {
  //
  fetchCharacters(req, res) {
    Character.findAll()
      .then((character) => {
        res.json(
          character.map((ch) => {
            return { name: ch.name, image: ch.image };
          })
        );
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
    Character.findByPk(id)
      .then((character) =>
        res.json({
          name: character.name,
          image: character.image,
          age: character.age,
          weight: character.weight,
          history: character.history,
        })
      )
      .catch((err) => res.status(401).send(err));
  },
  //
  fetchCharacterByName(req, res) {
    const { name, age, weight } = req.query;

    Character.findAll({
      where: { name },
    })
      .then((character) => {
        if (age) {
          character = character.filter((ch) => +ch.age === +age);
        }
        if (weight) {
          character = character.filter((ch) => +ch.weight === +weight);
        }

        res.json(character);
      })
      .catch((err) => res.status(401).send(err));
  },
};

module.exports = characterController;
