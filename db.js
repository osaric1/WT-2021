const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118717","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;


db.vjezba = require('./vjezba.js')(sequelize);
db.zadatak = require('./zadatak.js')(sequelize)
db.student = require('./student.js')(sequelize);
db.grupa = require('./grupa.js')(sequelize);

db.vjezba.hasMany(db.zadatak, {foreignKey: 'vjezbaID'})

module.exports = db
