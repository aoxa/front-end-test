import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorsActions';

const RegisterModal = (props) => {
    
  const [state, setState] = useState ({
    modal: false,
    name:'',
    email: '',
    password:''
  });

  const {error, isAuthenticated } = props; 

  const updateMessage = (message) => {
    setState({...state, msg: message})
  }

  const message = error.msg.msg;

  useEffect(()=>{
      if( error.id === 'REGISTER_FAIL') {
        updateMessage(message)
      }      

  }, [error, message]); 

  //we use layout here cause we need the render flow to finish before we clear up the modal value.
  useLayoutEffect(()=>{
    //console.log(state, isAuthenticated)
    if(state.modal && isAuthenticated) {
      setState({...state, modal: false })
    }
  }, [isAuthenticated, state]);
  
  const toggle = () => {
    props.clearErrors();
    setState({...state, msg:null, modal: !state.modal});
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
      e.preventDefault();

      const {name, email, password} = state;
      const newUser = {name, email, password};

      props.register(newUser);

  }

  return (
    <div>
      <NavLink onClick={toggle} href="#">Register</NavLink>
      <Modal  isOpen={state.modal}
          toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Register
          </ModalHeader>
          <ModalBody>
              {state.msg  ? <Alert color='danger'>{state.msg}</Alert> : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={ onChange } />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={ onChange } />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className='mb-3'
                  onChange={ onChange } />
                  <Button
                    color="dark" style={{marginTop: '2rem'}} block>
                      Register
                      </Button>
              </FormGroup>
            </Form>
          </ModalBody>
      </Modal>
    </div>
  );
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, 
    {register, clearErrors})
    (RegisterModal);
