//==============================================================================
//==============================SETUP===========================================
//==============================================================================

let sqlite3 = require("sqlite3");
let database = new sqlite3.Database("./database.db");

//==============================================================================

//==============================================================================
//=============================TABLE ATTRIBUTES=================================
//==============================================================================

//-------------------Animal Table (Main Functional Idea)------------------------
// - species_name (text)
// - life_expectancy (integer)
// - is_carnivore (boolean) -- ADD LATER
// - is_omnivore (boolean) -- ADD LATER
// - is_herbivore (boolean) -- ADD LATER
// - habitat_id (text)
// - can_hunt_id
//------------------------------------------------------------------------------

//--------------------Habitats Table (Main Functional Idea)----------------------
// - with_humans
// - grasslands/plains (text)
// - mountains (text)
// - forest (text)
// - jungle (text)
// - desert (text)                 -------> ALL in ENVIRONMENT
// - water (text)
// - ice_tundra (text)
// - sky (text)
// - outer_space (text)
// - marshlands (text)
//------------------------------------------------------------------------------

//-----------------------Lives In Table (MANY TO MANY)--------------------------
// - Animal ID
// - Habitat ID
//------------------------------------------------------------------------------

//----------------------Can Hunt Table (MANY TO MANY)---------------------------
// - Aniaml ID Predator
// - Animal ID Prey
//------------------------------------------------------------------------------

//==============================================================================

//==============================================================================
//================================QUERIES=======================================
//==============================================================================

const createTableAnimalsQuery = `CREATE TABLE IF NOT EXISTS animals (
  species_name TEXT,
  life_expectancy INTEGER,
  animal_id INTEGER
)`;

const createTableHabitatsQuery = `CREATE TABLE IF NOT EXISTS habitats (
  environment TEXT,
  habitat_id INTEGER
)`;

const createTableLivesInQuery = `CREATE TABLE IF NOT EXISTS lives_in (
  animal_id INTEGER,
  habitat_id INTEGER
)`;

const createTableCanHuntQuery = `CREATE TABLE IF NOT EXISTS can_hunt (
  animal_predator_id INTEGER,
  animal_prey_id INTEGER
)`;

//==============================================================================

//==============================================================================
//========================INITIATE TABLES IN DATABASE===========================
//==============================================================================

database.run(createTableAnimalsQuery, (error) => {
  if (error) {
    console.error(new Error ("Create ANIMALS table failure: "), error);
  }
  else {
    console.log("Create ANIMALS table success");
  }
});

database.run(createTableHabitatsQuery, (error) => {
  if (error) {
    console.error(new Error ("Create HABITATS table failure: "), error);
  }
  else {
    console.log("Create HABITATS table success");
  }
});

database.run(createTableLivesInQuery, (error) => {
  if (error) {
    console.error(new Error ("Create LIVES IN table failure: "), error);
  }
  else {
    console.log("Create LIVES IN table success");
  }
});

database.run(createTableCanHuntQuery, (error) => {
  if (error) {
    console.error(new Error ("Create CAN HUNT table failure: "), error);
  }
  else {
    console.log("Create CAN HUNT table success");
  }
});

//==============================================================================

//==============================================================================
//===============================EXPORT DB======================================
//==============================================================================

module.exports = database;



//==============================================================================
//=================================END ALL======================================
//==============================================================================
