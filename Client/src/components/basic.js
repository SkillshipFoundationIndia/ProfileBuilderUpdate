import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css"
import AuthService from "../services/auth.service";
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'
import ParticleComponent from "./assets/ParticleComponent";
import axios, { post } from 'axios';

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

export default class Basic extends Component {
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
    this.onChangedegree = this.onChangedegree.bind(this);
    this.onChangeinstitute = this.onChangeinstitute.bind(this);
    this.onChangefield = this.onChangefield.bind(this);
    this.onChangestart = this.onChangestart.bind(this);
    this.onChangeend = this.onChangeend.bind(this);
    this.onChangetype = this.onChangetype.bind(this);
    this.onChangeskills = this.onChangeskills.bind(this);
    this.onChangeresume = this.onChangeresume.bind(this);
    this.onChangeexperience = this.onChangeexperience.bind(this);
    this.onChangelinkedin = this.onChangelinkedin.bind(this);
    this.onChangehackerrank = this.onChangehackerrank.bind(this);
    this.onChangegithub = this.onChangegithub.bind(this);
    this.onChangestackoverflow = this.onChangestackoverflow.bind(this);
    this.onChangenumber = this.onChangenumber.bind(this);
    this.onChangeaddress = this.onChangeaddress.bind(this);
    this.onChangecity = this.onChangecity.bind(this);
    this.onChangecountry = this.onChangecountry.bind(this);
    this.onChangezip = this.onChangezip.bind(this);
    this.update = this.update.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)


    this.state = {
      redirect: null,
      userReady: false,
      file:null,
      currentUser: { username: "" },
      first_name:"",
      last_name: "",
      dob:"",
      gender: "",
      size: "",
      about:"",
      degree:"",
      institute:"",
      field: "",
      start: "",
      end: "",
      type:"",
      skills:"",
      resume: "",
      experience: "",
      linkedin:"",
      hackerrank:"",
      github: "",
      stackoverflow: "",
      number:"",
      address: "",
      city: "",
      country: "",
      zip: ""
    };
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
  onChangedegree(e) {
    this.setState({
      degree: e.target.value
    });
  }

  onChangeinstitute(e) {
    this.setState({
      institute: e.target.value
    });
  }

  onChangefield(e) {
    this.setState({
      field: e.target.value
    });
  }
  onChangestart(e) {
    this.setState({
      start: e.target.value
    });
  }

  onChangeend(e) {
    this.setState({
      end: e.target.value
    });
  }
  onChangetype(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeskills(e) {
    this.setState({
      skills: e.target.value
    });
  }

  onChangeresume(e) {
    this.setState({
      resume: e.target.value
    });
  }
  onChangeexperience(e) {
    this.setState({
      experience: e.target.value
    });
  }
  onChangelinkedin(e) {
    this.setState({
      linkedin: e.target.value
    });
  }

  onChangehackerrank(e) {
    this.setState({
      hackerrank: e.target.value
    });
  }

  onChangegithub(e) {
    this.setState({
      github: e.target.value
    });
  }
  onChangestackoverflow(e) {
    this.setState({
      stackoverflow: e.target.value
    });
  }
  onChangeaddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  onChangenumber(e) {
    this.setState({
      number: e.target.value
    });
  }
  onChangecity(e) {
    this.setState({
      city: e.target.value
    });
  }

  onChangecountry(e) {
    this.setState({
      country: e.target.value
    });
  }
  onChangezip(e) {
    this.setState({
      zip: e.target.value
    });
  }


    
  
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    const admin = AuthService.getCurrentAdmin();
    
    if(user)
    {
      const currentUser = user

      if (!currentUser) this.setState({ redirect: "/home" });
      this.setState({ currentUser: currentUser, userReady: true })
    }
    if(admin)
    {
      const currentUser = admin

      if (!currentUser) this.setState({ redirect: "/home" });
      this.setState({ currentUser: currentUser, userReady: true })
    }

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    alert("Uploaded!")
    })
    
        
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file){
    const currentUser = AuthService.getCurrentAdmin();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
    const adminId = currentUser.id


    const url = 'http://localhost:8080/api/image/'
    const formData = new FormData()
   
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'adminId': adminId,
        }
    }
    
    return  post(url+"upload",{adminId},formData,config)
  }

  update() {
    AuthService.update(
      this.state.currentUser.id,
      this.state.currentUser
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

  handleProfile(e) {
    e.preventDefault();
    const user = AuthService.getCurrentUser();
    const admin = AuthService.getCurrentAdmin();
    
    if(user)
    {
      const currentUser = user

      if (!currentUser) this.setState({ redirect: "/home" });
      this.setState({ currentUser: currentUser, userReady: true })
    }
    if(admin)
    {
      const currentUser = admin

      if (!currentUser) this.setState({ redirect: "/home" });
      this.setState({ currentUser: currentUser, userReady: true })
    }
   
    this.setState({
      message: "",
      successful: false
    });
    if(user){
      AuthService.basic(
        this.state.currentUser.username,
        this.state.first_name,
        this.state.last_name,
        this.state.dob,
        this.state.gender,
        this.state.size,
        this.state.about,
        this.state.type,
        this.state.skills,
        this.state.resume,
        this.state.experience,
        this.state.degree,
        this.state.institute,
        this.state.field,
        this.state.start,
        this.state.end,
        this.state.linkedin,
        this.state.hackerrank,
        this.state.github,
        this.state.stackoverflow,
        this.state.number,
        this.state.address,
        this.state.city,
        this.state.country,
        this.state.zip
      ).then(
        () => {
          this.props.history.push("/profile");
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
    if(admin){
      AuthService.basic2(
        this.state.currentUser.username,
        this.state.first_name,
        this.state.last_name,
        this.state.dob,
        this.state.gender,
        this.state.size,
        this.state.about,
        this.state.type,
        this.state.skills,
        this.state.resume,
        this.state.experience,
        this.state.degree,
        this.state.institute,
        this.state.field,
        this.state.start,
        this.state.end,
        this.state.linkedin,
        this.state.hackerrank,
        this.state.github,
        this.state.stackoverflow,
        this.state.number,
        this.state.address,
        this.state.city,
        this.state.country,
        this.state.zip
      ).then(
        () => {
          this.props.history.push("/profile");
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
    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
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
         <div id="stepper1" class="bs-stepper">
          <div class="bs-stepper-header">
            <div class="step" data-target="#test-l-1">
              <button class="step-trigger">
                <span class="bs-stepper-circle">1</span>
                <span class="bs-stepper-label">Basic</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-2">
              <button class="step-trigger">
                <span class="bs-stepper-circle">2</span>
                <span class="bs-stepper-label">Education</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-3">
              <button class="step-trigger">
                <span class="bs-stepper-circle">3</span>
                <span class="bs-stepper-label">Describe</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-4">
              <button class="step-trigger">
                <span class="bs-stepper-circle">4</span>
                <span class="bs-stepper-label">Social</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#test-l-5">
              <button class="step-trigger">
                <span class="bs-stepper-circle">5</span>
                <span class="bs-stepper-label">Contact</span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content">
            <form  onSubmit={this.updateTask}
            ref={c => {
              this.form = c;
            }} noValidate>
              <div id="test-l-1" class="content">
                              <Row>
                            <Col md="2">
                            </Col>
                            <Col md="8">
                              <Card className="card-user">
                                {/* <Row>
                              <Col md="1">
                            </Col>
                              <Col md="4">
                                <CardHeader>
                                  <CardTitle class="text-center" tag="h3">Basic Info.</CardTitle></Col>
                                  </Row> */}
                                {/* </CardHeader> */}
                                <CardBody>
                                  <Form class="needs-validation">
                                    {/* <Row>
                                     
                                      <Col className="px-1" md="12">
                                        <FormGroup>
                                          <label>Username</label>
                                          <Input
                                            defaultValue={this.state.username}
                                            required
                                            style={{borderRadius: 0}}
                                            placeholder="Username"
                                            onChange={this.onChangeUsername}
                                            // value={this.state.username}
                                            type="text"
                                          />
                                        </FormGroup>
                                      </Col>
                                      
                                    </Row> */}
                                    <Row>
                                      <Col className="px-1" md="6">
                                        <FormGroup>
                                          <label>First Name</label>
                                          <Input
                                            onChange={this.onChangefirst_name}
                                            defaultValue={this.state.first_name}
                                            placeholder="First Name"
                                            style={{borderRadius: 0}}
                                            required
                                            type="text"
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col className="pl-1" md="6">
                                        <FormGroup>
                                          <label>Last Name</label>
                                          <Input
                                            onChange={this.onChangelast_name}
                                            defaultValue={this.state.last_name}
                                            style={{borderRadius: 0}}
                                            required
                                            placeholder="Last Name"
                                            type="text"
                                            // value={currentUser.username}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                    <Col className="px-1" md="4">
                                        <FormGroup>
                                        <label>Date of Birth</label>
                                          <Input
                                            onChange={this.onChangedob}
                                            defaultValue={this.state.dob}
                                            placeholder="DD/MM/YYYY"
                                            style={{borderRadius: 0}}
                                            required
                                            type="date"
                                            // value={currentUser.username}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col className="px-1" md="4">
                                        <FormGroup>
                                          <div class="form-group">
                                      <label>Gender</label>
                                      <select style={{borderRadius: 0}} onChange={this.onChangegender} required defaultValue={this.state.gender} class="form-control" placeholder="Gender">
                                      <option>Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                      </select>
                                      </div>
                                        </FormGroup>
                                      </Col>
                                      
                                      <Col className="px-1" md="4">
                                        <FormGroup>
                                      <div class="form-group">
                                      <label>T-Shirt Size</label>
                                      <select   style={{borderRadius: 0}} onChange={this.onChangesize} required defaultValue={this.state.size} class="form-control" placeholder="T-Shirt Size">
                                      <option>Size</option>
                                        <option>XS</option>
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                        <option>XXL</option>
                                      </select>
                                      </div>
                                        </FormGroup>
                                        
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col className="px-1" md="12">
                                        <FormGroup>
                                          <label>About Me</label>
                                          <Input
                                            type="textarea"
                                            style={{borderRadius: 0}}
                                            onChange={this.onChangeabout}
                                            defaultValue={this.state.about}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                        <Col md="8">
                                        {/* <form id='uploadSingleFileForm' onSubmit={this.onFormSubmit}>
        <h1></h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Profile Pic</button>
    
      </form> */}
                                        </Col>
                                        <Col md="4">
                                    <div className="update ml-auto btn-lg mr-auto">
                                        <Button 
                                        style={{
                                          borderRadius: 0,
                                          backgroundColor: "#164E87",
                                      }}
                                      onClick={() => this.stepper.next()}
                                          className=" btn-block "
                                          color=""
                                        
                                        > <span style={{color:"white"}}>
                                          Next</span>
                                        </Button>
                                      </div>
                                      </Col>
                                    </Row>
                                  </Form>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
              </div>
              <div id="test-l-2" class="content">
              <Row>
            <Col md="2">
            </Col>
            <Col md="8">
              <Card className="card-user">
                {/* <CardHeader> */}
                  {/* <CardTitle tag="h3">Educational Details</CardTitle> */}
                {/* </CardHeader> */}
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>Degree Type</label>
                          <div class="form-group">
                      <select style={{borderRadius: 0}}  onChange={this.onChangedegree} defaultValue={this.state.degree} class="form-control" placeholder="T-Shirt Size">
                      <option>Degree Type</option>
                          <option>BE/B.Tech - Bachelor of Technology</option>
                        <option>B.Arch - Bachelor of Architecture</option>
                        <option>BCA - Bachelor of Computer Applications</option>
                        <option>B.Sc. - Bachelor of Science</option>
                        <option>BPharma - Bachelor of Pharmacy</option>
                        <option>Animation, Graphics and Multimedia</option>
                        <option>BA/B.Sc. Liberal Arts</option>
                        <option>BDS - Bachelor of Dental Surgery</option>
                        <option>BBA- Bachelor of Business Administration</option>
                        <option>BMS- Bachelor of Management Science</option>
                        <option> BFA- Bachelor of Fine Arts</option>
                        <option>BEM- Bachelor of Event Management</option>
                        <option>BJMC- Bachelor of Journalism and Mass Communication</option>
                        <option>BFD- Bachelor of Fashion Designing</option>
                        <option>BSW- Bachelor of Social Work</option>
                        <option>BBS- Bachelor of Business Studies</option>
                        <option>BTTM- Bachelor of Travel and Tourism Management</option>
                        </select>
                        </div>
                        </FormGroup>
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="6">
                        <FormGroup>
                          <label>Educational Institution</label>
                          <Input
                            onChange={this.onChangeinstitute}
                            style={{borderRadius: 0}}
                            defaultValue={this.state.institute}
                            placeholder="Educational Institution"
                            required
                            type="text"
                            // value={currentUser.username}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="6">
                        <FormGroup>
                          <label>Field of Study</label>
                          <Input
                            placeholder="Field of Study"
                            onChange={this.onChangefield}
                            style={{borderRadius: 0}}
                            defaultValue={this.state.field}
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="6">
                        <FormGroup>
                          <label>Start of Graduation (Year)</label>
                          <Input
                            placeholder="Start of Graduation"
                            style={{borderRadius: 0}}
                            onChange={this.onChangestart}
                            defaultValue={this.state.start}
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="6">
                        <FormGroup>
                          <label>End of Graduation (Year)</label>
                          <Input
                            placeholder="End of Graduation"
                            style={{borderRadius: 0}}
                            onChange={this.onChangeend}
                            defaultValue={this.state.end}
                            
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                        <div className="update ml-auto btn-lg mr-auto">
                        <Button 
                                        style={{
                                          borderRadius: 0,
                                          backgroundColor: "light",
                                      }}
                                      onClick={() => this.stepper.previous()}
                                          className=" btn-block "
                                          color=""
                                        
                                        > <span style={{color:"black"}}>
                                          Previous</span>
                                        </Button>
                      </div>
                       
                        </Col> <Col md="4"></Col>
                        <Col md="4">
                    <div className="update ml-auto btn-lg mr-auto">
                        <Button
                          className=" btn btn-block "
                          color="btn"
                          style={{
                            borderRadius: 0,
                            backgroundColor: "#164E87",
                        }}onClick={() => this.stepper.next()}
                        >
                           <span style={{color:"white"}}>
                           Next</span>
                        </Button>
                      </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
              
              </div>
              <div id="test-l-3" class="content">
              <Row>
            <Col md="2">
            </Col>
            <Col md="8">
              <Card className="card-user">
                {/* <CardHeader> */}
                  {/* <CardTitle tag="h3">Describe Yourself</CardTitle> */}
                {/* </CardHeader> */}
                <CardBody>
                  <Form>
                    <Row>
                     
                      <Col className="px-1" md="7">
                        <FormGroup>
                          <label>Which of the followings describe you most?</label>
                          <select style={{borderRadius: 0}} onChange={this.onChangetype} defaultValue={this.state.type} class="form-control" placeholder="T-Shirt Size">
                        <option>Select One</option>
                        <option>FrontEnd Developer</option>
                        <option>Backend Developer</option>
                        <option>Full-Stack Developer</option>
                        <option>Designer</option>
                        <option>Mobile Developer</option>
                        <option>Other</option>
                      </select>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label>Do you have any work experience?</label>
                          <select style={{borderRadius: 0}} onChange={this.onChangeexperience} defaultValue={this.state.experience} class="form-control" placeholder="">
                        <option>Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                        </FormGroup>
                      </Col>
                     
                    </Row>
                    <Row>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>Your top 5 skills</label>
                          <Input
                            onChange={this.onChangeskills}
                            defaultValue={this.state.skills}
                            style={{borderRadius: 0}}
                            required
                            placeholder="eg. Reactjs, Nodejs, Wordpress, C++, python"
                            type="text"
                            // value={currentUser.username}
                          />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <Row>
                    <Col className="px-1" md="12">
                    {/* <label>Upload Resume</label> */}
                        <FormGroup>
                          <div class="form-group custom-file mb-3 mt" hidden>
                          <input type="file" class="custom-file-input" id="customFile" name="filename" />
                          <label  style={{borderRadius: 0}} onChange={this.onChangeresume} defaultValue={this.state.resume} class="custom-file-label" for="customFile">Upload Resume</label>
                       </div>
                          {/* <Input
                            placeholder="Upload Resume"
                            onChange={this.onChangeexperience}
                            defaultValue={this.state.experience}
                            type="text"
                          /> */}
                          
                        </FormGroup>
                      </Col>
                    
                    </Row>
                    <Row>
                      <Col md="11">
                      <i>*The information you provide here helps us in performing analytics.</i>
                      </Col>
                      </Row><Row>
                      <Col md="4">
                        <div className="update ml-auto btn-lg mr-auto">
                        <Button 
                                        style={{
                                          borderRadius: 0,
                                          backgroundColor: "light",
                                      }}
                                      onClick={() => this.stepper.previous()}
                                          className=" btn-block "
                                          color=""
                                        
                                        > <span style={{color:"black"}}>
                                          Previous</span>
                                        </Button>
                      </div>
                       
                        </Col> <Col md="4"></Col>
                        <Col md="4">
                    <div className="update ml-auto btn-lg mr-auto">
                    <Button
                        style={{
                          borderRadius: 0,
                          backgroundColor: "#164E87",
                      }} onClick={() => this.stepper.next()}
                          className=" btn-block "
                          color=""
                        > <span style={{color:"white"}}>
                           Next</span>
                        </Button>
                      </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
              </div>
              <div id="test-l-4" class="content">
              <Row>
            <Col md="2">
            </Col>
            <Col md="8">
              <Card className="card-user">
                {/* <CardHeader> */}
                  {/* <CardTitle tag="h3">Social Links</CardTitle> */}
                {/* </CardHeader> */}
                <CardBody>
                  <Form>
                    <Row>
                    </Row>
                    <Row>
                    <Col className="px-1" md="12">
                        <FormGroup>
                          <label>LinkedIn</label>
                          <Input
                            onChange={this.onChangelinkedin}
                            style={{borderRadius: 0}}
                            defaultValue={this.state.linkedin}
                            placeholder="LinkedIn"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>HackerRank</label>
                          <Input
                            onChange={this.onChangehackerrank}
                            style={{borderRadius: 0}}
                            defaultValue={this.state.hackerrank}
                            placeholder="HackerRank"
                            type="text"
                            // value={currentUser.username}
                          />
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>Github</label>
                          <Input
                            placeholder="Github"
                            style={{borderRadius: 0}}
                            onChange={this.onChangegithub}
                            defaultValue={this.state.github}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      </Row>
                    <Row>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>StackOverflow</label>
                          <Input
                            placeholder="StackOverflow"
                            style={{borderRadius: 0}}
                            onChange={this.onChangestackoverflow}
                            defaultValue={this.state.stackoverflow}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="4">
                        <div className="update ml-auto btn-lg mr-auto">
                        <Button 
                                        style={{
                                          borderRadius: 0,
                                          backgroundColor: "light",
                                      }}
                                      onClick={() => this.stepper.previous()}
                                          className=" btn-block "
                                          color=""
                                        
                                        > <span style={{color:"black"}}>
                                          Previous</span>
                                        </Button>
                      </div>
                       
                        </Col> <Col md="4"></Col>
                        <Col md="4">
                    <div className="update ml-auto btn-lg mr-auto">
                    <Button
                        style={{
                          borderRadius: 0,
                          backgroundColor: "#164E87",
                      }} onClick={() => this.stepper.next()}
                          className=" btn-block "
                          color=""
                        > <span style={{color:"white"}}>
                           Next</span>
                        </Button>
                      </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
                 </div>
              <div id="test-l-5" class="content">
              <Row>
            <Col md="2">
            </Col>
            <Col md="8">
              <Card className="card-user">
                {/* <CardHeader> */}
                  <CardTitle tag="h3">Contact Details</CardTitle>
                {/* </CardHeader> */}
                <CardBody>
                  <Form   onSubmit={this.handleProfile}
            ref={c => {
              this.form = c;
            }}>
                    <Row>
                      <Col className="px-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            defaultValue={currentUser.email}
                            disabled
                            style={{borderRadius: 0}}
                            placeholder="Email"
                            onChange={this.onChange}
                            // value={}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                     
                      <Col className="px-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Contact No.
                          </label>
                          <Input placeholder="Contact No."
                          onChange={this.onChangenumber} 
                          style={{borderRadius: 0}}
                          defaultValue={this.state.number}
                          type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                   
                    <Row>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            placeholder="Home Address"
                            style={{borderRadius: 0}}
                            onChange={this.onChangeaddress}
                            required
                            defaultValue={this.state.address}
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            placeholder="City"
                            required
                        onChange={this.onChangecity}
                        style={{borderRadius: 0}}
                        defaultValue={this.state.city}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            placeholder="Country"
                            required
                        onChange={this.onChangecountry}
                        style={{borderRadius: 0}}
                        defaultValue={this.state.country}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input 
                          placeholder="ZIP Code" 
                          type="number"
                          required
                          style={{borderRadius: 0}}
                        onChange={this.onChangezip}
                        defaultValue={this.state.zip}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      
                    </Row>
                    <Row>
                    <Col md="4">
                        <div className="update ml-auto btn-lg mr-auto">
                        <Button 
                                        style={{
                                          borderRadius: 0,
                                          backgroundColor: "light",
                                      }}
                                      onClick={() => this.stepper.previous()}
                                          className=" btn-block "
                                          color=""
                                        
                                        > <span style={{color:"black"}}>
                                          Previous</span>
                                        </Button>
                      </div>
                       
                        </Col> <Col md="4"></Col>
                        <Col md="4">
                    <div className="update ml-auto btn-lg mr-auto">
                    <Button
                        style={{
                          borderRadius: 0,
                          backgroundColor: "#164E87",
                      }}
                          className=" btn-block "
                          color=""
                          type="submit"
                        > <span style={{color:"white"}}>
                           Submit</span>
                        </Button>
                      </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
             </Col>
               </Row>
                
              </div>
            </form>
          </div>
        </div>
        {(this.state.userReady) ?
        <div>
        {/* <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
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
      </div>
      : null}
     
      </div>
    );
  }
}
