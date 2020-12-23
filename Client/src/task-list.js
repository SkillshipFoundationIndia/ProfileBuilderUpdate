import React, { Component } from "react";
import TaskDataService from "../services/task";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css"
import {Container, Row, Col } from "react-bootstrap";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
} from "reactstrap";

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    
    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTasks();
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
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }

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
  
  

  render() {
    const { searchTitle, tasks, currentTask, currentIndex } = this.state;

    return (
      <div>
      <div className="list row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <div class="input-group">
            <input type="text" class="form-control" placeholder="Search Task" aria-label="Search Task"
              aria-describedby="button-addon4" value={searchTitle}
              onChange={this.onChangeSearchTitle}/>
            <div class="input-group-append" id="button-addon4">
              <button class="btn btn-md btn-elegant m-0 px-3 py-2 z-depth-0 waves-effect" onClick={this.searchTitle} onChange={this.onChangeSearchTitle} type="button"> <span style={{color:"white"}}>Search</span></button>
              
            </div>
            
               </div>
               
          </div>
          
        </div>
        </div>
        <div className="list row">
        <div className="col-md-4"> </div>
          <div  className="col-md-5">
          {/* <a>Add new task</a>
        <Button
           className="btn btn-sm"
           color="btn btn-elegant accent-3"
           type="submit"
           href="/add"
           >
          <span style={{color:"white"}}>Add task</span>
        </Button>  */}
        </div>
             
        </div>
        <div className="list row">

        <div className="col-md-6">
          <h4>Tasks List</h4>
          <Button
           className="btn btn-sm"
           color="btn btn-primary accent-3"
           type="submit"
           href="/add"
           >
          <span style={{color:"white"}}>Add task</span>
        </Button> 

          <ul className="list-group">
            {tasks &&
              tasks.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.title}
                </li>
              ))}
          </ul>
{/* 
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Remove All
          </button> */}
          {/* <Link to='/add'>
          <button
            className="m-3 btn btn-sm btn-danger"
          >
            Add Task
          </button>
        </Link> */}
          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Add Task
          </button> */}
        </div>
        <div className="card col-md-6">
          {currentTask ? (
            <div>
              <h4>Task</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTask.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
              <div>
                <label>
                  <strong>Assigned To:</strong>
                </label>{" "}
                {currentTask.assignedto}
              </div>
              <div>
                <label>
                  <strong>Start Date:</strong>
                </label>{" "}
                {currentTask.startdate}
              </div>
              <div>
                <label>
                  <strong>Deadline:</strong>
                </label>{" "}
                {currentTask.deadline}
              </div>
              <div>
                <label>
                  <strong>Task Status:</strong>
                </label>{" "}
                {currentTask.taskstatus}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTask.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tasks/" + currentTask.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Task...</p>
            </div>
          )}
        </div>
      </div></div>
    );
  }
}
