const express = require("express");
const characterController = require("../controllers/characterController");
const router = express.Router();

// fetch characters
router.get("/", characterController.fetchCharacters);
// add characer
router.post("/add", characterController.addCharacter);
// edit character
router.put("/edit/:id", characterController.editCharacter);
// remove character
router.delete("/remove/:id", characterController.removeCharacter);
// fetch character
router.get("/details/:id", characterController.fetchCharacter);
// fetch by title
router.get("/search", characterController.fetchCharacterByName);

module.exports = router;
