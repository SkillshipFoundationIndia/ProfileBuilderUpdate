import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css"
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {Container} from "react-bootstrap";
import TaskDataService from "../services/task";
import ParticleComponent from "./assets/ParticleComponent";

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
export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      // currentUser: { first_name: "" }
    };
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <Container fluid>   
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
     <Row>
    <Col xs={2} id="sidebar-wrapper">      
                      {/* <Sidebar /> */}
                        </Col>
                        <Col  xs={10} id="page-content-wrapper">
      {(this.state.userReady) ?
         <div className="container  pt-5 p-3 my-3 border">
         <header class="card-body text-center">
          <h1   className="type" style={{
                  font: "Roboto",
              }}  class="h1-responsive" className="text-center">
             Hey, there <strong>{currentUser.username}</strong>
          </h1><br />
        </header>
        
        <Row className="h-50"  style={{height:"200px"}}>
        <Col md="2">
            </Col>
            <Col md="2">
            </Col>
            <Col md="4">
            <p>Click below to comple your profile

        <div className="update ml-auto btn-lg mr-auto">
                        <Button
                          className="btn btn-block"
                          color="btn mdb-color darken-3"
                          type="submit"
                          href="/basic"
                        >
                          <span style={{color:"white"}}> Update Profile</span>
                          
                        </Button>
                      </div></p>
                      </Col>
                      </Row>
        {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul> */}
      </div>: null}
      </Col> </Row>
      </Container>

    );
  }
}
