const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Admin = db.admin;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id,
    req.adminId = decoded.id;
    next();
  });
};

// isUser = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(users => {
//       for (let i = 0; i < users.length; i++) {
//         if (users[i].name === "superadmin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require SuperAdmin Role!"
//       });
//       return;
//     });
//   });
// };


isSuperAdmin = (req, res, next) => {
  Admin.findByPk(req.adminId).then(admin => {
    admin.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superadmin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require SuperAdmin Role!"
      });
      return;
    });
  });
};

isAdmin = (req, res, next) => {
  Admin.findByPk(req.adminId).then(admin => {
    admin.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
    });
  });
};

isAdmin2 = (req, res, next) => {
  Admin.findByPk(req.adminId).then(admin => {
    admin.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin2") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin2 Role!"
      });
    });
  });
};

isSuperAdminOrAdmin = (req, res, next) => {
  Admin.findByPk(req.adminId).then(admin => {
    admin.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superadmin") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
        
        if (roles[i].name === "admin2") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require SuperAdmin or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isSuperAdmin : isSuperAdmin,
  isAdmin: isAdmin,
  isAdmin2: isAdmin2,
  isSuperAdminOrAdmin: isSuperAdminOrAdmin
};
module.exports = authJwt;
