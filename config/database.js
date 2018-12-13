const Sequelize = require("sequelize");

/*I can export a function and not requiring other dependency in required file because this function is alreay requiring it*/
module.exports = new Sequelize("jobFinder", "root", "root", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
