import http from "../http-common";

class TaskDataService2 {
  getAll(params) {
    return http.get("/tasks2", { params });
  }

  getTasks() {
    return http.get("/lists2");
  }

  get_assignedto(username) {
    return http.get("/tasks2/userId",{
      username
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("task", JSON.stringify(response.data));
      }
      return response.data;

    });
  }

  get(adminId) {
    return http.get(`/taskss/${adminId}`);
  }

  // get(adminId) {
  //   return http.get(`/tasks/${adminId}`);
  // }
  
  getTasks(adminId) {
    return http.get(`/tasks2/${adminId}`);
  }


  
  create(data) {
    return http.post("/tasks2", data);
  }
  
  // registerAdmin(username, email, password,roles,adminId) {
  //   return axios.post(API_URL + "adminsignup", {
  //     username,
  //     email,
  //     password,
  //     roles,
  //     adminId
  //   });
  // }

  update(id, data) {
    return http.put(`/tasks2/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks2/${id}`);
  }

  deleteAll() {
    return http.delete(`/tasks2`);
  }

  findByTitle(title) {
    return http.get(`/tasks2?title=${title}`);
  }
}

export default new TaskDataService2();