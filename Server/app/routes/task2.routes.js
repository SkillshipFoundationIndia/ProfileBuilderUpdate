module.exports = app => {
  const tasks = require("../controllers/task2.controller.js");

  var router = require("express").Router();
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Create a new Task
  app.post("/api/tasks2/", tasks.create2);

  // router.get("/:assign", tasks.assignedto);


  // Retrieve all Tasks
  app.get("/api/tasks2/", tasks.findAll2);
  app.get("/api/lists2/", tasks.findtasks2);
  app.get("/api/donelists2/", tasks.finddonetasks2);

    
  // Retrieve all published Tasks
  app.get("/api/tasks2/published", tasks.findAllPublished2);

  // Retrieve a single Task with id
  app.get("/api/tasks2/:adminId2", tasks.findOne2);

  app.get("/api/taskss/:adminId", tasks.findOne);

  // Update a Task with id
  app.put("/api/tasks2/:id", tasks.update2);

  // Delete a Task with id
  app.delete("/api/tasks2/:id", tasks.delete2);

  // Delete all Tasks
  app.delete("/api/tasks2/", tasks.deleteAll2);

};
