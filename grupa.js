const Sequelize = require("sequelize");
 
module.exports = function (sequelize, DataTypes) {
    const Grupa = sequelize.define('Grupa', {
       naziv: {
           type: Sequelize.STRING,
           unique: true
       },
   });
   return Grupa;
}