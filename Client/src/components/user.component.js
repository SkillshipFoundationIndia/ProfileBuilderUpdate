import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css"
import TaskDataService from "../services/task";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import AuthService from "../services/auth.service";
import Pagination from "@material-ui/lab/Pagination";
import {Container, Row, Col } from "react-bootstrap";
import MultiImageInput from 'react-multiple-image-input';
import UserService from "../services/user.service";
import Popup from 'reactjs-popup';
import Lottie from 'react-lottie';
import animationData from './lotties/list';
import Proof from './proof'
import {
  Button

} from "reactstrap";
const Loading =()=>
  <div className="loading1">
    <div></div>
    <div></div>
  </div>  


export default class BoardAdmin2 extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.state = {
      user:[],
      tasks: [],
      currentUsers:null,
      currentTask: null,
      currentIndex: -1,
      searchTitle: "",
      page: 1,
      count: 0,
      pageSize: 3,
      loading: true,

    };
    this.pageSizes = [3, 6, 9];
  }

  
  componentDidMount() {
    this.isLoading = setTimeout(()=>{this.setState({loading: false})}, 2300);

    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser.id, userReady: true })
    // this.assignedto(this.state.currentUser);
    this.retrieveTasks();
    fetch('http://localhost:8080/api/auth/users')
    .then(response => response.json())
    .then(data => this.setState({ user: data }));
 
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
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

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveTasks();
      }
    );
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

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveTasks();
      }
    );
  }
  getRequestParams(searchTitle, page, pageSize) {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }
  retrieveTasks() {
    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);

    TaskDataService.getAll(params)
    .then((response) => {
      const { tasks, totalPages } = response.data;

      this.setState({
        tasks: tasks,
        count: totalPages,
      });
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
}


  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveUsers() {
    AuthService.getAll()
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

  retrieveTasks() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/adminlogin" });
    const { id} = this.state;
    this.setState({ currentUser: currentUser.id, id:currentUser.id, userReady: true })
    AuthService.getUserTasks(currentUser.id)
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
  
  componentWillUnmount() {
    clearTimeout(this.isLoading);
  }
  
  timer = () => setTimeout(()=>{
  this.setState({loading: false})
  }, 2300);
  


  render() {
    const {loading} = this.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    const {searchTitle, tasks, currentTask, currentIndex, page, count, pageSize  } = this.state;
 return(
  loading ?(<Loading/>):(
    <div>
    <div className="list row mt-5">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <div class="input-group mt-5">
          <input type="text" className=" form-control" placeholder="Search Task" aria-label="Search Task"
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
       
       {/* {"Items per Page: "} */}
       {/* <select className="btn btn-elegant text-white"   onChange={this.handlePageSizeChange} value={pageSize}>
            {this.pageSizes.map((size) => (
              <option className=""  key={size} value={size}>
                {size}
              </option>
            ))}
          </select> */}

          <ul className="list-group">
          {tasks.tasks &&
            tasks.tasks.map((tasks, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveTask(tasks, index)}
                key={index}
              >
                {tasks.title}
              </li>
            ))}
        </ul>
        <div className="text-center inline mt-4">
         
         <Pagination
           className="inline"
           count={count}
           page={page}
           siblingCount={1}
           color="primary" 
           boundaryCount={1}
         
           shape="rounded"
           onChange={this.handlePageChange}
         />
       </div>
        

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
      <div className="card  col-md-6">
        {currentTask ? (
          <div>
            {/* <h4>Task</h4> */}
           
            <div>
              {/* <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTask.title} */}
              <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Task Title</span></button>
      </div>
      <input type="text" class="form-control" placeholder=
              {currentTask.title} aria-label="Example text with button addon"
        aria-describedby="button-addon1"/>
    </div>
            </div>
            <div>
            <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}> Description</span></button>
      </div>
      <input type="text" class="form-control" placeholder=
              {currentTask.description} aria-label="Example text with button addon"
        aria-describedby="button-addon1"/>
    </div>
              {/* <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTask.description} */}
            </div>
            <div>
            <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Assigned To</span></button>
      </div>
      <input type="text" class="form-control" placeholder=
              {currentTask.assignedto} aria-label="Example text with button addon"
        aria-describedby="button-addon1"/>
    </div>
              {/* <label>
                <strong>Assigned To:</strong>
              </label>{" "}
              {currentTask.assignedto} */}
            </div>
            <div className="row">
            <div class="input-group mb-3 col-6">
      <div class="input-group-prepend">
        <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Start Date</span></button>
      </div>
      <input type="text" class="form-control" placeholder=
              {currentTask.startdate} aria-label="Example text with button addon"
        aria-describedby="button-addon1"/>
    </div>
              {/* <label>
                <strong>Start Date:</strong>
              </label>{" "}
              {currentTask.startdate} */}
           
            <div class="input-group mb-3 col-6">
      <div class="input-group-prepend">
        <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Deadline</span></button>
      </div>
      <input type="text" class="form-control" disabled placeholder=
              {currentTask.deadline} style={{color:"black"}} aria-label="Example text with button addon"
        aria-describedby="button-addon1"/>
    </div>
              {/* <label>
                <strong>Deadline:</strong>
              </label>{" "}
              {currentTask.deadline} */}
            </div>
            <div className="row">
              <div className="col-6">
            <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Task Status</span></button>
      </div>
      <input type="text" class="form-control" placeholder=
              {currentTask.taskstatus} aria-label="Example text with button addon"
        aria-describedby="button-addon1"/>
    </div>
              {/* <label>
                <strong>Task Status:</strong>
              </label>{" "}
              {currentTask.taskstatus} */}
            </div>
            <div className="col-6">
            <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Status</span></button>
      </div>
      <input type="text" class="form-control" placeholder=
               {currentTask.published ? "Published" : "Pending"} aria-label="Example text with button addon"
        aria-describedby="button-addon1"/>
    </div>
              {/* <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTask.published ? "Published" : "Pending"} */}
            </div></div>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
            <Button
         className="btn btn-sm"
         color="btn btn-mdb-color darken-4"
         type="submit"
         href={"/usertasks/" + currentTask.id}
         >
        <span style={{color:"white"}}>Update Status</span>
      </Button>  <div className="text-right">
            {/* <ChangeStatus />
               
            <TaskComplete /> */}
            </div>
               </Col>
      </Row>
            {/* <Link
              to={"/tasks/" + currentTask.id}
              className="btn text-right btn-warning"
            >
              Edit
            </Link> */}
          </div>
        ) : (
          <div>
            <br />
            {/* <p>Please click on a Task...</p> */}
            <Lottie 
              options={defaultOptions}
                height='auto'
                width='auto'/>
            
          </div>
        )}
      </div>
    </div></div>)
  );
}
}