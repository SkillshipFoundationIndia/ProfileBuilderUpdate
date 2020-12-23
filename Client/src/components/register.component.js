import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import logo from '../img/logo.png';
import { MDBBtn, MDBIcon  } from "mdbreact";
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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      roles:[],
      successful: false,
      message: ""
    };
  }

  onChangeRole(e) {
    this.setState({
      roles: e.target.value
    });
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

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
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
    return (
    <Container>
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
                <div className="form-group">
                <select   style={{borderRadius: 4 ,width: "370px"}} value={this.state.roles}
                onChange={this.onChangeRole} class="form-control" placeholder="Status">
                                      <option>Role</option>
                                        <option>moderator</option>
                                        <option>admin</option>
                                        <option>user</option>
                                      </select>
                </div>
                                    
                <div className="form-group">
                  <button  style={{
                 borderRadius: 4 ,width: "370px",
                  backgroundColor: "#1c2a48 ",
              }} className="btn btn-block"><span style={{color:"white"}}>Sign Up</span> </button>
                </div>
                <div class="text-center custom-control custom-checkbox">
                {/* <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember" />
                <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label> */}
                <a  className="text-center "
                          style={{color:"black", borderRadius: 0}}> Have an account? </a>
                <a  className="text-center " href="/login"
                          style={{color:"#3196BF", borderRadius: 0}}>Log In</a>
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
                          href="/login"
                        >
                          <span style={{color:"white"}}>Login</span>
                          
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
