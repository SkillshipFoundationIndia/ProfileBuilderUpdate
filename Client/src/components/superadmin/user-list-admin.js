import React, { Component } from "react";
import AuthService from "../../services/auth.service"
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/demo/demo.css"
import {Container, Row, Col } from "react-bootstrap";
import {
  Button,
} from "reactstrap";
import Lottie from 'react-lottie';
import animationData from '../lotties/ceo';
import Pagination from "@material-ui/lab/Pagination";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchTitle: "",
    
      page: 1,
      count: 0,
      pageSize: 6,
    };
    this.pageSizes = [6, 9 ,12];
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


  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveUsers() {
    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);

    AuthService.AllUsers(params)
    .then((response) => {
      const { users, totalPages } = response.data;

      this.setState({
        users: users,
        count: totalPages,
      });
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
}



handlePageChange(event, value) {
  this.setState(
    {
      page: value,
    },
    () => {
      this.retrieveUsers();
    }
  );
}

handlePageSizeChange(event) {
  this.setState(
    {
      pageSize: event.target.value,
      page: 1
    },
    () => {
      this.retrieveUsers();
    }
  );
}

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
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
    const { searchTitle, users, currentUser, currentIndex, page,count,pageSize } = this.state;
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
            <div class="input-group">
            <input type="text" class="form-control" placeholder="Search Campus CEO" aria-label="Search User"
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
          {/* <Button
           className="btn btn-sm"
           color="btn btn-elegant accent-3"
           type="submit"
           href="\adduser"
           >
          <span style={{color:"white"}}>Add User</span>
        </Button>  */}
  <select className="btn btn-elegant text-white"   onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option className=""  key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.username}
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
            color="btn btn-elegant text-white  darken-3"
            type="submit"
            href={"/userprofile/" + currentUser.id}>
        <i class="fas fa-user"> </i> View Profile
        </Button>
                <Button
           className="btn btn-sm"
               color="btn btn-danger accent-3"
           type="submit"
           href={"/removeuser/" + currentUser.id}
           >
          <span style={{color:"white"}}><i class="fas fa-trash"> </i> </span>
        </Button> </Col>
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


