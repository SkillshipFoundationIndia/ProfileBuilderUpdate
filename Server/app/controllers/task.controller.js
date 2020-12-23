const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;
var mysql = require('mysql'); //export mysql

const Admin = db.admin;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'testdb'
});

connection.connect();

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tasks } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tasks, totalPages, currentPage };
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Task.create({
    title: req.body.title,
    description: req.body.description,
    assignedto: req.body.assignedto,
    startdate: req.body.startdate,
    deadline: req.body.deadline,
    taskstatus: req.body.taskstatus,
    published: req.body.published ? req.body.published : false,
    adminId: req.body.adminId,
    userId:req.body.assignedto
  })
    .then(task => {
      res.send(task);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    });
};

// exports.create = (req, res) => {
//   // Save User to Database
//   Task.create({
//     title: req.body.title,
//     description: req.body.description,
//     assignedto: req.body.assignedto,
//     startdate: req.body.startdate,
//     deadline: req.body.deadline,
//     taskstatus: req.body.taskstatus,
//     published: req.body.published ? req.body.published : false,
//     adminId: req.body.adminId
//   })
//     .then(task => {
//       if (task) {
//        res.status(404).send({ message: "User Registered." });
//       }

//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };

// exports.assignedto = (req, res) => {
//   Task.findOne({
//     where: {
//       assignedto: req.body.assignedto
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



// exports.assignedto = (req, res) => {
//   const assignedto = req.body.username;


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

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Task.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Task with id=" + id
//       });
//     });
// };

exports.findtasks = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Task.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};
// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
  const { page, size,title} = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Task.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.findOne = (req, res) => {
  const adminId = req.params.adminId;

  Task.findByPk(adminId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id
      });
    });
};

// exports.findOne = (adminId) => {
//   return Admin.findByPk(adminId, { include: ["tasks"] })
//     .then((admins) => {
//       return admins;
//     })
//     .catch((err) => {
//       console.log(">> Error while finding tutorial: ", err);
//     });
// };

// exports.findTutorialById = (tutorialId) => {
//   return Tutorial.findByPk(tutorialId, { include: ["comments"] })
//     .then((tutorial) => {
//       return tutorial;
//     })
//     .catch((err) => {
//       console.log(">> Error while finding tutorial: ", err);
//     });
// };
// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tasks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks."
      });
    });
};

// find all published Task
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Task.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};


exports.findByDone = (req, res) => {
  connection.query("SELECT userId FROM tasks WHERE taskstatus = 'Done'", 
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
