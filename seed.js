const db = require("./api/db");
const { Character, Movie } = require("./api/models");

//Characters
const characters = [
  {
    name: "Mickey Mouse",
    image: "url",
    age: 3,
    weight: 32,
    history: "Hola hola hola",
  },
  {
    name: "Stitch",
    image: "url",
    age: 13,
    weight: 2,
    history: "Hola hola hola",
  },
  {
    name: "Pluto",
    image: "url",
    age: 12,
    weight: 43,
    history: "Hola hola hola",
  },
];
//Movies
const movies = [
  {
    title: "La bella y la bestia",
    image: "url",
    date: "2012-11-01 16:00:49.349",
    score: 2,
    genre: "Romance",
  },
  {
    title: "Cars 2",
    image: "url",
    date: "2014-11-01 16:00:49.349",
    score: 4,
    genre: "Action",
  },
  {
    title: "Coco",
    image: "url",
    date: "2021-11-01 16:00:49.349",
    score: 5,
    genre: "Terror",
  },
];

db.sync({ force: false })
  .then(() => {
    console.log("Conection ready...");
  })
  .then(() => {
    characters.forEach((character) => Character.create(character));
  })
  .then(() => {
    movies.forEach((movie) => Movie.create(movie));
  })
  .then(async () => {
    let movie1 = await Movie.create({
      title: "Avengers Endgame",
      image: "url",
      date: "2003-11-01 16:00:49.349",
      score: 5,
      genre: "Action",
    });

    let character1 = await Character.create({
      name: "Ironman",
      image: "url",
      age: 45,
      weight: 56,
    });
    let character2 = await Character.create({
      name: "Spiderman",
      image: "url",
      age: 24,
      weight: 76,
    });

    movie1.addCharacter(character1);
    movie1.addCharacter(character2);
  });

/*
  characters: [
          { name: "Ironman", image: "url", age: 45, weight: 56 },
          { name: "Spiderman", image: "url", age: 24, weight: 76 },
        ],*/
