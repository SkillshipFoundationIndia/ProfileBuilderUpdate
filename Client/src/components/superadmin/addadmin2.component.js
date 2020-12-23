import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import logo from '../../img/logo1.png';
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
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import ParticleComponent from "./../assets/ParticleComponent";

const API = 'http://localhost:8080/api/auth/admin2';

export default class Admin22 extends Component {
  constructor(props) {
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.updateTask = this.updateTask.bind(this);

    this.state = {
      currentUser: {
        id: null,
        username: "",
        adminId:"",
      },
      email: "",
      password: "",
      // adminId:this.props.match.params.id,
      roles:[],
      users: [],
      successful: false,
      message: ""
    };
  }

  setActiveUser(data, index) {
    this.setState({
      currentUser: data,
      currentIndex: index
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }



  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({ users: data }));
    // const currentUser = AuthService.getCurrentAdmin();

    // if (!currentUser) this.setState({ redirect: "/adminlogin" });
    // this.setState({ currentUser: currentUser, userReady: true })

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

  updateTask() {
    AuthService.basicadmin2(
      this.state.currentUser.id,
      this.state.adminId
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

    this.setState({
      message: "",
      successful: false
    });
      AuthService.basicadmin2(
        this.state.currentUser.id,
        this.state.adminId       
      ).then(
        () => {
          this.props.history.push("/superadmin");
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
    const {users,currentIndex,data,currentUser } = this.state;

    return (
  
        <div className="">
      <div className="list row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="input-group">
           
               
          </div>
          
        </div>
        </div>
        <div className="list row">
        
             
        </div>
        <div className="list row">

    <div className="col-md-6">   
        <div className=" pt-5 p-3 my-3 view overlay zoom">
          {/* <h3 className="text-center">Sign Up</h3> */}
          <h4>Select a Unassigned City Head</h4> 
          <ul className="list-group list-group-horizontal-lg">
            {users &&
              users.map((data, index) => {
                return (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(data, index)}
                  key={index}
                >
                  {data.username}
                </li>
               )})}
          </ul>
          <Form
            onSubmit={this.handleProfile}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                

                <div className="form-group">
                
                </div>
                <div className="">
          {currentUser ? (
            <div>
              <Row>
               
                <Col className="">
           
                <Button
           className="btn btn-sm"
           color="btn btn-elegant accent-3"
           type="submit"
           href={"/updateAdmin2/" + currentUser.id}
           >
          <span style={{color:"white"}}>Assign to</span>
          
        </Button> 
        <Button
           className="btn btn-sm"
           color="btn btn-danger"
           type="submit"
          href="\superadmin"
           >
          <span style={{color:""}}>Go Back</span>
        </Button>
    
        </Col>
        </Row>
              {/* <Link
                to={"/users/" + currentUser.id}
                className="btn text-right btn-warning"
              >
                Edit
              </Link> */}
            </div>
          ) : (
            <div>
              <br />
              {/* <p>Please click on a Region/City Head...</p> */}
              {/* <Lottie 
	    options={defaultOptions}
        height='auto'
        width='auto'
      /> */}
             
            </div>
          )}
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

            {/* {this.state.message && (
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
            )} */}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div></div>
   </div>
    );
  }
}
