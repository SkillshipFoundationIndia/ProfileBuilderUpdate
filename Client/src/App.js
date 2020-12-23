import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import AuthService from "./services/auth.service";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';
import logo from '../src/img/logo2.png';
import Login from "./components/login.component";
import AdminLogin from "./components/login.admin.component";
import Register from "./components/register.component";
import AddUser from "./components/adduser.component";
import AddAdmin from "./components/addadmin.component";
import AddSuperAdmin from "./components/addsuperadmin";
import Admins2 from "./components/addadmin2.component";
import AddAdmin2 from "./components/admin/addadmin2.component";
import BoardTask from "./components/admin/user.component";
import Home from "./components/home.component";
import Profile from "./components/profile";
import AdminProfile from "./components/adminprofile";
import UserProfile from "./components/userprofile";
import BoardUser from "./components/user.component";
import BoardModerator from "./components/admin/board-moderator.component";
import BoardModerator2 from "./components/admin2/board-moderator.component";
import BoardSuperAdmin from "./components/superadmin/board-admin.component";
import Admin22 from "./components/superadmin/addadmin2.component";
import AdminAssign2 from "./components/admin/addadmin2";
import UserList2 from "./components/superadmin/user-list";
import UserList22 from "./components/superadmin/user-list-2";
import UserList12 from "./components/admin/user-list-2";
import Basic from "./components/basic";
import Basic2 from "./components/basic2";
import User from "./components/user";
import Wave from 'react-wavify';
import Task from "./components/admin2/task.component2";
import UserTask from "./components/user.task.component";
import Task2 from "./components/admin/task.component";
import TaskAdmin2 from "./components/admin2/task.component";
import AddTask from "./components/admin/addtask";
import AddTask2 from "./components/admin2/addtask2";
import RemoveUser from "./components/superadmin/remove-user";
import RemoveUser2 from "./components/admin2/remove-user";
import AddTaskAdmin from "./components/superadmin/addtask-admin";
import AddTaskAdmin2 from "./components/superadmin/addtask-admin2";
import TasksList from "./components/admin/task-list";
import TasksListAdmin from "./components/superadmin/task-list-admin";
import TasksAdmin from  "./components/superadmin/task.component-admin";
import Admin2Update from  "./components/superadmin/updateadmin2";
import AdminUpdate from  "./components/admin/updateadmin2";
import RemoveAdmin from  "./components/superadmin/remove-admin";
import GiveTask from  "./components/superadmin/give-task";
import GiveTask2 from  "./components/admin/give-task2";
import GiveTask3 from  "./components/admin2/give-task3";
import RemoveAdmin2 from  "./components/admin/remove-admin";
import BoardAdmin2 from "./components/admin2/user.component2";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      showSuperAdminBoard: false,
      showAdminBoard: false,
      showAdminBoard2: false,
      showUserBoard:false,
      currentUser: undefined,
      collapse: false,
      isWideEnough: false
    };
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    const admin = AuthService.getCurrentAdmin();

    if (admin) {
      this.setState({
        currentUser: admin,
        showSuperAdminBoard: admin.roles.includes("ROLE_SUPERADMIN"),
        showAdminBoard: admin.roles.includes("ROLE_ADMIN"),
        showAdminBoard2: admin.roles.includes("ROLE_ADMIN2")
      });
    }
    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user
      });
    }
  }

  logOut() {
      localStorage.removeItem("user");
    
 
      localStorage.removeItem("admin");
  }



  render() {
    const bg = {backgroundColor:   '#1c2a48'}
    const container = {height: 1300}
    const { currentUser, showSuperAdminBoard, showAdminBoard,showAdminBoard2,showUserBoard } = this.state;

    return (
      <div className="container1">
        
      <Router>
        <div>
       <header>
         
            <MDBNavbar style={{backgroundColor:"#1c2a48"}} dark expand="md" fixed="top">
              <MDBNavbarBrand href="/">
              <img src={logo} height="30" alt="mdb logo"/>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler style={{backgroundColor:""}} onClick={this.onClick} />}
              <MDBCollapse style={{backgroundColor:""}} isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                  <MDBNavItem >
                      <MDBNavLink to={"/home"}>Home</MDBNavLink>
                  </MDBNavItem>
                 
                  {showSuperAdminBoard && (
               <MDBNavItem> 
                   <MDBNavLink to={"/superadmin"}>Dashboard</MDBNavLink>
                  </MDBNavItem>
              )}
                         {showAdminBoard && (
                  <MDBNavItem>
                     <MDBNavLink to={"/admin"}>Dashboard </MDBNavLink>
                  </MDBNavItem>
              )}
       {showAdminBoard && (
                  <MDBNavItem>
                     <MDBNavLink to={"/task"}>Assigned Tasks</MDBNavLink>  
                  </MDBNavItem>
              )}

              {showAdminBoard2 && (
                  <MDBNavItem>
                     <MDBNavLink to={"/admin2"}>Dashboard</MDBNavLink>
                  </MDBNavItem>
              )}
                {showAdminBoard2 && (
                  <MDBNavItem>
                  <MDBNavLink to={"/boardadmin"}>Assigned Tasks</MDBNavLink>  
               </MDBNavItem>
              )}


          {showUserBoard && (
                <MDBNavItem>
                       <MDBNavLink to={"/user"}>Assigned Tasks</MDBNavLink>                   
                  </MDBNavItem>
              )}
                 
                 
                 
                </MDBNavbarNav>
                <MDBNavbarNav right>
                {(currentUser) ? (
              <div className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.email}
                  </Link>
                </li>
                <li className="nav-item">
                <a href="login" className="nav-link" onClick={this.logOut}>
                    LogOut 
                  </a> 
                </li>
              </div>
            ) : (
              <div className="navbar-nav " >
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              </div>
            )}
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
        
        </header>
        </div>
        <div>
          <div className="container mt-5">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/adminlogin" component={AdminLogin} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/adduser" component={AddUser} />
              <Route exact path="/addadmin" component={AddAdmin} />
              <Route exact path="/addsuperadmin" component={AddSuperAdmin} />
              <Route exact path="/admins2" component={Admins2} />
              <Route exact path="/admin22" component={Admin22} />
              <Route exact path="/adminassign" component={AdminAssign2} />
              <Route exact path="/addadmin2" component={AddAdmin2} />
              <Route exact path="/basic" component={Basic} />
              <Route path="/basic2" component={Basic2} />
              <Route path="/userlist2/:id" component={UserList2} />
              <Route path="/userlist22/:id" component={UserList22} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/userlist12/:id" component={UserList12} />
              <Route exact path="/viewprofile/:id" component={AdminProfile} />       
              <Route exact path="/userprofile/:id" component={UserProfile} />                 
              <Route path="/user" component={BoardUser} />
              <Route path="/boardadmin" component={BoardAdmin2} />
              <Route path="/task" component={BoardTask} />
               <Route path="/userComponent" component={User} />
              <Route exact path="/admin" component={BoardModerator} />
              <Route exact path="/admin2" component={BoardModerator2} />
              <Route path="/superadmin" component={BoardSuperAdmin} />
              <Route exact path={["/", "/tasks"]} component={TasksList} />
              <Route exact path="/tasks-admin/:id" component={TasksAdmin} />
              <Route exact path="/updateAdmin2/:id" component={Admin2Update} />
              <Route exact path="/updateAdmin/:id" component={AdminUpdate} />
              <Route exact path="/removeadmin/:id" component={RemoveAdmin} />
              <Route exact path="/givetask/:id" component={GiveTask} />
              <Route exact path="/givetask2/:id" component={GiveTask2} />
              <Route exact path="/givetask3/:id" component={GiveTask3} />
              <Route exact path="/removeadmin2/:id" component={RemoveAdmin2} />
              <Route exact path="/removeuser/:id" component={RemoveUser} />
              <Route exact path="/removeuser2/:id" component={RemoveUser2} />
              <Route exact path="/add" component={AddTask} />
              <Route exact path="/add2" component={AddTask2} />
              <Route exact path="/addtask" component={AddTaskAdmin} />
              <Route path="/tasks/:id" component={Task} />
              <Route exact path="/addtask2" component={AddTaskAdmin2} />
              <Route path="/taskadmin2/:id" component={TaskAdmin2} />
              <Route path="/usertasks/:id" component={UserTask} />
              <Route path="/tasks2/:id" component={Task2} />
            </Switch>
          </div>
        </div>
      
      </Router>
     
      </div>
    );
  }
}

export default App;
