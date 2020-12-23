import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import Sidebar from "../components/assets/sidebar.js";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import growth from '../img/growth.svg';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "./assets/css/table.css"
import "../App.css"
import animationData from './lotties/group-working.json';
import Lottie from 'react-lottie';
import '../components/assets/css/dashboard.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
const API = 'http://localhost:8080/api/auth/donetasks';

const Loading =()=>
  <div className="loading">
    <div></div>
    <div></div>
  </div>  


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.retrieveRanks = this.retrieveRanks.bind(this);
    this.retrieveAdmins = this.retrieveAdmins.bind(this);
    
    this.state = {
      content: "",
      users:[],
      arr:[],
      am:[],
      lists:[],
      sorted:[],
      ranks:[],
      loading: true,
    };
  }
  
  componentDidMount() {
    this.isLoading = setTimeout(()=>{this.setState({loading: false})}, 2300);
    // fetch(API)
    // .then(response => response.json())
    // .then(data => this.setState({ users: data }));
    this.retrieveRanks();

    this.retrieveTasks();
    this.retrieveAdmins();
    // this.rank();

// function foo(users) {
//   var a = [],
//     b = [],
//     prev;

//     data.sort();
//   for (var i = 0; i < data.length; i++) {
//     if (data[i] !== prev) {
//       a.push(data[i]);
//       b.push(1);
//     } else {
//       b[b.length - 1]++;
//     }
//     prev = data[i];
//   }

//   return [a, b];
// }

// var result = foo(users);
// console.log(result)

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
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

  retrieveTasks() {
    AuthService.getAllDoneTasks()
      .then(response => {
        this.setState({
          users: response.data,
          am: this.state.users,
         
          // arr:[{rank:'1'},{rank:'2'},{rank:'3'},{rank:'4'},{rank:'5'}]
        })
        var sorted = this.state.users.slice().sort(function(a,b){return b-a})
        var rankss = this.state.users.map(function(v){ return sorted.indexOf(v)+1 });
        console.log(rankss);
        for(var i=0;i<5;i++){
            this.state.am.push(this.state.users[i],{rank:i+1})
        }
        
      console.log(this.state.am);
      })
      .catch(e => {
        console.log(e);
      });
      
  }
  retrieveRanks() {
    AuthService.getAllRanksTasks()
      .then(response => {
        this.setState({
          ranks: response.data,
        })
      
      console.log(this.state.ranks);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  retrieveAdmins() {
    AuthService.AdminsList()
      .then(response => {
        this.setState({
          admins: response.data,
          nw:[]
        })
        var name=[],role=[],id=[],nw=[],done=[],score=[],rank=[];
        for(var j=0;j<this.state.ranks.length;j++){
      for(var i=0;i<this.state.admins.length;i++){
        if(this.state.ranks[j].adminId==this.state.admins[i].id)
        {
          if(this.state.admins[i].roleId=='2')
          {
            role.push('Region Head')
            name.push(this.state.admins[i].username)
          }
          if(this.state.admins[i].roleId=='3')
          {
            role.push('City Head')
            name.push(this.state.admins[i].username)
          }
        }
      }
    }
   
    for(var j=0;j<5;j++){
      
       id.push(this.state.ranks[j].adminId)
       done.push(this.state.ranks[j].done)
       score.push(this.state.ranks[j].score)
       rank.push(this.state.ranks[j].rank)
      
      }
      for(var j=0;j<5;j++){
            nw.push({name:name[j],role:role[j],done:done[j],score:score[j],rank:rank[j]});
          }
    console.log(name)
    console.log(nw)
    this.setState({
      lists: nw,
    })
    
    
      console.log(this.state.admins);
      console.log(this.state.lists);
      })
      .catch(e => {
        console.log(e);
      });
      
  }

  
  render() {
    const {loading} = this.state;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    const {board,arr,nw,lists,amam } = this.state;
   
   
    return (
     
      <Container fluid>
                <Row>
                   <Col md={1}>
                  
                   <div  className="sidebar d-none d-lg-block"  style={{alignItems:"left"}}>
              
      <Lottie 
	    options={defaultOptions}
        height={550}
        width={550}
        
      />
    </div>
                 
                     </Col><Col md={2}></Col>
                        <Col md={9}>
                      <div  className="d-lg-none"  style={{alignItems:"left"}}>
                        <Lottie 
                        options={defaultOptions}
                          height={300}
                          width={300}
                          
                        />
                      </div>
                      <h2 id='title' className="mt-5 text-center">Leader Boards</h2>
                      <h4 id='title' className="mt-5">Region/City Head Board</h4>
                        <Table id='students' className="" >
      <Thead>
        <Tr>
        
          <Th>Username</Th>
          {/* <Th>Position</Th> */}
          <Th>Position</Th>
          <Th>Task Done</Th>
          <Th>Score</Th>
          <Th>Rank</Th>
        </Tr>
      </Thead>
      {loading ?(<Loading/>):(
      <Tbody>
     
          {this.state.lists.map((item) => (
        <Tr key={item.id}>
          {/* <Td></Td> */}
          {Object.values(item).map((val) => (
            <Td>{val}</Td>
           
          ))}           
          
      
        </Tr>
      ))}
    
      </Tbody>)}
    </Table>
      <h4 id='title' className="mt-3">Campus CEO Board</h4>
      <Table id='students' className="" >
      <Thead>
        <Tr>
        
          <Th>Username</Th>
          {/* <Th>Position</Th> */}
          <Th>Task Done</Th>
          <Th>Score</Th>
          <Th>Rank</Th>
        </Tr>
      </Thead>
      {loading ?(<Loading/>):(
      <Tbody>
          {this.state.users.map((item) => (
        <Tr key={item.id}>
          {/* <Td></Td> */}
          {Object.values(item).map((val) => (
            <Td>{val}</Td>
           
          ))}           
          
             {/* {()=> {
               for(var i=0;i<5;i++)
               return(
                 <Td >{i}</Td>
             )}} */}
        </Tr>
      ))}
    
      </Tbody>)}
    </Table>
    
  
                        </Col> <Col> 
                                      </Col>
                          
                                      {/* <table>
      <tr key={"header"}>
        {Object.keys(this.state.users).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {this.state.users.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </table> */}
                                   
                    </Row>
       
                </Container>
      
    );
  }
}
