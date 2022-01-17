const Sequelize = require("sequelize");
 
module.exports = function (sequelize, DataTypes) {
    const Zadatak = sequelize.define('Zadatak', {
       vjezbaID: Sequelize.INTEGER
   });
   return Zadatak;
}
