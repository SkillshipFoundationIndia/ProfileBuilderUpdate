import React, { Component } from "react";
import TaskDataService from "../../services/task";
import {
  Button,
} from "reactstrap";
import ParticleComponent from ".././assets/ParticleComponent";
const API = 'http://localhost:8080/api/auth/users';

export default class Task2 extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAssignedto = this.onChangeAssignedto.bind(this);
    this.onChangeStartdate = this.onChangeStartdate.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this); 

   
    this.state = {
      currentTask: {
        user: [],
        currentUsers:null,
        id: null,
        title: "",
        description: "",
        assignedto: "",
        startdate: "",
        deadline: "",
        taskstatus: "",
        published: false
      },
      message: ""
    };
  }

 

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      assignedto: this.state.assignedto,
      startdate: this.state.startdate,
      deadline: this.state.deadline,
      taskstatus: this.state.taskstatus
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


  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }

  onChangeAssignedto(e) {
    const assignedto = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        assignedto: assignedto
      }
    }));
  }

  onChangeStartdate(e) {
    const startdate = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        startdate: startdate
      }
    }));
  }

  onChangeDeadline(e) {
    const deadline = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        deadline: deadline
      }
    }));
  }

  onChangeTaskStatus(e) {
    const taskstatus = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        taskstatus: taskstatus
      }
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.title,
      description: this.state.currentTask.description,
      assignedto: this.state.currentTask.assignedto,
      startdate: this.state.currentTask.startdate,
      deadline: this.state.currentTask.deadline,
      taskstatus: this.state.currentTask.taskstatus,
      published: status
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/admin2')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask, user } = this.state;

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
        {currentTask ? (
          <div className="card">
          <div className=" edit-form ">
            {/* <h4>Task</h4> */}
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text" style={{borderRadius: 0}}
                  className="form-control"
                  id="title"
                  value={currentTask.title}
                  onChange={this.onChangeTitle}
                />
             
                <label htmlFor="description">Description</label>
                <input
                  type="text" style={{borderRadius: 0}}
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
            {/* <label>Assigned To</label>
             
             <select style={{borderRadius: 0}} value={this.state.assignedto}
                      onChange={this.onChangeAssignedto}
                      style={{color:"black"}} class="form-control" placeholder="Select">
             <option > Select</option> */}
             {/* {this.state.user.map(data=> (
            <option
              key={data.id}
              value={data.first_name + data.last_name}
            >
           {data.first_name}{" "}{data.last_name}
            </option>
          ))} */}
          
   {/* </select> */}
              <label htmlFor="startdate">Start Date</label>
              <input
                type="date" style={{borderRadius: 0}}
                className="form-control"
                id="startdate"
                value={currentTask.startdate}
                onChange={this.onChangeStartdate}
              />
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date" style={{borderRadius: 0}}
                className="form-control"
                id="deadline"
                value={currentTask.deadline}
                onChange={this.onChangeDeadline}
              />
               <label>Task Status</label>
                                      <select style={{borderRadius: 0}} value={this.state.taskstatus}
                onChange={this.onChangeTaskStatus} class="form-control" placeholder="Status">
                                      <option >Status</option>
                                        <option>To Do</option>
                                        <option>In Progress</option>
                                        <option>Done</option>
                                      </select>
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTask.published ? "Published" : "Pending"}
              </div>
            </form>

            {/* {currentTask.published ? (
              <button
                className="btn btn-amber mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )} */}
               <Button
           className="btn btn-sm"
           color="btn btn-success accent-3"
           type="submit"
           onClick={this.updateTask}
           >
          <span style={{color:"white"}}>Update</span>
          
        </Button> 
               <Button
           className="btn btn-sm"
           color="btn btn-danger accent-3"
           type="submit"
           onClick={this.deleteTask}
           >
          <span style={{color:"white"}}>Delete</span>
          
        </Button> 
        <Button
           className="btn btn-sm"
           color="btn btn-elegant"
           type="submit"
          href="\admin2"
           >
          <span style={{color:"white"}}>Go Back</span>
        </Button>
    
     

            {/* <button
              className="btn btn-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateTask}
            >
              Update
            </button> */}
            <p>{this.state.message}</p>
          </div></div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div></div>
    );
  }
}
