module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admins", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
      },
      degree: {
        type: Sequelize.STRING
      },
      institute: {
        type: Sequelize.STRING
      },
      field: {
        type: Sequelize.STRING
      },
      start: {
        type: Sequelize.STRING
      },
      end: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.STRING
      },
      resume: {
        type: Sequelize.STRING
      },
      experience: {
        type: Sequelize.STRING
      },
      hackerrank: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      github: {
        type: Sequelize.STRING
      },
      stackoverflow: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      }
    });
  
    return Admin;
  };
  