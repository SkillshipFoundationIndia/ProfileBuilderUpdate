const db = require("../models");
const Task2 = db.tasks2;
const Op = db.Sequelize.Op;
const Admin = db.admin;


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

exports.create2 = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  Task2.create({
    title: req.body.title,
    description: req.body.description,
    assignedto: req.body.assignedto,
    startdate: req.body.startdate,
    deadline: req.body.deadline,
    taskstatus: req.body.taskstatus,
    published: req.body.published ? req.body.published : false,
    adminId: req.body.adminId,
    adminId2: req.body.assignedto,
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

exports.findtasks2 = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Task2.findAll({ where: condition })
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

exports.finddonetasks2 = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Task2.findAll({ where: condition })
    .then(data => {
      var tasks = [],counter=[],freq= [],count=1,score,arr3=[],arr4=[],arr5=[],arr6=[];
      for(var i=0; i < data.length;i++){
        if(data[i].taskstatus=='Done'){
              tasks.push(data[i])
              freq[i] = -1;
        }
      }
      for(var i=0; i<tasks.length; i++)
     {
        count = 1;
        for(var j=i+1; j<tasks.length; j++)
        {
            if(tasks[i].adminId2==tasks[j].adminId2)
            {
                count++;
                freq[j] = 0;
            }
        }
        if(freq[i] != 0)
        {
            freq[i] = count;
        }
    }
    for(var i=0; i<tasks.length; i++)
    {
        if(freq[i] != 0)
        {
              // console.log(freq[i]);
              score = 5*freq[i];
              arr3.push(tasks[i].adminId2);
              arr4.push(freq[i]);
              // arr5.push(ranks)
              arr6.push(score)
        }
    }
    var arr=arr6;
    var sorted = arr.slice().sort(function(a,b){return b-a})
    var ranks = arr.map(function(v){ return sorted.indexOf(v)+1 });
    for(var i=0;i<freq.length;i++){
      counter.push({adminId: arr3[i], done:arr4[i],  score:arr6[i],rank:ranks[i]});
    }
    // counter.push({adminId:,done:freq[i],score:score})
    counter.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0)); 
    var length = 5;
    var ab = [];
    for(var i = 0; i < length; i++) {
      ab.push(counter[i]);
  }
    
      console.log(ab)
      res.send(ab);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};
// Retrieve all Tasks from the database.
exports.findAll2 = (req, res) => {
  const { page, size,title} = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Task2.findAndCountAll({ where: condition, limit, offset })
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



// exports.findOne2 = (req, res) => {
//   const adminId2 = req.params.adminId2;

//   Task2.findAll(adminId2)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Task with id=" + adminId2
//       });
//     });
// };

exports.findOne = (req, res) => {
  const adminId = req.params.adminId;

  Task2.findByPk(adminId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with id=" + id
      });
    });
};

exports.findOne2 = (req, res) => {
  const adminId2 = req.query.adminId2;
  var condition = adminId2 ? { adminId2: { [Op.like]: `%${adminId2}%` } } : null;

  Task2.findAll({
    where: condition
  })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "User Not found." });
      }
        res.status(200).send({
          data
        });
      // });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

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
exports.update2 = (req, res) => {
  const id = req.params.id;

  Task2.update(req.body, {
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
exports.delete2 = (req, res) => {
  const id = req.params.id;

  Task2.destroy({
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
exports.deleteAll2 = (req, res) => {
  Task2.destroy({
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
exports.findAllPublished2 = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Task2.findAndCountAll({ where: { published: true }, limit, offset })
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
