import {Navbar, Nav} from "react-bootstrap";
import React, {Component} from "react";
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
class Navigation extends Component{
    render() {
      console.log(this.props.cart)
        return (
            <Navbar bg="dark" variant="dark" expand="lg" id='navBar'>
              <Navbar.Brand href="#home">WEB SERVICES</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              {this.props.login &&(
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                    <Link className='btn btn-primary navButton' to='/'>Add Data</Link>
                    <Link className='btn btn-primary navButton' to='/showData'>Show Data</Link>
                    <Button className='btn btn-primary navButton' onClick={() => this.props.handleLogout()}>Logout
                    </Button>
                  </Nav>
                </Navbar.Collapse>
              )}
            </Navbar>
        );
    }
}

export default Navigation;