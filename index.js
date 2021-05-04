const express = require("express");
const db = require("./api/db");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const API = require("./api/routes");
const port = process.env.PORT || 8080;
const { User } = require("./api/models/");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("tiny"));
app.use(express.static("public"));

//AUTH
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(session({ secret: "challenge" }));
app.use(cookieParser("challenge"));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }
            return done(null, user);
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => done(null, user));
});
//

app.use("/api", API);

db.sync({ force: false }).then(() => {
  http.createServer(app).listen(port, () => {
    console.log(`Server listening at port ${port}`);
  });
});
