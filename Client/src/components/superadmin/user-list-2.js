import React, { Component } from "react";
import AuthService from "../../services/auth.service"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/demo/demo.css"
import {Container, Row, Col } from "react-bootstrap";
import Lottie from 'react-lottie';
import animationData from '../lotties/list2';
import {
  Button,
} from "reactstrap";
import UserService from "../../services/user.service";

export default class UserList22 extends Component {
  constructor(props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.getAdmin1 = this.getAdmin1.bind(this);
    this.state = {
      id: null,
      users: [],
      currentUser: null,
      username:"",
    //   curUser: "" ,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.getAdmin1(this.props.match.params.id);
    const currentAdmin = this.props.match.params.id;

    if (!currentAdmin) this.setState({ redirect: "/adminlogin" });
    this.setState({ currentAdmin: currentAdmin, userReady: true })

    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data,
          adminId: currentAdmin.id
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


  getAdmin1() {
    const { curUser,list} = this.state;
    AuthService.getById(this.props.match.params.id)
      .then(response => {
        this.setState({
          curUser : response.data,
        //   curUser1: curUser.username
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveUsers() {
    const currentAdmin = AuthService.getCurrentAdmin();

    if (!currentAdmin) this.setState({ redirect: "/adminlogin" });
    const { id} = this.state;
    this.setState({ currentAdmin: currentAdmin.id, id:currentAdmin.id, userReady: true })
    AuthService.getUsers(this.props.match.params.id)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data.username);
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

  setActiveUser(data, index) {
    this.setState({
      currentUser: data,
      currentIndex: index
    });
  }


  
  

  render() {
    const { searchTitle, users, currentUser,currentAdmin, curUser,currentIndex } = this.state;
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
        <div className="col-md-8 mt-5">
          <div className="input-group mb-3">
           
               
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
   <h4>City Heads under <strong><u>{users.username}</u></strong></h4>
          <Button
           className="btn btn-sm"
           color="btn btn-elegant accent-3"
           type="submit"
           href={"/admin22"}
           >
          <span style={{color:"white"}}>Assign City Head</span>
        </Button> 
        <Button
           className="btn btn-sm"
           color="btn btn-danger"
           type="submit"
          href="\superadmin"
           >
          <span style={{color:""}}>Go Back</span>
        </Button>
    
        <ul className="list-group list-group-horizontal-lg">
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

     
{/* 
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllusers}
          >
            Remove All
          </button> */}
          {/* <Link to='/add'>
          <button
            className="m-3 btn btn-sm btn-danger"
          >
            Add user
          </button>
        </Link> */}
          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllusers}
          >
            Add user
          </button> */}
        </div>
       </div></div>
    );
  }
}


