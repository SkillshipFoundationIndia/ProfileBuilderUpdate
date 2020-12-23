const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(express.static('resources'));



app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Admin = db.admin;
const Role = db.role;
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/task.routes")(app);
require("./app/routes/task2.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}.');
});




function initial() {
  Role.create({
    id: 1,
    name: "superadmin"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
 
  Role.create({
    id: 3,
    name: "admin2"
  });
}

// function initial1() {
//   Admin.create({
//     id: 1,
//     username: "superadmin",
//     email: "superadmin@su.com",
//     password:"$2a$08$D9qSfsTHYXQQDNC8gZLveeToBqTgoTQYoAFX5kggg0YPS.qWMx8/y",//pss: 123123
//     roleId:1,
//     roles:["superadmin"]
//   });
// }

initial();
// initial1();

