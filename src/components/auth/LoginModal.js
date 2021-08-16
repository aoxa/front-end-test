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


import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorsActions';
import { loginAH } from '../../actions/authActions';


const LoginModal = (props) => {
    const [state, setState] = useState ({
      modal: false,
      name:'',
      email: '',
      password:''
    });

    const updateMessage = (message) => {
        setState({...state, msg: message});
    }

    const {error, isAuthenticated} = props;
    
    const message = error.msg.msg;
  
    useEffect(()=>{
        if( error && error.id === 'LOGIN_FAIL') {
          updateMessage(error.msg.msg)
        }        
  
    }, [message, error]); 
  
    //we use layout here cause we need the render flow to finish before we clear up the modal value.
    useLayoutEffect(()=>{
      if(state.modal && isAuthenticated) {
        setState({...state,  modal: false })
      }
    }, [isAuthenticated, state])
  
    const toggle = () => {
      props.clearErrors();
      setState({...state, msg: null, modal: !state.modal});
    }
  
    const onChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  
    const onSubmit = (e) => {
        e.preventDefault();
          
        props.loginAH(state);
  
    };
  
    return (
      <div>
        <NavLink onClick={toggle} href="#">Login</NavLink>
        <Modal  isOpen={state.modal}
            toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Login
            </ModalHeader>
            <ModalBody>
                {state.msg  ? <Alert color='danger'>{state.msg}</Alert> : null}
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="input"
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
                        Login
                        </Button>
                </FormGroup>
              </Form>
            </ModalBody>
        </Modal>
      </div>
    );
  }
  
  const mapStateToProps = state => ({
      isAuthenticated: state.auth.isAuthenticated,
      error: state.error
  });
  
  export default connect(mapStateToProps, 
      {loginAH, clearErrors})
      (LoginModal);