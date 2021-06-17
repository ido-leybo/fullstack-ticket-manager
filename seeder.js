require("dotenv").config();
const { Seeder } = require("mongo-seeding");
const path = require("path");

// create a seed for the first data in the database

function seed(database) {
  const config = {
    database: database,
    dropDatabase: true,
  };

  const seeder = new Seeder(config);

  const seed = seeder.readCollectionsFromPath(path.resolve("./seeds"));

  return seeder
    .import(seed)
    .then((_) => console.log("seeded successfully!"))
    .catch((err) => {
      console.log(err);
      console.log("error");
    });
}

module.exports = seed;
