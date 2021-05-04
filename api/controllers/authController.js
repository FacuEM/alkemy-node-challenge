const { User } = require("../models/");

const authController = {
  //register
  register(req, res) {
    User.create(req.body)
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((err) => res.status(401).send(err));
  },
  //login
  login(req, res) {
    res.send(req.user);
  },
  //logout
  logout(req, res) {
    req.logout();
    res.sendStatus(200);
  },
  //verify that the user is logged in
  me(req, res) {
    if (req.user) return res.send(req.user);
    res.sendStatus(401);
  },
  //error handler
  error(req, res) {
    res.sendStatus(404);
  },
};

module.exports = authController;
