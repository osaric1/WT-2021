const Sequelize = require("sequelize");
 
module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define('Student', {
       ime: Sequelize.STRING,
       prezime: Sequelize.STRING,
       index: {
           type: Sequelize.STRING,
           unique: true
       },
       grupa: Sequelize.STRING
   });
   return Student;
}