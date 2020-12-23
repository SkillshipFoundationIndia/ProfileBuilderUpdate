import React, { Component } from "react";
import AuthService from "../../services/auth.service"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/demo/demo.css"
import {Container, Row, Col } from "react-bootstrap";
import {
  Button,
} from "reactstrap";
import UserService from "../../services/user.service";
import Lottie from 'react-lottie';
import animationData from '../lotties/ceo';

export default class UserList2 extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    const currentAdmin = AuthService.getCurrentAdmin();

    if (!currentAdmin) this.setState({ redirect: "/adminlogin" });
    this.setState({ currentAdmin: currentAdmin, id:currentAdmin.id, userReady: true })

    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data,
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    this.retrieveUsers();
  }

  

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
 
    this.setState({
      searchTitle: searchTitle
    });
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

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(users, index) {
    this.setState({
      currentUser: users,
      currentIndex: index
    });
  }


  searchTitle() {
    AuthService.findByName(this.state.searchTitle)
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
  
  

  render() {
    const { searchTitle, users, currentUser, currentIndex } = this.state;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div className="mt-5">
      <div className="list row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
        <div className="input-group mb-3">
            {/* <div class="input-group">
            <input type="text" class="form-control" placeholder="Search User" aria-label="Search User"
              aria-describedby="button-addon4" value={searchTitle}
              onChange={this.onChangeSearchTitle}/>
            <div class="input-group-append" id="button-addon4">
              <button class="btn btn-md btn-elegant m-0 px-3 py-2 z-depth-0 waves-effect" onClick={this.searchTitle} type="button"> <span style={{color:"white"}}>Search</span></button>
              
            </div>
            
               </div>
                */}
          </div>
          
        </div>
        </div>
        <div className="list row">
        <div className="col-md-4"> </div>
          <div  className="col-md-5">
          {/* <a>Add new User</a>
        <Button
           className="btn btn-sm"
           color="btn btn-elegant accent-3"
           type="submit"
           href="/add"
           >
          <span style={{color:"white"}}>Add User</span>
        </Button>  */}
        </div>
             
        </div>
        <div className="list row">

        <div className="col-md-6">
          <h4>Campus CEO</h4>
          <Button
           className="btn btn-sm"
           color="btn btn-elegant accent-3"
           type="submit"
           href="\adduser"
           >
          <span style={{color:"white"}}>Add Campus CEO</span>
        </Button> 

          <ul className="list-group">
            {users.users &&
              users.users.map((users, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(users, index)}
                  key={index}
                >
                  {users.username}
                </li>
              ))}
          </ul>
        </div>
        <div className="card col-md-6">
          {currentUser ? (
            <div>
              {/* <h4>user</h4> */}
             
              <div>
                {/* <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentuser.title} */}
                
                <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Username</span></button>
        </div>
        <input type="text" class="form-control" placeholder=
                {currentUser.username} aria-label="Example text with button addon"
          aria-describedby="button-addon1"/>
      </div>
              </div>
              <div>
              <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}> First Name</span></button>
        </div>
        <input type="text" class="form-control" placeholder= {currentUser.first_name}
                aria-label="Example text with button addon"
          aria-describedby="button-addon1"/>
      </div>
                {/* <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentUser.description} */}
              </div>
              <div>
              <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Last Name</span></button>
        </div>
        <input type="text" class="form-control" placeholder=
                {currentUser.last_name} aria-label="Example text with button addon"
          aria-describedby="button-addon1"/>
      </div>
                {/* <label>
                  <strong>Assigned To:</strong>
                </label>{" "}
                {currentUser.assignedto} */}
              </div>
              <div>
              <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Email</span></button>
        </div>
        <input type="text" class="form-control" placeholder=
                {currentUser.email} aria-label="Example text with button addon"
          aria-describedby="button-addon1"/>
      </div>
                {/* <label>
                  <strong>Start Date:</strong>
                </label>{" "}
                {currentUser.startdate} */}
              </div>
              <div>
              <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>Gender</span></button>
        </div>
        <input type="text" class="form-control" placeholder=
                {currentUser.gender} aria-label="Example text with button addon"
          aria-describedby="button-addon1"/>
      </div>
                {/* <label>
                  <strong>Deadline:</strong>
                </label>{" "}
                {currentUser.deadline} */}
              </div>
              <div>
              <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-elegant btn-md white m-0 px-3 py-2 z-depth-0 waves-effect" type="button" id=""><span style={{color:"white"}}>DOB</span></button>
        </div>
        <input type="text" class="form-control" placeholder=
                {currentUser.dob} aria-label="Example text with button addon"
          aria-describedby="button-addon1"/>
      </div>
                {/* <label>
                  <strong>user Status:</strong>
                </label>{" "}
                {currentUser.Userstatus} */}
              </div>
              
              <Row>
                
              <Col className="text-right">
                <Button
            className="btn btn-sm"
            color="btn btn-elegant accent-3"
            type="submit"
            href={"/givetask3/" + currentUser.id}>
             <span style={{color:"white"}}><i class="fas fa-tasks"> </i> Assign Task</span>
        </Button>
        <Button
            className="btn btn-sm"
            color="btn btn-outline-danger     darken-3"
            type="submit"
            href={"/userprofile/" + currentUser.id}>
          <span ><i class="fas fa-user"> </i> View Profile</span>
        </Button>
                <Button
           className="btn btn-sm"
           color="btn btn-danger accent-3"
           type="submit"
           href={"/removeuser2/" + currentUser.id}
           >
          <span style={{color:"white"}}><i class="fas fa-trash"> </i> </span>
        </Button>  </Col>
        </Row>
              {/* <Link
                to={"/users/" + currentuser.id}
                className="btn text-right btn-warning"
              >
                Edit
              </Link> */}
            </div>
          ) : (
            <div>
                <br />
              {/* <p>Please click on a User...</p> */}
              <Lottie 
              options={defaultOptions}
                height='auto'
                width='auto'/>
            </div>
          )}
        </div>
      </div></div>
    );
  }
}


