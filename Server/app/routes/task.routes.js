module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    // Create a new Task
    app.post("/api/tasks/", tasks.create);

    // router.get("/:assign", tasks.assignedto);

  
    // Retrieve all Tasks
    app.get("/api/tasks/", tasks.findAll);
    app.get("/api/lists/", tasks.findtasks);

      
    // Retrieve all published Tasks
    app.get("/api/tasks/published", tasks.findAllPublished);
  
    // Retrieve a single Task with id
    app.get("/api/tasks/:adminId", tasks.findOne);
    app.get("/api/tasksdone/", tasks.findByDone);

    // Update a Task with id
    app.put("/api/tasks/:id", tasks.update);
  
    // Delete a Task with id
    app.delete("/api/tasks/:id", tasks.delete);
  
    // Delete all Tasks
    app.delete("/api/tasks/", tasks.deleteAll);
  
  };
