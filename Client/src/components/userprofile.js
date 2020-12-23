import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css"
import AuthService from "../services/auth.service";
import {Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import pic from '../img/png.png';
import ParticleComponent from "./assets/ParticleComponent";

import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Tabs } from "@feuer/react-tabs";
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

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangedob = this.onChangedob.bind(this);
    this.onChangefirst_name = this.onChangefirst_name.bind(this);
    this.onChangelast_name = this.onChangelast_name.bind(this);
    this.onChangegender = this.onChangegender.bind(this);
    this.onChangesize = this.onChangesize.bind(this);
    this.onChangeabout = this.onChangeabout.bind(this);
    this.refreshList = this.refreshList.bind(this);
    // this.getUser = this.getUser.bind(this);
    this.getUser = this.getUser.bind(this);



    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      first_name:"",
      last_name: "",
      dob:"",
      gender: "",
      size: "",
      about:""
    };
  }

 

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  getAdmin(id) {
    AuthService.getAdmin(id)
      .then(response => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getUser(id) {
    AuthService.getUser(id)
      .then(response => {
        this.setState({
          currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangedob(e) {
    this.setState({
      dob: e.target.value
    });
  }

  onChangefirst_name(e) {
    this.setState({
      first_name: e.target.value
    });
  }

  onChangelast_name(e) {
    this.setState({
      last_name: e.target.value
    });
  }
  onChangegender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onChangesize(e) {
    this.setState({
      size: e.target.value
    });
  }


  onChangeabout(e) {
    this.setState({
      about: e.target.value
    });
  }


  refreshList() {
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }
  
 
  // componentDidMount() {
  //   const user = AuthService.getCurrentUser();
  //   const admin = AuthService.getCurrentAdmin();
    
  //   if(user)
  //   {
  //     const currentUser = user
  //     if (!currentUser) this.setState({ redirect: "/home" });
  //     this.setState({ currentUser: currentUser, userReady: true })
  
  //       AuthService.getUser(this.state.id)
  //         .then(response => {
  //           this.setState({
  //             currentUser: response.data
  //           });
  //           console.log(response.data);
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         });
  //   }
  //   if(admin)
  //   {
  //   const currentUser =admin
  //   if (!currentUser) this.setState({ redirect: "/home" });
  //   this.setState({ currentUser: currentUser, userReady: true })

  //     AuthService.getUsers(this.state.id)
  //       .then(response => {
  //         this.setState({
  //           currentUser: response.data
  //         });
  //         console.log(response.data);
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //   }
   
  
  // }

  // getUser() {
  //   const currentUser = AuthService.getCurrentAdmin();

  //   if (!currentUser) this.setState({ redirect: "/home" });
  //   this.setState({ currentUser: currentUser, userReady: true })
   
  // }
  handleProfile(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

      AuthService.profile(
        this.state.username,
        this.state.first_name,
        this.state.last_name,
        this.state.dob,
        this.state.gender,
        this.state.size,
        this.state.about
      ).then(
        () => {
          this.props.history.push("/education");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    
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
            <Container className="mt-7" fluid>
          <Row>
            <Col className="order-md-1" md="12">
              <Card className="" height="125" >
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    
                    <Col md="7">
                    <div className="profile-head ml-4">
                                    <h4>
                                    {currentUser.first_name} {currentUser.last_name}
                                    </h4>
                                    <h6 className="blue-text accent-4">
                                    {currentUser.type}
                                    </h6>
                                    <h7 className="blue-text accent-4">
                                    {currentUser.email}
                                    </h7>         
                          
                        </div>
                    </Col>
                    <Col className="text-right" md="4">
                  
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <Col lg="12">    <Tabs defaultActiveKey="basic">
                          <Tab eventKey="basic" title="Basic">
                            <div className="tab-item-wrapper">
                              <h5 className="mt-4">Basic Information</h5>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold mt-4">
                                   Username
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-4 mt-4" >
                                    {currentUser.username}
                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  Name
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.first_name} {currentUser.last_name}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  Date of Birth
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.dob}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  Gender
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.gender}

                              </h6>
                                </Col>
                              </Row>
                            
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  T-shirt Size
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.size}

                              </h6>
                                </Col>
                              </Row>
                            </div>
                          </Tab>
                        
                          <Tab eventKey="educational" title="Educational">
                            <div className="tab-item-wrapper">
                              <h5 className="mt-4">Educational Details</h5>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold mt-4">
                                   Degree
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-4 mt-4" >
                                    {currentUser.degree}
                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  Institute
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.institute}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                Field of Study
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.field}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  Start Year
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.start}

                              </h6>
                                </Col>
                              </Row>
                            
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                              End year
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.end}

                              </h6>
                                </Col>
                              </Row>
                            
                            </div>
                          </Tab>
                        
                          <Tab eventKey="about" title="About">
                            <div className="tab-item-wrapper">
                              <h5 className="mt-4">About You</h5>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold mt-4">
                                 Developer Type
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-4 mt-4" >
                                    {currentUser.type}
                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  Skills
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.skills}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                Resume
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.resume}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                Experience
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.experience}

                              </h6>
                                </Col>
                              </Row>
                            
                            
                            
                            </div>
                          </Tab>
                          <Tab eventKey="social" title="Social">
                            <div className="tab-item-wrapper">
                              <h5 className="mt-4">Social Links</h5>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold mt-4">
                                   Linkedin
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-4 mt-4" >
                                    {currentUser.linkedin}
                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                              Hackerrank
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.hackerrank}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                              Github
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.github}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                              Stackoverflow
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.stackoverflow}

                              </h6>
                                </Col>
                              </Row>
                            
                          
                            </div>
                          </Tab>
                        
                          <Tab eventKey="contact" title="Contact">
                            <div className="tab-item-wrapper">
                              <h5 className="mt-4">Contact Info</h5>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold mt-4">
                                   Number
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-4 mt-4" >
                                    {currentUser.number}
                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  Email Id
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.email}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                  Address
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.address}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                City
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.city}

                              </h6>
                                </Col>
                              </Row>
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                                 Country
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.country}

                              </h6>
                                </Col>
                              </Row>
                            
                              <Row>
                              <Col md="3">
                              <h6  className="font-weight-bold ">
                              Pin Code
                              </h6>
                              </Col>
                              <Col md="5">
                              <h6  className="blue-text accent-1 " >
                                    {currentUser.zip}

                              </h6>
                                </Col>
                              </Row>
                            
                            </div>
                          </Tab>
                        </Tabs>
                        
                        </Col>
                                         
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </Container>
 
  
  </Container> 
    );
  }
}



