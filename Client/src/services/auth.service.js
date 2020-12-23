import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const API_URL2 = "http://localhost:8080/api";


class AuthService {
  AllAdmins(params) {
    return axios.get(API_URL + "alladmins", { params });
  }

  AllUsers(params) {
    return axios.get(API_URL + "allusers", { params });
  }

  getAll() {
    return axios
    .get(API_URL + "users")
    .then(console.log("Data received")
    )
  }
  
  AdminsList() {
    return axios
    .get(API_URL + "adminlist")
    .then(console.log("Data received")
    )
  }

  getAllAdmin() {
    return axios
    .get(API_URL + "admins")
    .then(console.log("Data received")
    )
  }

  
  getAllAdminTasks() {
    return axios
    .get(API_URL + "tasks")
    .then(console.log("Data received")
    )
  }

  getAllUserTasks() {
    return axios
    .get(API_URL + "usertasks")
    .then(console.log("Data received")
    )
  }

  getAllDoneTasks() {
    return axios
    .get(API_URL + "donetasks")
    .then(console.log("Data received")
    )
  }

  getAllRanksTasks() {
    return axios
    .get(API_URL2 + "/donelists2")
    .then(console.log("Data received")
    )
  }
  getUserTasks(id) {
    return axios
    .get(API_URL + `usertasks/${id}`)
    .then(console.log("Data received")
    )
  }
  getTasks(id) {
    return axios
    .get(API_URL + `tasks/${id}`)
    .then(console.log("Data received")
    )
  }
  
  getTasks2(id) {
    return axios
    .get(API_URL + `tasks2/${id}`)
    .then(console.log("Data received")
    )
  }

  getRoles(id) {
    return axios
    .get(API_URL + `roles/${id}`)
    .then(console.log("Data received")
    )
  }
  getAdminById(adminId) {
    return axios
    .get(API_URL + `adminId/${adminId}`)
    .then(console.log("Data received")
    )
  }

  getById(id) {
    return axios
    .get(API_URL + `admin1id/${id}`)
    .then(console.log("Data received")
    )
  }


  getUsers(id) {
    return axios
    .get(API_URL + `admin/${id}`)
    .then(console.log("Data received")
    )
  }

   getUser(id) {
    return axios
    .get(API_URL + `users/${id}`)
    .then(console.log("Data received")
    )
  }

  
  deleteUser(id) {
    return axios.delete(API_URL + `user/${id}`);
  }
 
  
  deleteAdmin(id) {
    return axios.delete(API_URL + `admin/${id}`);
  }
 

  // deleteUser(id) {
  //   return axios.delete(API_URL + "user", {
  //     id
  //   });
  // }
  
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  assignedto(id) {
    return axios
      .post(API_URL +`tasks/${id}`, {
        id
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("task", JSON.stringify(response.data));
        }
        return response.data;
      });
  }


  logout() {
    localStorage.removeItem("user");
  }

  logout1() {
    localStorage.removeItem("admin");
  }

  register(username, email, password, adminId) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      adminId
    });
  }
  

  findByName(username) {
    return axios.get(API_URL + `users?username=${username}`);
  }

  update(id, data) {
    return axios.put(API_URL + `users/${id}`, data);
  }

  
// basicadmin2(id, adminId) {
//   return axios.put(API_URL + `updateadminId/${id}`, adminId);
// }
  

// basicadmin2(id, adminId) {
//   return axios.post(API_URL + "updateadminId", {
//     id,
//     adminId,
//   });
// }

basicadmin2(id, data) {
  return axios.put(API_URL +`updateadminId/${id}`, data);
}

  get(id) {
    return axios.get(API_URL + `tasks/${id}`);
  }

  

  basic(username, first_name, last_name, dob, gender, size, about,type,
    skills,
    resume,
    experience,
    degree,
    institute,
    field,
    start,
    end,
    linkedin,
    hackerrank,
    github,
    stackoverflow,
    number,
    address,
    city,
    country,
    zip) {
    return axios.post(API_URL + "updatebasic", {
      username,
      first_name,
      last_name,
      dob,
      gender,
      size,
      about,
      type,
      skills,
      resume,
      experience,
      degree,
      institute,
      field,
      start,
      end,
      linkedin,
      hackerrank,
      github,
      stackoverflow,
      number,
      address,
      city,
      country,
      zip
    });
  }

  task(task_title, task_description, assigned_to, start_date, deadline, task_status) {
    return axios.post(API_URL + "task", {
      task_title,
      task_description,
      assigned_to,
      start_date,
      deadline,
      task_status
    });
  }

  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

////////////////////////

basic2(username, first_name, last_name, dob, gender, size, about,type,
  skills,
  resume,
  experience,
  degree,
  institute,
  field,
  start,
  end,
  linkedin,
  hackerrank,
  github,
  stackoverflow,
  number,
  address,
  city,
  country,
  zip) {
  return axios.post(API_URL + "updatebasic2", {
    username,
    first_name,
    last_name,
    dob,
    gender,
    size,
    about,
    type,
    skills,
    resume,
    experience,
    degree,
    institute,
    field,
    start,
    end,
    linkedin,
    hackerrank,
    github,
    stackoverflow,
    number,
    address,
    city,
    country,
    zip
  });
}


getAllAdmin() {
  return axios
  .get(API_URL + "admins")
  .then(console.log("Data received")
  )
}

loginAdmin(username, password) {
  return axios
    .post(API_URL + "adminsignin", {
      username,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("admin", JSON.stringify(response.data));
      }

      return response.data;
    });
}


// logoutAdmin() {
//   localStorage.removeItem("admin");
// }

registerAdmin(username, email, password,roles,roleId,adminId) {
  return axios.post(API_URL + "adminsignup", {
    username,
    email,
    password,
    roles,
    roleId,
    adminId
  });
}


findByTitle(title) {
  return axios.get(API_URL2 +`/tasks2?title=${title}`);
}

getAllTasks(params) {
  return axios.get(API_URL2 + "/tasks2", { params });
}

findByNameAdmin(username) {
  return axios.get(API_URL + `admins?username=${username}`);
}

updateAdmin(id, data) {
  return axios.put(API_URL + `admins/${id}`, data);
}

getAdmin(id) {
  return axios.get(API_URL + `admin/${id}`);
}

getAdmin1(adminId) {
  return axios.get(API_URL + `admin2/${adminId}`);
}

getCurrentAdmin() {
  return JSON.parse(localStorage.getItem('admin'));
}

}




export default new AuthService();
