import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ItemModal = (props) => {
  const [state, setState] = useState ({
    modal: false,
    name:''
  });

  const toggle = () => {
    setState({...state, modal: !state.modal});
  }

  const submitAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      name: state.name
    }

    //use add item action
    props.addItem(newItem);

    toggle();
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div>
      {props.isAuthenticated ? <Button
        color="dark"
        style={ {marginBottom: '2rem'} }
        onClick={toggle}
        >Add Item</Button> : <h4 className='mb-3 ml-4'>Please log in to manage items.</h4>}
      
      <Modal  isOpen={state.modal}
          toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Add to the Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={submitAddItem}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add to shopping list"
                  onChange={ onChange } />
                  <Button
                    color="dark" style={{marginTop: '2rem'}} block>
                      Add Item
                      </Button>
              </FormGroup>
            </Form>
          </ModalBody>
      </Modal>
    </div>
  );
};

ItemModal.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addItem})(ItemModal);
