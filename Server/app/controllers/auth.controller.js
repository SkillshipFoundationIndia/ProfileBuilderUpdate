const db = require("../models");
const config = require("../config/auth.config");
var mysql = require('mysql'); //export mysql
var stream = require('stream');

// Connection between node and database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'testdb'
});

connection.connect();

const User = db.user;
const Role = db.role;
const Task = db.task;
const Admin = db.admin;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: admins } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, admins, totalPages, currentPage };
};
const getPagingData1 = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};
////////////////////////
// Admins//
// exports.findAllAdmins = () => {
//   return Admin.findAll({
//     include: ["users"],
//   }).then((admin) => {
//     return admin;
//   });
// };


exports.AllUsers = (req, res) => {
  const { page, size, username } = req.query;

  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
  const { limit, offset } = getPagination(page, size);
  User.findAndCountAll({ where: condition, limit, offset })
  .then(data => {
    const response = getPagingData1(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.AllAdmins = (req, res) => {
  const { page, size, username } = req.query;

  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
  const { limit, offset } = getPagination(page, size);
  Admin.findAndCountAll({ where: condition, limit, offset })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};

exports.findAdmins = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Admin.findAll({ where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findAllAdmins = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Admin.findAll({ where: condition, include:["users"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
exports.findAllAdminsTasks = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Admin.findAll({ where: condition, include: ["tasks"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
exports.findAllAdminsTasks2 = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Admin.findAll({ where: condition, include: ["tasks2"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};



exports.profilepic = function(req, res){
  connection.query('SELECT * FROM images WHERE adminId = ?', [req.params.adminId],  
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};


// app.post('/api/getProfilePic', (req, res) => {
//   db.profile.findAll({
//     attributes: ['profile_pic', 'emp_id'],
//     where: { emp_id: req.body.emp_id },
//     raw: true
//   })
//     .then(profile => {
//       res.json({ success: true, data: profile })
//     })
//     .catch(err => {
//       console.log('in error :: /api/getProfilePic')
//     })
// })

exports.findAdmin_Roles = (req, res) => {
  connection.query('SELECT * FROM admins WHERE roleId = ?', [req.params.roleId], 
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};

exports.findByAdminId = (req, res) => {
  connection.query('SELECT * FROM admins WHERE adminId = ?', [req.params.adminId],  
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};
exports.findById = (req, res) => {
  connection.query('SELECT * FROM admins WHERE id = ?', [req.params.id],  
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};

  
// router.get('/reader', function(req, res){
//   //load the post - This works. The post/writing gets loaded
  
exports.findOneAdmin = (req, res) => {
  const id = req.params.id;

  Admin.findByPk(id, { include: ["users"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.deleteAdmin = (req, res) => {
  const id = req.params.id;
  Admin.destroy({
    where: { id:id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Admin was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Admin with id=" + id
      });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id:id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Admin was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Admin with id=${id}. Maybe Admin was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Admin with id=" + id
      });
    });
};

exports.findOneAdminTasks = (req, res) => {
  const id = req.params.id;

  Admin.findByPk(id, { include: ["tasks"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};


exports.findOneAdminTasks2 = (req, res) => {
  const id = req.params.id;

  Admin.findByPk(id, { include: ["tasks2"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};




exports.updateAdmin = (req, res) => {
  const id = req.params.id;

  Admin.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};




exports.signupAdmin = (req, res) => {
  // Save User to Database
  Admin.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    adminId: req.body.adminId,
    roleId:req.body.roleId
  })
    .then(admin => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          admin.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        admin.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "err.message" });
    });
};



exports.signinAdmin = (req, res) => {
  Admin.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(admin => {
      if (!admin) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        admin.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: admin.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      admin.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: admin.id,
          username: admin.username,
          email: admin.email,
          first_name: admin.first_name,
          last_name: admin.last_name,
          dob: admin.dob,
          gender: admin.gender,
          size: admin.size,
          about: admin.about,
          degree: admin.degree,
          institute: admin.institute,
          field: admin.field,
          start: admin.start,
          end: admin.end, 
          type: admin.type,
          skills: admin.skills,
          resume: admin.resume,
          experience: admin.experience,
          hackerrank: admin.hackerrank,
          linkedin: admin.linkedin,
          github: admin.github,
          stackoverflow: admin.stackoverflow,
          hackerrank: admin.hackerrank,
          linkedin: admin.linkedin,
          github: admin.github,
          stackoverflow: admin.stackoverflow,
          number: admin.number,
          address: admin.address,
          city: admin.city,
          country: admin.country,
          zip: admin.zip,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findOne = (adminId) => {
  return Admin.findByPk(adminId, { include: ["tasks"] })
    .then((admins) => {
      return admins;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};

exports.findAdminList = (req, res) => {
  const adminId = req.query.adminId;
  var condition = adminId ? { adminId: { [Op.like]: `%${adminId}%` } } : null;

  Admin.findAll({
    where: condition
  })
    .then(admins => {
      if (!admins) {
        return res.status(404).send({ message: "User Not found." });
      }
        res.status(200).send({
         admins
        });
      // });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateAdminId = (req, res) => {
  const id = req.params.id;

  Admin.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Admin was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Admin with id=" + id
      });
    });
};

// exports.updateAdminId = (req, res) => {
//   Admin.findOne({
//     where: {
//       id: req.body.id
//     }
//   })
//     .then(admins => {
//       if (admins){
//         connection.query('UPDATE admins SET ? WHERE ?', [{
//           adminId: req.body.adminId,
//         }, {id: req.body.id}])
//       }
//       res.send({ message: "User profile updated successfully!" });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };



exports.updatebasic2 = (req, res) => {
  Admin.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(admins => {
      if (admins){
        connection.query('UPDATE admins SET ? WHERE ?', [{
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          dob: req.body.dob,
          gender: req.body.gender,
          size: req.body.size,
          about: req.body.about,
          degree: req.body.degree,
          institute: req.body.institute,
          field: req.body.field,
          start: req.body.start,
          end: req.body.end, 
          type: req.body.type,
          skills: req.body.skills,
          resume: req.body.resume,
          experience: req.body.experience,
          hackerrank: req.body.hackerrank,
          linkedin: req.body.linkedin,
          github: req.body.github,
          stackoverflow: req.body.stackoverflow,
          hackerrank: req.body.hackerrank,
          linkedin: req.body.linkedin,
          github: req.body.github,
          stackoverflow: req.body.stackoverflow,
          number: req.body.number,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          zip: req.body.zip
        }, {username: req.body.username}])
      }
      res.send({ message: "User profile updated successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



///////////////
// Users//
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { include: ["tasks"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.findOneUserTasks = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { include: ["tasks"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};
exports.findAllUserTasks = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition, include: ["tasks"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};



exports.findDoneTasks = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition, include: ["tasks"] })
    .then(data => {
      var a = [],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],abc=[];
      // a.length = 5;
      for (var j = 0; j < data.length; j++) {
        var sum = [], score = 0,s=[], c=[];
        if(data[j].tasks.length>=1){
      for (var i = 0; i < data[j].tasks.length; i++) {
        if(data[j].tasks[i].taskstatus=='Done')
        {
          // c[i] = 1;
          sum.push(c[i]=1);
        }
      } 
      score = 5 * sum.length;
      s.push(score);

      arr3.push(data[j].username);
      arr4.push(sum.length);
      // arr5.push(ranks)
      arr6.push(score)
    
        }
          abc.push(arr2[j] = {name:  data[j].username, done:sum.length,  score:score});
  }
  var arr=arr6;
  var sorted = arr.slice().sort(function(a,b){return b-a})
  var ranks = arr.map(function(v){ return sorted.indexOf(v)+1 });
  // ranks = [1,2,3,4,5];
   
  arr5.push(ranks)
  for(var i=0;i<data.length;i++){
    a.push({name: arr3[i], done:arr4[i],  score:arr6[i],rank:ranks[i]});
  }
   a.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)); 
    var myData = [].concat(a).sort((a, b) => a.itemM > b.itemM ? -1 : 1)
    for(var i=0;i<5;i++){
      arr2.push({rank:i+1})
  }
   

    var length = 5;
    var ab = [];
    for(var i = 0; i < length; i++) {
      if(myData[i].name==0)
      {
        ab.push("No data to show")
      }
      else(
        ab.push(myData[i])
      )
      
  }
    // var sorted2 = myData.slice().sort(function(a,b){return b-a})
    // var arr = sorted2;
    // var sorted = arr.slice().sort(function(a,b){return b-a})
    // var ranks = arr.map(function(v){ return sorted.indexOf(v)+1 });
    // myData.push(ranks)
    // console.log(ranks);
    // console.log(arr3);
    // console.log(arr4);
    // console.log(arr6);
    // console.log(ranks);
    // console.log(myData);

    res.send(ab);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


exports.findRanksTasks = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Admin.findAll({ where: condition, include: ["tasks2"] })
  .then(data => {
    var a = [],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],abc=[];
    // a.length = 5;
    for (var j = 0; j < data.length; j++) {
      var sum = [], score = 0,s=[], c=[];
      if(data[j].tasks.length>=1){
    for (var i = 0; i < data[j].tasks.length; i++) {
      if(data[j].tasks[i].taskstatus=='Done')
      {
        // c[i] = 1;
        sum.push(c[i]=1);
      }
    } 
    score = 5 * sum.length;
    s.push(score);

    // arr.push(s);
    // var sorted = arr.slice().sort(function(a,b){return b-a})
   
    arr3.push(data[j].username);
    arr4.push(sum.length);
    // arr5.push(ranks)
    arr6.push(score)
    // var ranks = a.map(function(v){ return a.indexOf(v)+1 });

      // a.push(arr2[j] = {name:  data[j].username, done:sum.length,  score:score});
    
      //   console.log(ranks)
      // a.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)); 
      // arr2.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)); 
    
      }
        abc.push(arr2[j] = {name:  data[j].username, done:sum.length,  score:score});
      

}
var arr=arr6;
var sorted = arr.slice().sort(function(a,b){return b-a})
var ranks = arr.map(function(v){ return sorted.indexOf(v)+1 });
// ranks = [1,2,3,4,5];
 
arr5.push(ranks)
for(var i=0;i<data.length;i++){
  a.push({name: arr3[i], done:arr4[i],  score:arr6[i],rank:ranks[i]});
}
 a.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)); 
  var myData = [].concat(a).sort((a, b) => a.itemM > b.itemM ? -1 : 1)
  for(var i=0;i<5;i++){
    arr2.push({rank:i+1})
}
 

  var length = 5;
  var ab = [];
  for(var i = 0; i < length; i++) {
    ab.push(myData[i]);
}
  // var sorted2 = myData.slice().sort(function(a,b){return b-a})
  // var arr = sorted2;
  // var sorted = arr.slice().sort(function(a,b){return b-a})
  // var ranks = arr.map(function(v){ return sorted.indexOf(v)+1 });
  // myData.push(ranks)
  // console.log(ranks);
  console.log(arr3);
  console.log(arr4);
  console.log(arr6);
  console.log(ranks);
  console.log(a);

  res.send(ab);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  });
};



exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    adminId: req.body.adminId
  })
    .then(user => {
      if (user) {
       res.status(404).send({ message: "User Registered." });
      }

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      // user.getRoles().then(roles => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          dob: user.dob,
          gender: user.gender,
          size: user.size,
          about: user.about,
          degree: user.degree,
          institute: user.institute,
          field: user.field,
          start: user.start,
          end: user.end, 
          type: user.type,
          skills: user.skills,
          resume: user.resume,
          experience: user.experience,
          hackerrank: user.hackerrank,
          linkedin: user.linkedin,
          github: user.github,
          stackoverflow: user.stackoverflow,
          hackerrank: user.hackerrank,
          linkedin: user.linkedin,
          github: user.github,
          stackoverflow: user.stackoverflow,
          number: user.number,
          address: user.address,
          city: user.city,
          country: user.country,
          zip: user.zip,
          roles: authorities,
          accessToken: token
        });
      // });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};






// exports.assignedto = (req, res) => {
//   const assignedto = req.params.assignedto;

//   Task.findByPk(assignedto)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Task with id=" + assignedto
//       });
//     });
// };


// exports.updateAdminId = (req, res) => {
//   Admin.findOne({
//     where: {
//       username: req.body.username
//     }
//   })
//     .then(user => {
//       if (user){
//         connection.query('UPDATE users SET ? WHERE ?', [{
//           adminId: req.body.adminId,
//         }, {username: req.body.username}])
//       }
//       res.send({ message: "User profile updated successfully!" });
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.updatebasic = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (user){
        connection.query('UPDATE users SET ? WHERE ?', [{
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          dob: req.body.dob,
          gender: req.body.gender,
          size: req.body.size,
          about: req.body.about,
          degree: req.body.degree,
          institute: req.body.institute,
          field: req.body.field,
          start: req.body.start,
          end: req.body.end, 
          type: req.body.type,
          skills: req.body.skills,
          resume: req.body.resume,
          experience: req.body.experience,
          hackerrank: req.body.hackerrank,
          linkedin: req.body.linkedin,
          github: req.body.github,
          stackoverflow: req.body.stackoverflow,
          hackerrank: req.body.hackerrank,
          linkedin: req.body.linkedin,
          github: req.body.github,
          stackoverflow: req.body.stackoverflow,
          number: req.body.number,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          zip: req.body.zip
        }, {username: req.body.username}])
      }
      res.send({ message: "User profile updated successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.profile = (req, res) => {
      connection.query('SELECT * FROM users WHERE username = ?', [req.params.username],(err, rows, fields)=>{
        if (!err)
        console.log(rows);
        // res.send(rows);
        else
        console.log(err);
    })
};


exports.task = (req, res) => {
  // Save User to Database
  Task.create({
    task_title: req.body.task_title,
    task_description: req.body.task_description, 
    assigned_to: req.body.assigned_to,
    start_date: req.body.start_date,
    deadline: req.body.deadline,
    task_status: req.body.task_status
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// exports.task = (req, res) => {
//     connection.query("INSERT INTO tasks (task_title,task_description,assigned_to,start_date, deadline, task_status) values ('req.body.task_title', 'req.body.task_description','req.body.assigned_to', 'req.body.start_date', 'req.body.deadline','req.body.task_status')", function (err, result, fields) {
//       // if any error while executing above query, throw error
//       if (err) throw err;
//       // if there is no error, you have the result
//       console.log(result);
//     });
//   };

// exports.task = (req, res) => {
//   connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO tasks (task_title, task_description,assigned_to,start_date,deadline,task_status) VALUES (req.body.task_title,req.body.task_description,req.body.assigned_to,req.body.start_date,req.body.deadline,req.body.task_status)";
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
// };


// exports.assignedto = (req, res) => {
//   Task.findOne({
//     where: {
//       assignedto: req.body.username
//     }
//   })
//   .then(task => {
//     if (task){
//       res.status(200).send({
//       title: task.title,
//       description:task.description,
//       assignedto:task.assignedto,
//       startdate:task.startdate,
//       deadline: task.deadline,
//       taskstatus:task.taskstatus,
//     });
//     }
//     res.send({ message: "User profile updated successfully!" });
//   })
//   .catch(err => {
//     res.status(500).send({ message: err.message });
//   });
// };



exports.assignedto = (req, res) => {
  connection.query('SELECT * FROM tasks WHERE assignedto = ?', [req.params.userID],  
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};

exports.findAdmin = (req, res) => {
  connection.query('SELECT * FROM admins WHERE adminId = ?', [req.params.adminId], 
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};

exports.findAllAdmin1 = (req, res) => {
  connection.query('SELECT * FROM admins WHERE roleId = 1 OR roleId=2',
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};

exports.findAlAdmin1 = (req, res) => {
  connection.query('SELECT * FROM admins WHERE roleId = 2',
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};

exports.findAdmin2 = (req, res) => {
  connection.query('SELECT * FROM admins WHERE roleId = 3 AND adminId = 1',
  (err, rows, fields)=>{
    if (!err)
    {
    // console.log(rows);
    res.send(rows);
    }
    else
    console.log(err);
})
};

// exports.updateAdminId = (req, res) => {
//   connection.query("UPDATE students SET marks=84 WHERE marks=74",
//   (err, rows, fields)=>{
//     if (!err)
//     {
//     // console.log(rows);
//     res.send(rows);
//     }
//     else
//     console.log(err);
// })
// };





exports.uploadadmin2 = (req, res) => {
  connection.query('SELECT * FROM admins WHERE adminId = ?', [req.params.adminId],(err, rows, fields)=>{
    if (!err)
    console.log(rows);
    // res.send(rows);
    else
    console.log(err);
})
};

// exports.profile = (req, res) => {
//       connection.query('SELECT * FROM users WHERE username = ?', [req.params.username],(err, rows, fields)=>{
//         if (!err)
//         console.log(rows);
//         // res.send(rows);
//         else
//         console.log(err);
//     })
// };