let animalsRouter = require('express').Router();
let database = require("../database.js");

animalsRouter.get('/', (req, res) => {
  constGetAllAnimals = "SELECT * FROM animals";
  database.all(constGetAllAnimals, (error, results) => {
    if (error) {
      console.error("Get all failure: -----> ", error);
      res.sendStatus(500);
    }
    else {
      res.status(200).json(results);
    }
  });
});


module.exports = animalsRouter;
