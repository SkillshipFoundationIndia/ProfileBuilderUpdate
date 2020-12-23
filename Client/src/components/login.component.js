import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Lottie from 'react-lottie';
import animationData from './lotties/ani1';
import {Container, Row, Col } from "react-bootstrap";
import ParticleComponent from "./assets/ParticleComponent";

import logo from '../img/logo.png';
import {
  Button,
} from "reactstrap";
import AuthService from "../services/auth.service";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Required!
      </div>
    );
  }
};


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/userComponent");
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
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
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
       
  <Row>
 
    <Col md={6} className="d-none d-lg-block"> 
    <div className="mt-5">
      <Lottie 
	    options={defaultOptions}
        height='450px'
        width='450px'
      />
    </div>
</Col>

    <Col md={5}>
    
       <div className="" style={{borderRadius: 5 ,width: "auto", align:"center"}}>
    
        <div className="container  pt-5 p-3 my-3  view overlay zoom">
        {/* <CardTitle tag="h3">Login</CardTitle> */}
         
        {/* <h3 className="text-center">Login</h3> */}
        <img src={logo} class="img-fluid mx-auto d-block" height="150" width="150" alt="Responsive image"/>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          > <Col md="12">
            <div className="form-group" center >
              {/* <label htmlFor="username">Username</label> */}
              <Input
                type="text"
                style={{borderRadius: 4 ,width: "375"}}
                className="form-control"
                name="username"
                placeholder="Username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
                center
              />
            </div>
            </Col>
            <Col md="12">
            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <Input
             style={{borderRadius: 4 ,width: "375"}}
                type="password"
                className="form-control"
                name="password"
                required
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
            </Col>
            <Col xs="12">
            <div className="form-group">
                        <Button
        className="btn btn-md btn-block"
        color="btn  mdb-color darken-3"
        type="submit"
        >
       <span style={{color:"white",fontSize:13}}>Login</span>
     </Button>
            <Row>
              <Col md={2}></Col>
              <Col>
              <a style={{ textAlign: 'right' }}>Region Head | City Head? <a href="/adminlogin">Login</a></a>
              </Col>
           
            </Row>
    

              </div></Col>
              <Col md={6}  className="d-lg-none"> 
    <div className="">
      <Lottie 
	    options={defaultOptions}
        height='auto'
        width='auto'
      />
    </div>
</Col>
              <div className="form-group">
              <div class="custom-control custom-checkbox">
            </div>
              
              </div>
             
             
              <div className="form-group"class="d-flex justify-content-center">
             
            </div>


            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
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
        </div> 
      
        </Col>
   <Col></Col>
  </Row>
</Container>
    
    );
  }
}
