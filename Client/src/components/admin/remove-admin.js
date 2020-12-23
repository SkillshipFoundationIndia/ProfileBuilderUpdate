import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import {
  Button,
} from "reactstrap";
import ParticleComponent from ".././assets/ParticleComponent";

export default class RemoveAdmin2 extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getAdmin = this.getAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.newAdmin = this.newAdmin.bind(this); 
    this.updateAdmin = this.updateAdmin.bind(this);
    this.state = {
      currentUser: {
        id: null,
        username: "",
        email: ""
      },
      message: ""
    };
  }

  newAdmin() {
    this.setState({
      id: null,
      username: "",
      email: "",

      submitted: false
    });
  }


  componentDidMount() {
    this.getAdmin(this.props.match.params.id);
  }

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }

  updateAdmin() {
    AuthService.updateAdmin(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Admin was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
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


  deleteAdmin() {    
    AuthService.deleteAdmin(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/admin')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
     
      <div className= "row">
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
      <div className="col-md-3"> </div>
      <div className="col-md-6">
  {currentUser ? (
    <div className="card">
    <div className=" edit-form">
      {/* <h4>Task</h4> */}
      <form>
        <div className="form-group">
          <label htmlFor="title">Username</label>
          <input
            type="text" style={{borderRadius: 0}}
            className="form-control"
            id="title"
            value={currentUser.username}
            onChange={this.onChangeUsername}
          />
       
          <label htmlFor="description">Email ID</label>
          <input
            type="text" style={{borderRadius: 0}}
            className="form-control"
            id="description"
            value={currentUser.email}
            onChange={this.onChangeEmail}
          />
   
       
        </div>
      </form>

 {/* <Button
           className="btn btn-sm"
           color="btn btn-success accent-3"
           type="submit"
           onClick={this.updateTask}
           >
          <span style={{color:"white"}}>Update</span>
          
        </Button>  */}
         <Button
     className="btn btn-sm"
     color="btn btn-danger accent-3"
     type="submit"
     onClick={this.deleteAdmin}
     >
   <span style={{color:"white"}}><i class="fas fa-trash"> </i> </span> </Button> 

    <Button
           className="btn btn-sm"
           color="btn btn-elegant"
           type="submit"
          href="\admin"
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
      <p>Please click on a Admin...</p>
    </div>
  )}
</div></div>
);
}
}