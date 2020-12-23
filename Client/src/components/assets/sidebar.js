import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import '../assets/css/dashboard.css'

const Side = props => {


    return (
        <>

            <Nav className="col-md-12  d-md-block bg-dark sidebar"
            activeKey="/home"
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link className="text-white d-md-block" href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  className="text-white" href="/profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  className="text-white" href="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link   className="text-white" href="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
            </Nav>
            
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar