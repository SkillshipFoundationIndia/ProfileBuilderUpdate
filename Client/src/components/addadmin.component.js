import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import logo from '../img/logo1.png';
import {Container, Row, Col } from "react-bootstrap";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
} from "reactstrap";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import ParticleComponent from "./assets/ParticleComponent";

const API = 'http://localhost:8080/api/auth/admin1';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRoles = this.onChangeRoles.bind(this);
    this.onChangeAssignedto = this.onChangeAssignedto.bind(this);

    this.state = {
      username: "",
      adminId: 1,
      email: "",
      password: "",
      roleId:"",
      roles:[],
      users: [],
      successful: false,
      message: ""
    };
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeRoles(e) {
    this.setState({
      roles: [e.target.value]
    });
    if(e.target.value=='superadmin'){
      this.setState({
        roleId: 1
      });
    }
    if(e.target.value=='admin'){
      this.setState({
        roleId: 2
      });
    }
    if(e.target.value=='admin2'){
      this.setState({
        roleId: 3
      });
    }
  }

  onChangeAssignedto(e){ 
    this.setState(
      {
        adminId: 1
      }
    );
  }

  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({ users: data }));
    const currentUser = AuthService.getCurrentAdmin();

    if (!currentUser) this.setState({ redirect: "/adminlogin" });
    this.setState({ currentUser: currentUser, userReady: true })

    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
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
  }
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.registerAdmin(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.roles,
        this.state.roleId,
        this.state.adminId,
       
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }


  render() {
    const {users,currentIndex,data } = this.state;

    return (
    <Container>
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
    <div className="row">
    <div className="col-md-4"></div>
    <div className="col-md-4">   <div className="" style={{borderRadius: 5 ,width: "405px", align:"center"}}>
        <div className=" pt-5 p-3 my-3 view overlay zoom">
          {/* <h3 className="text-center">Sign Up</h3> */}
          <img src={logo} class="img-fluid mx-auto d-block" height="150" width="150" alt="Responsive image"/>
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                    <div className="form-group">
                <select   style={{borderRadius: 4 ,width: "370px"}} value={this.state.roles}
                onChange={this.onChangeRoles} class="form-control" placeholder="Status">
                                      <option>Role</option>
                                      {/* <option >superadmin</option> */}
                                        <option >admin</option>
                                        {/* <option>admin2</option> */}
                              
                                      </select>
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    style={{borderRadius: 4 ,width: "370px"}}
                    className="form-control"
                    name="username"
                     placeholder="Username"
                    required
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <Input
                    type="text"
                    style={{borderRadius: 4 ,width: "370px"}}
                    placeholder="Email"
                    required
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  {/* <label htmlFor="password">Password</label> */}
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    style={{borderRadius: 4 ,width: "370px"}}
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div> 

                {/* <div className="form-group" hidden>
                <select style={{borderRadius: 0}} value={this.state.adminId}
                             onChange={this.onChangeAssignedto}
                             style={{color:"black"}} class="form-control" placeholder="Select">
                    <option > Under Admin?</option>
            {this.state.users.map(data=> (
            <option
              key={data.id}
              value={data.id}
            >
           {data.username}
            </option>
          ))}
          </select>
                </div> */}
            
                      
                <div className="form-group">
                 <Button
           className="btn btn-sm"
           color="btn btn-success"
           type="submit"
           >
          <span style={{color:"white"}}>Add</span>
        </Button>
        <Button
           className="btn btn-sm"
           color="btn btn-elegant"
           type="submit"
          href="\superadmin"
           >
          <span style={{color:"white"}}>Go Back</span>
        </Button>
                </div>
               
                {/* <Button
                          className="btn btn-elegant"
                          type="submit"
                          href="/login"
                          style={{color:"white", borderRadius: 0}}
                        >
                           Login
                        </Button> */}
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                ><div className="form-group">
               
                  {this.state.message}
                </div>
                
              </div>
              <Button
                          className="btn btn-block"
                          color="btn mdb-color darken-3"
                          type="submit"
                          href="/superadmin"
                        >
                          <span style={{color:"white"}}>go back</span>
                          
                        </Button>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div></div>
      <div className="col-md-4"></div>
      </div></Container>
    );
  }
}
