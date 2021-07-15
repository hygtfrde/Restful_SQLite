//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>REQUIRE<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

const db = require("./database.js");

//==============================================================================

//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SEED DATA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

const animals_list = [
  {species_name: "Canis Familiaris", life_expectancy: 12, animal_id: 1},
  {species_name: "Pigeon", life_expectancy: 3, animal_id: 2},
  {species_name: "Felis Catus", life_expectancy: 15, animal_id: 3},
  {species_name: "Rattus", life_expectancy: 2, animal_id: 4},
  {species_name: "Human", life_expectancy: 79, animal_id: 5}, // 5
  {species_name: "Zeta Reticulian", life_expectancy: 10000, animal_id: 6},
  {species_name: "Selachimorpha", life_expectancy: 25, animal_id: 7},
  {species_name: "Bald Eagle", life_expectancy: 42, animal_id: 8},
  {species_name: "Talking Parrot", life_expectancy: 63, animal_id: 9},
  {species_name: "Billy Goat", life_expectancy: 7, animal_id: 10}, // 10
  {species_name: "Polar Bear", life_expectancy: 11, animal_id: 11},
  {species_name: "Grizzly Bear", life_expectancy: 13, animal_id: 12},
  {species_name: "Penguin", life_expectancy: 8, animal_id: 13},
  {species_name: "Sea Turtle", life_expectancy: 45, animal_id: 14},
  {species_name: "Butteryfly", life_expectancy: 1, animal_id: 15}, // 15
  {species_name: "Bumble Bee", life_expectancy: 1, animal_id: 16},
  {species_name: "Praying Mantis", life_expectancy: 2, animal_id: 17},
  {species_name: "Blue Bird", life_expectancy: 5, animal_id: 18},
  {species_name: "Shrimp", life_expectancy: 1, animal_id: 19},
  {species_name: "Camelus", life_expectancy: 16, animal_id: 20}, // 20
  {species_name: "Cactaceae", life_expectancy: 28, animal_id: 21},
  {species_name: "Lizard", life_expectancy: 4, animal_id: 22},
  {species_name: "Blow Fish", life_expectancy: 6, animal_id: 23},
  {species_name: "Bob Cat", life_expectancy: 12, animal_id: 24},
  {species_name: "Puma", life_expectancy: 13, animal_id: 25}, // 25
  {species_name: "Wolf", life_expectancy: 9, animal_id: 26},
  {species_name: "Rattlesnake", life_expectancy: 5, animal_id: 27},
  {species_name: "Racoon", life_expectancy: 10, animal_id: 28},
  {species_name: "Owl", life_expectancy: 33, animal_id: 29},
  {species_name: "Dolphin", life_expectancy: 14, animal_id: 30}, // 30
  {species_name: "Killer Whale", life_expectancy: 13, animal_id: 31},
  {species_name: "Blue Whale", life_expectancy: 23, animal_id: 32},
  {species_name: "Spider Monkey", life_expectancy: 28, animal_id: 33},
  {species_name: "Gorilla", life_expectancy: 31, animal_id: 34},
  {species_name: "Tuna", life_expectancy: 4, animal_id: 35}, // 35
  {species_name: "Bat", life_expectancy: 9, animal_id: 36},
  {species_name: "Goldfish", life_expectancy: 5, animal_id: 37},
  {species_name: "Pig", life_expectancy: 16, animal_id: 38},
  {species_name: "Chicken", life_expectancy: 8, animal_id: 39},
  {species_name: "Cow", life_expectancy: 4, animal_id: 40}, // 40
  {species_name: "Duck", life_expectancy: 5, animal_id: 41},
  {species_name: "Seal", life_expectancy: 8, animal_id: 42},
  {species_name: "Apple Tree", life_expectancy: 50, animal_id: 43},
  {species_name: "Carrot", life_expectancy: 1, animal_id: 44},
  {species_name: "Lettuce", life_expectancy: 1, animal_id: 45}, // 45
  {species_name: "Sun Flower", life_expectancy: 25, animal_id: 46},
  {species_name: "Earth Worm", life_expectancy: 3, animal_id: 47},
  {species_name: "House Fly", life_expectancy: 0, animal_id: 48},
  {species_name: "Plankton", life_expectancy: 1, animal_id: 49},
  {species_name: "Beatle Bug", life_expectancy: 0, animal_id: 50}, // 50
  {species_name: "Grass", life_expectancy: 2, animal_id: 51},
  {species_name: "Salmon", life_expectancy: 3, animal_id: 52}
];

const habitats_list = [
  {environment: "With Humans", habitat_id: 1}, // ID = 1
  {environment: "Grassland Plains", habitat_id: 2}, // ID = 2
  {environment: "Mountains", habitat_id: 3}, // ID = 3
  {environment: "Forest", habitat_id: 4}, // ID = 4
  {environment: "Jungle", habitat_id: 5}, // ID = 5
  {environment: "Desert", habitat_id: 6}, // ID = 6
  {environment: "Water", habitat_id: 7}, // ID = 7
  {environment: "Ice Tundra", habitat_id: 8}, // ID = 8
  {environment: "Sky", habitat_id: 9}, // ID = 9
  {environment: "Outer Space", habitat_id: 10}, // ID = 10
  {environment: "Marshlands", habitat_id: 11} // ID = 11
];

const lives_in_list = [
  {animal_id: 1, habitat_id: 1},
  {animal_id: 1, habitat_id: 2},
  {animal_id: 1, habitat_id: 3},
  {animal_id: 2, habitat_id: 1},
  {animal_id: 2, habitat_id: 2},
  {animal_id: 2, habitat_id: 9},
  {animal_id: 5, habitat_id: 1},
  {animal_id: 5, habitat_id: 2},
  {animal_id: 5, habitat_id: 3},
  {animal_id: 5, habitat_id: 4},
  {animal_id: 5, habitat_id: 5},
  {animal_id: 5, habitat_id: 6},
  {animal_id: 5, habitat_id: 7},
  {animal_id: 5, habitat_id: 8},
  {animal_id: 5, habitat_id: 9},
  {animal_id: 6, habitat_id: 10},
  {animal_id: 11, habitat_id: 8},
  {animal_id: 14, habitat_id: 7},
  {animal_id: 18, habitat_id: 2},
  {animal_id: 18, habitat_id: 4},
  {animal_id: 20, habitat_id: 6},
  {animal_id: 28, habitat_id: 1},
  {animal_id: 28, habitat_id: 4},
  {animal_id: 34, habitat_id: 5},
  {animal_id: 37, habitat_id: 1},
  {animal_id: 37, habitat_id: 7},
  {animal_id: 38, habitat_id: 1},
  {animal_id: 38, habitat_id: 4},
  {animal_id: 41, habitat_id: 11},
  {animal_id: 41, habitat_id: 7},
  {animal_id: 44, habitat_id: 5}
];

const can_hunt_list = [
  {animal_predator_id: 1, animal_prey_id: 1},
  {animal_predator_id: 1, animal_prey_id: 2},
  {animal_predator_id: 1, animal_prey_id: 3},
  {animal_predator_id: 3, animal_prey_id: 4},
  {animal_predator_id: 5, animal_prey_id: 5},
  {animal_predator_id: 5, animal_prey_id: 19},
  {animal_predator_id: 5, animal_prey_id: 23},
  {animal_predator_id: 5, animal_prey_id: 24},
  {animal_predator_id: 5, animal_prey_id: 35},
  {animal_predator_id: 5, animal_prey_id: 38},
  {animal_predator_id: 5, animal_prey_id: 41},
  {animal_predator_id: 5, animal_prey_id: 52},
  {animal_predator_id: 6, animal_prey_id: 40},
  {animal_predator_id: 12, animal_prey_id: 38},
  {animal_predator_id: 17, animal_prey_id: 15},
  {animal_predator_id: 18, animal_prey_id: 46},
  {animal_predator_id: 18, animal_prey_id: 47},
  {animal_predator_id: 22, animal_prey_id: 48},
  {animal_predator_id: 24, animal_prey_id: 39},
  {animal_predator_id: 29, animal_prey_id: 4},
  {animal_predator_id: 37, animal_prey_id: 49},
  {animal_predator_id: 39, animal_prey_id: 50},
  {animal_predator_id: 40, animal_prey_id: 51},
  {animal_predator_id: 42, animal_prey_id: 52}
];


//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>END SEED DATA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

//==============================================================================
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>QUERIES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//==============================================================================

const deleteAnimals = `DELETE FROM animals`;
const deleteHabitats = `DELETE FROM habitats`;
const deleteLivesIn = `DELETE FROM lives_in`;
const deleteCanHunt = `DELETE FROM can_hunt`;

const insertIntoAnimals = `INSERT INTO animals
  (species_name, life_expectancy, animal_id)
  VALUES (?, ?, ?)`;
const insertIntoHabitats = `INSERT INTO habitats
  (environment, habitat_id)
  VALUES (?, ?)`;
const insertIntoLivesIn = `INSERT INTO lives_in
  (animal_id, habitat_id)
  VALUES (?, ?)`;
const insertIntoCanHunt = `INSERT INTO can_hunt
  (animal_predator_id, animal_prey_id)
  VALUES (?, ?)`;

//==============================================================================

//==============================================================================
//==============================RUN DATABASE====================================
//==============================================================================

db.run(deleteAnimals, (error) => {
  if (error) {
    console.error(new Error ("Failed to delete animals"));
  }
  else {
    animals_list.forEach( animal => {
      db.run(insertIntoAnimals,
        [animal.species_name, animal.life_expectancy, animal.animal_id],
        error => {
          if (error) {
            console.error(new Error("Failed to add animals", error));
          }
          else {
            console.log(`Successfully added ${animal.species_name}`);
          }
      });
    });
    db.run(deleteHabitats, (error) => {
      if (error) {
        console.error(new Error("Failed to delete habitats"));
      }
      else {
        habitats_list.forEach(habitat => {
          db.run(
            insertIntoHabitats,
            [habitat.environment, habitat.habitat_id],
            error => {
              if (error) {
                console.error(new Error("Failed to add habitats"), error);
              }
              else {
                console.log(`Successfully added ${habitat.environment}`);
              }
          });
        });
        db.run(deleteLivesIn, (error) => {
          if (error) {
            console.error(new Error("Failed to delete lives in"), error);
          }
          else {
            lives_in_list.forEach(animalInHabitat => {
              db.run(
                insertIntoLivesIn,
                [animalInHabitat.animal_id, animalInHabitat.habitat_id],
                error => {
                  if (error) {
                    console.error(new Error("Failed to add animal in habitat"),
                      error);
                  }
                  else {
                    console.log(`Successfully added animal to habitat`);
                  }
              });
            });
            db.run(deleteCanHunt, error => {
              if (error) {
                console.error(new Error("Failed to delete can hunt"), error);
              }
              else {
                can_hunt_list.forEach(canHunt => {
                  db.run(
                    insertIntoCanHunt,
                    [canHunt.animal_predator_id, canHunt.animal_prey_id],
                    error => {
                      if (error) {
                        console.error(new Error("Failed to add predator"),
                          error);
                      }
                      else {
                        console.log("Successfully added predator data");
                      }
                  });
                });
              } // end else
            });
          } // end else
        });
      } // end else
    });
  } // end else
});








//==============================================================================
//================================END ALL=======================================
//==============================================================================
