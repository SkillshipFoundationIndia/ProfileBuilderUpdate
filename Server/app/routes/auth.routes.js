const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post(
    "/api/auth/adminsignup",
    [
      verifySignUp.checkDuplicateUsernameOrEmailAdmin,
      verifySignUp.checkRolesExisted
    ],
    controller.signupAdmin
  );


  // app.get("/api/image/upload/", controller.profilepic);

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/updatebasic", controller.updatebasic);
  app.get("/api/auth/user",controller.profile);
  app.post("/api/auth/task", controller.task);
  app.get("/api/auth/users",controller.findAll);
  app.get("/api/auth/users/:id",controller.findOne);
  app.put("/api/auth/users/:id", controller.update);
  // app.post("/api/auth/tasks/:adminId", controller.findOne);
  app.get("/api/auth/usertasks",controller.findAllUserTasks);
  app.get("/api/auth/donetasks",controller.findDoneTasks);
  app.get("/api/auth/ranktasks",controller.findRanksTasks);
  app.get("/api/auth/usertasks/:id",controller.findOneUserTasks);
  app.delete("/api/auth/user/:id", controller.deleteUser);
  app.get("/api/auth/allusers",controller.AllUsers);
  
  app.get("/api/auth/adminlist/", controller.findAdmins);

  app.get("/api/auth/adminlist/:adminId", controller.findAdminList);
  app.post("/api/auth/adminsignin", controller.signinAdmin);
  app.get("/api/auth/admins",controller.findAllAdmins);
  app.get("/api/auth/admin1",controller.findAllAdmin1);
  app.get("/api/auth/admins1",controller.findAlAdmin1);
  app.get("/api/auth/admin2",controller.findAdmin2);
  app.get("/api/auth/alladmins",controller.AllAdmins);
  app.get("/api/auth/tasks",controller.findAllAdminsTasks);
  app.get("/api/auth/tasks2",controller.findAllAdminsTasks2);
  app.get("/api/auth/tasks/:id",controller.findOneAdminTasks);
  app.post("/api/auth/updatebasic2", controller.updatebasic2);
  app.post("/api/auth/updateadminId", controller.updateAdminId);
  app.put("/api/auth/updateadminId/:id", controller.updateAdminId);
  app.get("/api/auth/tasks2/:id",controller.findOneAdminTasks2);
  app.get("/api/auth/admin/:id",controller.findOneAdmin);
  app.get("/api/auth/admin2/:adminId",controller.findAdmin);
  app.get("/api/auth/roles/:roleId",controller.findAdmin_Roles);
  app.get("/api/auth/adminId/:adminId",controller.findByAdminId);
  app.get("/api/auth/admin1id/:id",controller.findById);
  app.put("/api/auth/admin/:id", controller.updateAdmin);
  // app.put("/api/auth/updateadminId/:id", controller.updateAdminId);
  // app.put("/api/auth/updateadmin2/:id", controller.uploadadmin2);
  app.delete("/api/auth/admin/:id", controller.deleteAdmin);
};
