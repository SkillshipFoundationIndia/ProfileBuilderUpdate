import React, { Component } from "react";
import MaterialTable from 'material-table';
import { Redirect } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
// import AddTask from "./addtask"
import TasksList from "./task-list"
import UserList1 from "./user-list"
import Task from "./task.component"
import {Container,Tabs, Tab, Row, Col, Nav , Card, Form, Button } from "react-bootstrap";
const Loading =()=>
  <div className="loading1">
    <div></div>
    <div></div>
  </div>  

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);
    this.handleTask = this.handleTask.bind(this);
    this.task_title = this.task_title.bind(this);
    this.task_description = this.task_description.bind(this);
    this.assigned_to = this.assigned_to.bind(this);
    this.start_date = this.start_date.bind(this);
    this.deadline = this.deadline.bind(this);
    this.task_status = this.task_status.bind(this);

    this.state = {
      task_title: "",
      task_description: "",
      assigned_to: "",
      start_date: "",
      deadline: "",
      task_status: "",
      loading: true,
      items: []
    };
  }

 
  task_title(e) {
    this.setState({
      task_title: e.target.value
    });
  }
  
 
  task_description(e) {
    this.setState({
      task_description: e.target.value
    });
  }

  assigned_to(e) {
    this.setState({
      assigned_to: e.target.value
    });
  }

  start_date(e) {
    this.setState({
      start_date: e.target.value
    });
  }
  
  deadline(e) {
    this.setState({
      deadline: e.target.value
    });
  }

  task_status(e) {
    this.setState({
      task_status: e.target.value
    });
  }
 
 
  handleFormSubmit(e){
    e.preventDefault();
   
    let items = [...this.state.items];

    AuthService.task(
      this.state.task_title,
      this.state.task_description,
      this.state.assigned_to,
      this.state.start_date,
      this.state.deadline,
      this.state.task_status
    ).then(
      items.push({
        task_title: this.state.task_title,
        task_description:this.state.task_description,
        assigned_to:this.state.assigned_to,
        start_date:this.state.start_date,
        deadline:this.state.deadline,
        task_status:this.state.task_status
      })
    );
    

    this.setState({
      items,
      task_title: '',
      task_description: '',
      assigned_to: '',
      start_date: '',
      deadline: '',
      task_status: '',
    });
  };
  handleInputChange = (e) => {
    let input = e.target;
    let name = e.target.name;
    let value = input.value;

    this.setState({
      [name]: value
    })
  };

  
  handleTask(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

      AuthService.task(
        this.state.task_title,
        this.state.task_description,
        this.state.assigned_to,
        this.state.start_date,
        this.state.deadline,
        this.state.task_status
      ).then(
        () => {
          this.props.history.push("/admin");
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
     
      if (this.state.auth.roleId==3){
                this.props.history.push("/admin2");
      }
      if (this.state.auth.roleId==1){
        this.props.history.push("/superadmin");
    }
      console.log(this.state.auth.username);
    })
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
  componentWillUnmount() {
    clearTimeout(this.isLoading);
 }

 timer = () => setTimeout(()=>{
  this.setState({loading: false})
}, 2300);

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const {loading} = this.state;
    const items = this.state.items;
    const { currentUser } = this.state;
    return (
      <Container>
      
      <div className="tab-wrapper">
    <div className='container-fluid' >
      <div className="mt-5">
        <div className="" style={{alignItems:"left"}}>

        <Tab.Container onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} defaultActiveKey="home" className="bg-dark sidebar">
            <Row>
            <Col md={4} className="d-none d-lg-block">
                <Nav style={{ backgroundColor: "gray"}} variant="pills pills-white" className="article__title type1 flex-column mt-5 bg-dark sidebar">
                  <Nav.Item >
                    <Nav.Link eventKey="home"   style={{color:"white"}}><span className="type2">Tasks List</span></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="contact" style={{color:"white"}}> <span className="type2">City Heads</span></Nav.Link>
                  </Nav.Item>

                </Nav>

              </Col>
              <Col sm={5} className="d-lg-none">
              <Nav  variant="pills "  className="nav  mb-3  bg-dark navbar">
                   <Nav.Item >
                    <Nav.Link eventKey="home"   style={{color:"white"}}><span className="type2">Tasks List</span></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="contact" style={{color:"white"}}> <span className="type2">City Heads</span></Nav.Link>
                  </Nav.Item>

                </Nav>

              </Col>
              <Col md={12}>
              {loading ?(<Loading/>):(
                <Tab.Content>
                  <Tab.Pane eventKey="home">
                  <TasksList className="mt-5"/>   </Tab.Pane>
                  

                  <Tab.Pane eventKey="contact">
                   <UserList1 />
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
        {/* <div className="container  pt-5 p-3 my-3 border">
            <header class="card-body text-center">
              <h2>{this.state.content}</h2>
            </header>
          </div> */}

        </Col> 
    </Row>
 
   
</Container>
    
    );
  }
}