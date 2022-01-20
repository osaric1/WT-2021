const Sequelize = require("sequelize");
 
module.exports = function (sequelize, DataTypes) {
    const Vjezba = sequelize.define('Vjezba', {
       naziv: {
           type: Sequelize.STRING,
           unique: true
       }
   });
   return Vjezba;
}