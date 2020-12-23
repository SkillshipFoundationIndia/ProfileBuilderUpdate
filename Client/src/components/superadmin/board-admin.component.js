import React, { Component } from "react";
import '../assets/css/dashboard.css'
import { Redirect } from "react-router-dom";
import UserService from "../../services/user.service";
import {Container,Tabs, Tab, Row, Col, Nav , Card, Form, Button } from "react-bootstrap";
import TasksList from "./task-list-admin"
import UserList from "./user-list-admin"
import AdminList from "./admin-list"
import Admin2List from "./admin2-list"
import { } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "../../services/auth.service";
import Sidebar from "../assets/sidebar"
import '../assets/css/dashboard.css'
const Loading =()=>
  <div className="loading1">
    <div></div>
    <div></div>
  </div>  
export default class BoardSuperAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      content: "",
      loading: true,
      auth: [],
    };
  }

  componentDidMount() {
    this.isLoading = setTimeout(()=>{this.setState({loading: false})}, 2300);

    const currentUser = AuthService.getCurrentAdmin();

    if (!currentUser) this.setState({ redirect: "/adminlogin" });
    this.setState({ currentUser: currentUser, userReady: true })
   
    AuthService.getUsers(currentUser.id)
    .then(response => {
      this.setState({
        auth: response.data,
      });
     
      if (this.state.auth.roleId==2){
                this.props.history.push("/admin");
      }
      if (this.state.auth.roleId==3){
        this.props.history.push("/admin2");
}
      console.log(this.state.auth.username);
    })
    .catch(e => {
      console.log(e);
    });

    UserService.getSuperAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
        this.state = {menuVisible: false};
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
  componentWillUnmount() {
    clearTimeout(this.isLoading);
 }

 timer = () => setTimeout(()=>{
  this.setState({loading: false})
}, 2300);

  render() {
    const {loading} = this.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <Container>
        <div className="tab-wrapper">
      <div className='container-fluid' >
        <div className="mt-5">
          <div className="" style={{alignItems:"left"}}>

          <Tab.Container onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}  defaultActiveKey="home" className="bg-dark sidebar">
              <Row>
                <Col md={4} className="d-none d-lg-block">
                  <Nav style={{ backgroundColor: "gray"}} variant="pills pills-white"  className=".d-none article__title type1 flex-column mt-5 bg-dark sidebar">
                    <Nav.Item >
                      <Nav.Link eventKey="home"   style={{color:"white"}}><span className="type2">Tasks List</span></Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="profile"  style={{color:"white"}}><span className="type2">Region Heads</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="profile1"  style={{color:"white"}}><span className="type2">City Heads</span></Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="contact" style={{color:"white"}}> <span className="type2">Campus CEO</span></Nav.Link>
                    </Nav.Item>

                  </Nav>

                </Col>
                <Col sm={5} className="d-lg-none ">

                  <Nav  variant="pills "  className="nav  mb-3  bg-dark navbar">
                    <Nav.Item >
                      <Nav.Link eventKey="home"  style={{color:"white"}}><span className="type2">Tasks List</span></Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="profile"  style={{color:"white"}}><span className="type2">Region Heads</span></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="profile1"  style={{color:"white"}}><span className="type2">City Heads</span></Nav.Link>
                    </Nav.Item>


                    <Nav.Item>
                      <Nav.Link eventKey="contact"  style={{color:"white"}}> <span className="type2">Campus CEO</span></Nav.Link>
                    </Nav.Item>

                  </Nav>

                </Col>
                <Col md={12}>
                {loading ?(<Loading/>):(

                  <Tab.Content>
                    <Tab.Pane eventKey="home">
                    <TasksList className="mt-5"/>   </Tab.Pane>

                    <Tab.Pane eventKey="profile">
                     <AdminList  className="mt-5"/>
                     </Tab.Pane>
                     <Tab.Pane eventKey="profile1">
                     <Admin2List  className="mt-5"/>
                     </Tab.Pane>

                    <Tab.Pane eventKey="contact">
                    <UserList  className="mt-5"/>
                    </Tab.Pane>

                  </Tab.Content>)}
                </Col>
              </Row>
            </Tab.Container>


          </div>
        </div>
      </div>
    </div>
    
      <Row>
      

          <Col xs={2} id="sidebar-wrapper">      
            {/* <Sidebar /> */}
          </Col>
          <Col  xs={10} id="page-content-wrapper">
        

          </Col> 
      </Row>
      {/* <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div> */}
  </Container>
    );
  }
}
