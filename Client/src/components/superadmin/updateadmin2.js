import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./../assets/demo/demo.css"
import AuthService from "../../services/auth.service";
import { MDBBtn, MDBIcon  } from "mdbreact";
import 'bs-stepper/dist/css/bs-stepper.min.css';
import Stepper from 'bs-stepper'
import ParticleComponent from "./../assets/ParticleComponent";
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
const API = 'http://localhost:8080/api/auth/admins1';

export default class Admin2Update extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.getTask = this.getTask.bind(this);
    this.onChangeAssignedto = this.onChangeAssignedto.bind(this);


    this.state = {
      redirect: null,
      userReady: false,
      users: [],
      file:null,
      adminId:"",
      currentUser: {
        id: null,
        adminId: "",
      },
    };
  }

  // onChangeTitle(e) {
  //   const username = e.target.value;

  //   this.setState(function(prevState) {
  //     return {
  //       currentTask: {
  //         ...prevState.currentTask,
  //         title: title
  //       }
  //     };
  //   });
  // }

  onChangeAssignedto(e) {
    const adminId = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        adminId: adminId
      }
    }));
  }
  
  componentDidMount() {
    this.getTask(this.props.match.params.id);

    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({ users: data }));
    this.getTask(this.props.match.params.id);
  }
  
  getTask() {
    AuthService.getById(this.props.match.params.id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // update() {
  //   AuthService.basicadmin2(
  //     this.state.currentUser.id,
  //     this.state.adminId
  //   )
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({
  //         message: "The Task was updated successfully!"
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }


  update() {
    AuthService.basicadmin2(
      this.props.match.params.id,
      this.state.currentUser
    ) .then(
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
  // update(e) {
  //   e.preventDefault();
  
  //   this.setState({
  //     message: "",
  //     successful: false
  //   });
  //     AuthService.basicadmin2(
  //       this.state.currentUser.id,
  //       this.state.adminId,
  //     ).then(
  //       () => {
  //         this.props.history.push("/profile");
  //         window.location.reload();
  //       },
  //       error => {
  //         const resMessage =
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString();

  //         this.setState({
  //           loading: false,
  //           message: resMessage
  //         });
  //       }
  //     );
  // }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
         
      <div className= "row">
           
      <div className="col-md-4"> </div>
      <div className="col-md-4 mt-5">
  {currentUser ? (
    <div className="card mt-5">
    <div className=" edit-form">
      <h6>Select the Region Head</h6>
      <form>
      <div className="form-group mt-3">
                <select style={{borderRadius: 0}} value={currentUser.adminId}
                             onChange={this.onChangeAssignedto}
                             style={{color:"black"}} class="form-control" placeholder="Select">
                    <option >Region Head?</option>
            {this.state.users.map(data=> (
            <option
              key={data.id}
              value={data.id}
            >
           {data.username}
            </option>
          ))}
          </select>
                </div>
      </form>
      <Button
           className="btn btn-sm"
           color="btn btn-elegant accent-3"
           type="submit"
           onClick={this.update}
           >
          <span style={{color:"white"}}>Assign</span>
          
        </Button> 
          
    <Button
           className="btn btn-sm"
           color="btn btn-danger"
           type="submit"
          href="\admin22"
           >
          <span style={{color:"white"}}>Go Back</span>
        </Button>
    


      {/* <button
        className="btn btn-danger mr-2"
        onClick={this.deleteTask}
      >
        Delete
      </button>

      <button
        type="submit"
        className="btn btn-success"
        onClick={this.updateTask}
      >
        Update
      </button> */}
      <p>{this.state.message}</p>
    </div></div>
  ) : (
    <div>
      <br />
      <p>Please click on a Task...</p>
    </div>
  )}
</div></div>
);
}
}