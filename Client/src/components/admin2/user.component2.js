import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./../assets/demo/demo.css"
import MultiImageInput from 'react-multiple-image-input';
import {Container} from "react-bootstrap";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import TaskDataService2 from "../../services/task2";
import Popup from 'reactjs-popup';
import Proof from './../proof'
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
  Row,
  Col,
} from "reactstrap";
const Loading =()=>
  <div className="loading1">
    <div></div>
    <div></div>
  </div>  
const TaskComplete = () => (
  <Popup trigger={<button className="btn  btn-success darken-4 btn-sm"> Task Complete</button>}  modal  nested>
    <div>
      <div className="text-center mt-5">
      <h3 id='title' className="mt-5">Upload Some Proof</h3>
      </div>
      <Proof />
      <div className="text-right">
      <button className="btn btn-success mt-3 btn-sm align-right text-white btn-sm">Submit</button></div>
      </div>

  </Popup>
);
const ChangeStatus = () => (
  <Popup custom trigger={<button className="btn btn-elegant text-white btn-sm"> Change Status</button>} position="bottom center">
    <div>
    <label>Task Status</label>
                                      <select style={{borderRadius: 0}} class="form-control" placeholder="Status">
                                      <option>Status</option>
                                        <option>To Do</option>
                                        <option>In Progress</option>
                                        <option>Done</option>
                                      </select>
                                      <button className="btn btn-elegant mt-3 btn-block text-white btn-sm">Change</button>
      </div>

  </Popup>
);



export default class BoardUser2 extends Component {
  constructor(props) {
    super(props);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      redirect: null,
      userReady: false,
      loading: true,

      // currentUser: { first_name: "" }
    };
   
  }


  
  componentDidMount() {
    this.isLoading = setTimeout(()=>{this.setState({loading: false})}, 2300);

    this.retrieveTasks();
    const currentUser = AuthService.getCurrentAdmin();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser.id, userReady: true })
    // this.assignedto(this.state.currentUser);
  }

  // retrieveTasks() {
  //   TaskDataService.get_assignedto()
  //     .then(response => {
  //       this.setState({
  //         tasks: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }
  setActiveTask(data, index) {
    this.setState({
      currentTask: data,
      currentIndex: index
    });
  }
  getTask(id) {
    AuthService.get(id)
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

  retrieveTasks() {
    const currentUser = AuthService.getCurrentAdmin();

    if (!currentUser) this.setState({ redirect: "/adminlogin" });
    const { id} = this.state;
    this.setState({ currentUser: currentUser.id, id:currentUser.id, userReady: true })
    TaskDataService2.getTasks()
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

    const {searchTitle, tasks,data, currentTask,currentUser, currentIndex, page, count, pageSize  } = this.state;
 
    return (
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
          <h4>Assigned Tasks</h4>
         
          <ul className="list-group">
          {tasks.data &&
              tasks.data.map((data, index) => {
                if(currentUser == data.adminId2)
                return (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTask(data, index)}
                  key={index}
                >
                  {data.title}
                </li>
                )})}
          </ul>
        </div>
        <div className="container pt-5 p-3 my-3 border col-md-6">
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
           href={"/taskadmin2/" + currentTask.id}
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
              <p>Please click on a Task...</p>
            </div>
          )}
        </div>
      </div></div>)
    );
  }
}

