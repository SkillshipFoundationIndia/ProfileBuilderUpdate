module.exports = (sequelize, Sequelize) => {
    const Task2 = sequelize.define("task2", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      assignedto: {
        type: Sequelize.STRING
      },
      startdate: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.STRING
      },
      taskstatus: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return Task2;
  };
  