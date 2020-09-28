const Sequelize = require('sequelize');
const env = 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database,config.username,config.password,config);

db.User = require('./user')(sequelize,Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);
db.Movie = require('./movie')(sequelize,Sequelize);

Object.keys(db).forEach(modelName=>{
    if(db[modelName].associate){
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;