import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';

const AppNavbar = (props) => {
  const [ state, setState ] = useState({
    isOpen: false
  });

  const toggle = () =>{
    setState( { isOpen: !state.isOpen });
  }

  const { isAuthenticated, user} = props.auth;
  
  const authLinks = (
    <>
      <NavItem>
        <Logout />
      </NavItem>
      <NavItem>
        {isAuthenticated ? <NavLink><img style={{borderRadius: "50%"}} width="24" height="24" alt={user.username} src={user.avatar+"?s=24"}></img></NavLink> : null}
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  )

  return (
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Site Name</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={state.isOpen} navbar>
          </Collapse>
          <Nav className="ml-auto" navbar>
            {isAuthenticated? authLinks : guestLinks}
          </Nav>            
        </Container>
      </Navbar>
    );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(AppNavbar);
