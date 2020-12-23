import React, { Component } from "react";
import TaskDataService from "../../services/task";
import AuthService from "../../services/auth.service";
import "bootstrap/dist/css/bootstrap.css";
import ParticleComponent from ".././assets/ParticleComponent";
import "../assets/demo/demo.css"
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
} from "reactstrap";
import {Container, Row, Col } from "react-bootstrap";
const API = 'http://localhost:8080/api/auth/admins/:id';

export default class AddTask2 extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAssignedto = this.onChangeAssignedto.bind(this);
    this.onChangeStartdate = this.onChangeStartdate.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);

    this.state = {
      currentUsers:null,
            users: [],
            roles:[],
      id: null,
      title: "",
      description: "", 
      assignedto: "",
      startdate: "",
      deadline: "",
      taskstatus: "",
      published: false,

      submitted: false
    };
  }

 
 


  componentDidMount() {
    this.retrieveUsers();
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
  }
  
  retrieveUsers() {
    const currentAdmin = AuthService.getCurrentAdmin();

    if (!currentAdmin) this.setState({ redirect: "/adminlogin" });
    const { id} = this.state;
    this.setState({ currentAdmin: currentAdmin.id, id:currentAdmin.id, userReady: true })
    AuthService.getUsers(currentAdmin.id)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  

  onChangeAssignedto(e){ 
    this.setState(
      {
        assignedto: e.target.value
      }
    );
  }

 

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  
  // onChangeAssignedto(e) {
  //   this.setState({
  //     assignedto: e.target.value
  //   });
  // }


  onChangeStartdate(e) {
    this.setState({
      startdate: e.target.value
    });
  }

  onChangeDeadline(e) {
    this.setState({
      deadline: e.target.value
    });
  }

  onChangeTaskStatus(e) {
    this.setState({
      taskstatus: e.target.value
    });
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }



  retrieveTasks() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentUsers: null,
      currentIndex: -1
    });
  }

  
  // onChangeAssignedto(e){
  //   this.setState({assignedto:e.target.value});
  // }
  // onChangeAssignedto(e) {
  //   this.setState({
  //     assignedto: e.target.value
  //   });
  // }



  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TaskDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  saveTask() {
    const currentUser = AuthService.getCurrentAdmin();

    if (!currentUser) this.setState({ redirect: "/adminlogin" });
    this.setState({ currentUser: currentUser, userReady: true })
    var data = {
      title: this.state.title,
      description: this.state.description,
      assignedto: this.state.assignedto,
      startdate: this.state.startdate,
      deadline: this.state.deadline,
      taskstatus: this.state.taskstatus,
      adminId:currentUser.id
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          assignedto: response.data.assignedto,
          startdate: response.data.startdate,
          startdate: response.data.startdate,
          deadline: response.data.deadline,
          taskstatus: response.data.taskstatus,
          published: response.data.published,
          adminId:response.data.adminId,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  

  newTask() {
    this.setState({
      id: null,
      title: "",
      description: "",
      assignedto: "",
      startdate: "",
      deadline: "",
      taskstatus: "",
      published: false,

      submitted: false
    });
  }

  render() {
    const {users,currentIndex,data } = this.state;
    return (
      <div className= "row">
          <ParticleComponent />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        ></div> 

         <div className="col-md-3"> </div>
         <div className="col-md-6">

      <div className="card submit-form">
        {this.state.submitted ? (
          <div>
            <h3  className="text-center">Task Assigned</h3>
            {/* <button className="btn btn-success" onClick={this.newTask}>
              Add
            </button> */}
            <Button
                          className="btn btn-sm btn-block"
                          color="btn btn-dark"
                          type="submit"
                          href="/admin2"
                        >
                          <span style={{color:"white"}}>View</span>
                          
                        </Button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                style={{borderRadius: 0}}
                placeholder="Title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
           
              <label htmlFor="description">Description</label>
              <textarea
                type="textarea"
                className="form-control"
                id="description"
                placeholder="Description"
                required
                style={{borderRadius: 0}}
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            
              {/* <label htmlFor="assignedto">Assigned To</label>
              <input
                type="text"
                className="form-control"
                id="assignedto"
                required
                style={{borderRadius: 0}}
                
                //   key={index}
                value={this.state.assignedto}
                onChange={this.onChangeAssignedto}
                name="assignedto"
              /> */}

              <label>Assigned To</label>
             
                    <select style={{borderRadius: 0}} value={this.state.assignedto}
                             onChange={this.onChangeAssignedto}
                             style={{color:"black"}} class="form-control" placeholder="Select">
                    <option > Select</option>
            {users.users &&
              users.users.map(users=> (
            <option
              key={users.id}
              value={users.id}
            >
           {users.username}
            </option>
          ))}
          </select>
      
                                      {/* <ul className="list-group">
            {users &&
              users.map((data, user) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.onChangeAssignedto(user)}
                  key={user}
                >
                   {data.username}
                </li>
              ))}
          </ul> */}


            
              <label htmlFor="startdate">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startdate"
                required
                style={{borderRadius: 0}}
                value={this.state.startdate}
                onChange={this.onChangeStartdate}
                name="startdate"
              />
         
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                className="form-control"
                id="deadline"
                style={{borderRadius: 0}}
                required
                value={this.state.deadline}
                onChange={this.onChangeDeadline}
                name="deadline"
              />
        
              {/* <label htmlFor="taskstatus">Task Status</label>
              <input
              style={{borderRadius: 0}}
                type="text"
                className="form-control"
                id="taskstatus"
                required
                value={this.state.taskstatus}
                onChange={this.onChangeTaskStatus}
                name="taskstatus"
              /> */}
               {/* <div class="form-group"> */}
                                      <label>Task Status</label>
                                      <select style={{borderRadius: 0}} value={this.state.taskstatus}
                onChange={this.onChangeTaskStatus} class="form-control" placeholder="Status">
                                      <option>Status</option>
                                        <option>To Do</option>
                                        <option>In Progress</option>
                                        <option>Done</option>
                                      </select>
                                      {/* </div> */}


            </div>

            {/* <button onClick={this.saveTask} className="btn btn-success">
              Submit
            </button> */}
            <Button
           className="btn btn-sm"
           color="btn btn-success"
           type="submit"
           onClick={this.saveTask}
           >
          <span style={{color:"white"}}>Add</span>
        </Button>
        <Button
           className="btn btn-sm"
           color="btn btn-elegant"
           type="submit"
          href="/admin2"
           >
          <span style={{color:"white"}}>Go Back</span>
        </Button>
    
          </div>
        )}
      </div></div> </div>
    );
  }
}
