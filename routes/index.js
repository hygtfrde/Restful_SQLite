let router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`Welcome to Project 2 by HAROLD ULRICH.
    Vist these paths:
    /animals/
    /habitats/
    /lives_in/
    /can_hunt/`);
});


module.exports = router;
