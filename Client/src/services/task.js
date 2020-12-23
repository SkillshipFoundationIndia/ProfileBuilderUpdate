import http from "../http-common";

class TaskDataService {
  getAll(params) {
    return http.get("/tasks", { params });
  }

  getTasks() {
    return http.get("/lists");
  }

  getTasksDone() {
    return http.get("/tasksdone");
  }

  get_assignedto(username) {
    return http.get("/tasks/userId",{
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
    return http.get(`/tasks/${adminId}`);
  }
  
  create(data) {
    return http.post("/tasks", data);
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
    return http.put(`/tasks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }

  deleteAll() {
    return http.delete(`/tasks`);
  }

  findByTitle(title) {
    return http.get(`/tasks?title=${title}`);
  }
}

export default new TaskDataService();