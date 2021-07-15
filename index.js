//==============================================================================
//=================================REQUIRE======================================
//==============================================================================

let express = require("express");
let database = require("./database.js");

//==============================================================================

//==============================================================================
//==============================MIDDLEWARE======================================
//==============================================================================

let app = express();
app.use(express.json());

//==============================================================================

//==============================================================================
//===============================CONFIGURE======================================
//==============================================================================

const port = 9000;

//==============================================================================

//##############################################################################
//##############################################################################
//:::::::::::::::::::::::::::::::::ROUTES:::::::::::::::::::::::::::::::::::::::
//##############################################################################
//##############################################################################

let indexRouter = require('./routes/index.js');
let animalsRouter = require('./routes/animals.js');

//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>GET ROOT<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

app.use("/", indexRouter);

//==============================================================================

//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>GET TABLES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

// Animals ---------------------------------------------------------------------
app.use("/animals", animalsRouter);

// Habitats ---------------------------------------------------------------------
app.get("/habitats", (req, res) => {
  const getAllHabitats = "SELECT * FROM habitats";
  database.all(getAllHabitats, (error, results) => {
    if (error) {
      console.error("Get all failure: -----> ", error);
      res.sendStatus(500);
    }
    else {
      res.status(200).json(results);
    }
  });
});

// Lives In ---------------------------------------------------------------------
app.get("/lives_in", (req, res) => {
  const getAllLivesIn = "SELECT * FROM lives_in";
  database.all(getAllLivesIn, (error, results) => {
    if (error) {
      console.error("Get all failure: -----> ", error);
      res.sendStatus(500);
    }
    else {
      res.status(200).json(results);
    }
  });
});

// Can Hunt ---------------------------------------------------------------------
app.get("/can_hunt", (req, res) => {
  const getAllCanHunt = "SELECT * FROM can_hunt";
  database.all(getAllCanHunt, (error, results) => {
    if (error) {
      console.error("Get all failure: -----> ", error);
      res.sendStatus(500);
    }
    else {
      res.status(200).json(results);
    }
  });
});

//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>GET ONE ID<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

// else {res.sendStatus(200);}  ---> returns "OK"

// Animals ---------------------------------------------------------------------
app.get("/animals/:id", (req, res) => {
  const animal_id = req.params.id;
  const getOneAnimal = `SELECT *
    FROM animals
    WHERE animals.animal_id = ${animal_id}`;
  database.all( getOneAnimal, (error, results) => {
    if (error) {
      console.error(`Get animal with ID ${animal_id} failed`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Animal with ID ${animal_id} was gotten successfully!`);
      res.status(200).json(results);
    }
  });
});

// Habitats --------------------------------------------------------------------
app.get("/habitats/:id", (req, res) => {
  const habitat_id = req.params.id;
  const getOneHabitat = `SELECT *
    FROM habitats
    WHERE habitats.habitat_id = ${habitat_id}`;
  database.all( getOneHabitat, (error, results) => {
    if (error) {
      console.error(`Get habitat with ID ${habitat_id} failed`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Habitat with ID ${habitat_id} was gotten successfully!`);
      res.status(200).json(results);
    }
  });
});

// MANY 2 MANY -----------------------------------------------------------------
// Lives In --------------------------------------------------------------------
app.get("/lives_in/:id", (req, res) => {
  const lives_in_id = req.params.id;
  const getOneLivesIn = `SELECT animals.species_name, habitats.environment
    FROM animals, habitats
    JOIN lives_in
    ON animals.animal_id = lives_in.animal_id
    AND habitats.habitat_id = lives_in.habitat_id
    WHERE animals.animal_id = ${lives_in_id}`;

  database.all( getOneLivesIn, (error, results) => {
    if (error) {
      console.error(`Get lives in with ID ${lives_in_id} failed`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Lives In with ID ${lives_in_id} was gotten successfully!`);
      res.status(200).json(results);
    }
  });
});

// MANY 2 MANY -----------------------------------------------------------------
// Habitat For -----------------------------------------------------------------

// MANY 2 MANY -----------------------------------------------------------------
// SELF-JOIN -------------------------------------------------------------------
// Can Hunt --------------------------------------------------------------------
app.get("/can_hunt/:id", (req, res) => {
  const can_hunt_id = req.params.id;
  const getOneCanHunt =
    `SELECT v1.species_name AS pred, v2.species_name AS prey
    FROM animals AS v1
    JOIN animals AS v2
    JOIN can_hunt
    ON v1.animal_id = can_hunt.animal_predator_id
    AND v2.animal_id = can_hunt.animal_prey_id
    AND v1.animal_id = ${can_hunt_id}`
  database.all( getOneCanHunt, (error, results) => {
    if (error) {
      console.error(`Get can hunt with ID ${can_hunt_id} failed`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Can Hunt with ID ${can_hunt_id} was gotten successfully!`);
      res.status(200).json(results);
    }
  });
});

// MANY 2 MANY -----------------------------------------------------------------
// Is Prey Of ------------------------------------------------------------------


//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>CREATE NEW<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

// Animals ---------------------------------------------------------------------
app.post("/animals", (req, res) => {
  const animalInputSpeciesName = req.body.species_name;
  const animalInputLifeExpectancy = req.body.life_expectancy;
  // const animalInputID= req.body.animal_id;

  //---------------------GET LARGEST ID-----------------------------------------
  const getLargestID = `SELECT MAX(oid) FROM animals`;
  database.all( getLargestID, (error, results) => {
    if (error) {
      console.error("Get largest ID failure: ", error);
      res.sendStatus(500);
    }
    else {
      // console.log('results', results);
      let maxAnimalID = (results[0]["MAX(oid)"] + 1);
      // console.log("maxID: ", maxAnimalID);
      const createNewAnimal =
        `INSERT INTO animals VALUES (?, ?, ?)`;
      // console.log(maxAnimalID);
      database.run( createNewAnimal,
        [animalInputSpeciesName, animalInputLifeExpectancy, maxAnimalID],
        (error) => {
          if (error) {
            console.error("Create new animal failure: ", error);
            res.sendStatus(500);
          }
          else {
            console.log("Create new animal succeeded!");
            res.sendStatus(200);
          }
      });
    }
  });
});

// Habitats --------------------------------------------------------------------
app.post("/habitats", (req, res) => {
  const habitatInputEnvironment = req.body.environment;
  const getLargestID = `SELECT MAX(oid) FROM habitats`;
  database.all( getLargestID, (error, results) => {
    if (error) {
      console.error("Get largest ID failure: ", error);
      res.sendStatus(500);
    }
    else {
      let maxHabitatsID = (results[0]["MAX(oid)"] + 1);
      const createNewHabitat = `INSERT INTO habitats VALUES (?, ?)`;

      database.run( createNewHabitat, [habitatInputEnvironment, maxHabitatsID],
        (error) => {
          if (error) {
            console.error("Create new habitat failure: ", error);
            res.sendStatus(500);
          }
          else {
            console.log("Create new habitat succeeded!");
            res.sendStatus(200);
          }
        }
      );
    }
  });
});

// Lives In --------------------------------------------------------------------
app.post("/lives_in", (req, res) => {
  const livesInInputAnimalId = req.body.animal_id;
  const livesInInputHabitatId = req.body.habitat_id;

  const createNewLivesIn = `INSERT INTO lives_in VALUES (?, ?)`;
  database.run( createNewLivesIn,
    [livesInInputAnimalId, livesInInputHabitatId],
    (error) => {
      if (error) {
        console.error("Create new lives in failure: ", error);
        res.sendStatus(500);
      }
      else {
        console.log("Create new lives in succeeded!");
        res.sendStatus(200);
      }
  });
});

// Can Hunt --------------------------------------------------------------------
app.post("/can_hunt", (req, res) => {
  const canHuntInputAnimalPredatorId = req.body.animal_predator_id;
  const canHuntInputAnimalPreyId = req.body.animal_prey_id;

  const createNewCanHunt = `INSERT INTO can_hunt VALUES (?, ?)`;
  database.run( createNewCanHunt,
    [canHuntInputAnimalPredatorId, canHuntInputAnimalPreyId],
    (error) => {
      if (error) {
        console.error("Create new can hunt failure: ", error);
        res.sendStatus(500);
      }
      else {
        console.log("Create new can hunt succeeded!");
        res.sendStatus(200);
      }
  });
});

//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>UPDATE ONE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

// Animals ---------------------------------------------------------------------
app.put("/animals/:id", (req, res) => {
  const animalId = req.params.id;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COOL TECH BELOW<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const queryHelper = Object.keys(req.body).map(elem =>
    `${elem.toUpperCase()} = ?`);
  console.log("1: ", queryHelper);
  const updateOneAnimal = `UPDATE animals SET ${queryHelper.join(", ")}
    WHERE animals.oid = ?`;
  console.log("2: ", updateOneAnimal);
  const queryValues = [...Object.values(req.body), animalId];
  console.log("3: ", queryValues);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COOL TECH ABOVE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  database.run( updateOneAnimal, queryValues, (error) => {
    if (error) {
        console.error(`Update animal with ID ${animalId} failed`, error);
        res.sendStatus(500); // client will hang without a result
      }
      else {
        console.log(`Animal with ID ${animalId} was updated successfully!`);
        res.sendStatus(200);
      }
  });
});

// Habitats --------------------------------------------------------------------
app.put("/habitats/:id", (req, res) => {
  const habitatId = req.params.id;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COOL TECH BELOW<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const queryHelper = Object.keys(req.body).map(elem =>
    `${elem.toUpperCase()} = ?`);
  console.log("1: ", queryHelper);
  const updateOneHabitat = `UPDATE habitats SET ${queryHelper.join(", ")}
    WHERE habitats.oid = ?`;
  console.log("2: ", updateOneHabitat);
  const queryValues = [...Object.values(req.body), habitatId];
  console.log("3: ", queryValues);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COOL TECH ABOVE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  database.run( updateOneHabitat, queryValues, (error) => {
    if (error) {
        console.error(`Update habitat with ID ${habitatId} failed`, error);
        res.sendStatus(500); // client will hang without a result
      }
      else {
        console.log(`Habitat with ID ${habitatId} was updated successfully!`);
        res.sendStatus(200);
      }
  });
});

//----------------------MANY TO MANY UPDATES------------------------------------
// Lives In --------------------------------------------------------------------
app.put("/lives_in/:id", (req, res) => {
  const livesInId = req.params.id;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COOL TECH BELOW<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const queryHelper = Object.keys(req.body).map(elem =>
    `${elem.toUpperCase()} = ?`);
  console.log("1: ", queryHelper);
  const updateOneLivesIn = `UPDATE lives_in SET ${queryHelper.join(", ")}
    WHERE lives_in.oid = ?`;
  console.log("2: ", updateOneLivesIn);
  const queryValues = [...Object.values(req.body), livesInId];
  console.log("3: ", queryValues);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COOL TECH ABOVE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  database.run( updateOneLivesIn, queryValues, (error) => {
    if (error) {
        console.error(`Update Lives In with ID ${livesInId} failed`, error);
        res.sendStatus(500); // client will hang without a result
      }
      else {
        console.log(`Lives In with ID ${livesInId} was updated successfully!`);
        res.sendStatus(200);
      }
  });
});

// Can Hunt --------------------------------------------------------------------
app.put("/can_hunt/:id", (req, res) => {
  const canHuntId = req.params.id;
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COOL TECH BELOW<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const queryHelper = Object.keys(req.body).map(elem =>
    `${elem.toUpperCase()} = ?`);
  console.log("1: ", queryHelper);
  const updateOneCanHunt = `UPDATE can_hunt SET ${queryHelper.join(", ")}
    WHERE can_hunt.oid = ?`;
  console.log("2: ", updateOneCanHunt);
  const queryValues = [...Object.values(req.body), canHuntId];
  console.log("3: ", queryValues);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COOL TECH ABOVE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  database.run( updateOneCanHunt, queryValues, (error) => {
    if (error) {
        console.error(`Update Can Hunt with ID ${canHuntId} failed`, error);
        res.sendStatus(500); // client will hang without a result
      }
      else {
        console.log(`Can Hunt with ID ${canHuntId} was updated successfully!`);
        res.sendStatus(200);
      }
  });
});
//------------------------------------------------------------------------------

//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DELETE ONE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

// Animals ---------------------------------------------------------------------
app.delete("/animals/:id", (req, res) => {
  const animalId = req.params.id;
  const deleteAnimalById = `DELETE FROM animals
    WHERE animals.animal_id = ${animalId}`;
  database.run( deleteAnimalById, (error) => {
    if (error) {
      console.error(`Delete animal with ID ${animalId} failed`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Animal with ID ${animalId} was deleted successfully!`);
      res.sendStatus(200);
    }
  });
});

// Habitats --------------------------------------------------------------------
app.delete("/habitats/:id", (req, res) => {
  const habitatId = req.params.id;
  const deleteHabitatById = `DELETE FROM habitats
    WHERE habitats.habitat_id = ${habitatId}`;
  database.run( deleteHabitatById, (error) => {
    if (error) {
      console.error(`Delete habitat with ID ${habitatId} failed`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Habitat with ID ${habitatId} was deleted successfully!`);
      res.sendStatus(200);
    }
  });
});

// Lives In --------------------------------------------------------------------
app.delete("/lives_in/:id", (req, res) => {
  const livesInId = req.params.id;
  const deleteLivesInById = `DELETE FROM lives_in
    WHERE lives_in.oid = ${livesInId}`;
  database.run( deleteLivesInById, (error) => {
    if (error) {
      console.error(`Delete Lives In with ID ${livesInId} failed`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Lives In with ID ${livesInId} was deleted successfully!`);
      res.sendStatus(200);
    }
  });
});

// Can Hunt --------------------------------------------------------------------
app.delete("/can_hunt/:id", (req, res) => {
  const canHuntId = req.params.id;
  const deleteCanHuntById = `DELETE FROM can_hunt
    WHERE can_hunt.oid = ${canHuntId}`;
  database.run( deleteCanHuntById, (error) => {
    if (error) {
      console.error(`Delete Can Hunt with ID ${canHuntId} failed`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Can Hunt with ID ${canHuntId} was deleted successfully!`);
      res.sendStatus(200);
    }
  });
});

//##############################################################################
//##############################################################################
//::::::::::::::::::::::::::::::::END ROUTES::::::::::::::::::::::::::::::::::::
//##############################################################################
//##############################################################################


//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>LISTEN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//==============================================================================








//==============================================================================
//=================================END ALL======================================
//==============================================================================
