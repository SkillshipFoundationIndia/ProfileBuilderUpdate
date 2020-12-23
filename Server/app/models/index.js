const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
// db.task = require("../models/task.model.js")(sequelize, Sequelize);
db.tasks = require("./task.model.js")(sequelize, Sequelize);
db.tasks2 = require("./task2.model.js")(sequelize, Sequelize);

db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
// db.images = require("./image.model.js")(sequelize, Sequelize);
// db.files = require("./file.model.js")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });


db.role.belongsToMany(db.admin, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "adminId"
});
db.admin.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "adminId",
  otherKey: "roleId"
});


db.ROLES = ["superadmin", "admin", "admin2"];

db.role.hasMany(db.admin, { as: "admin" });
db.admin.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "role",
});



db.admin.hasMany(db.user, { as: "users" });
db.user.belongsTo(db.admin, {
  foreignKey: "adminId",
  as: "admin",
});


db.admin.hasMany(db.tasks2, { as: "tasks2" });
db.tasks2.belongsTo(db.admin, {
  foreignKey: "adminId",
  foreignKey: "adminId2",
  as: "admin",
});



db.admin.hasMany(db.tasks, { as: "tasks" });
db.tasks.belongsTo(db.admin, {
  foreignKey: "adminId",
  as: "admin",
});

db.user.hasMany(db.tasks, { as: "tasks" });
db.tasks.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});

// db.user.hasMany(db.images, { as: "images" });
// db.images.belongsTo(db.user, {
//   foreignKey: "userId",
//   as: "users",
// });


// db.admin.hasMany(db.images, { as: "images" });
// db.images.belongsTo(db.admin, {
//   foreignKey: "adminId",
//   as: "admins",
// });




db.admin.belongsTo(db.admin, {
  Key: "adminId",
  as: "admin",
});



module.exports = db;
