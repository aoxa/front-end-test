import React, { useEffect } from 'react';
import {
  Container, ListGroup, ListGroupItem, Button
} from 'reactstrap';

import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const ShoppingList = (props) => {
  const { items } = props.item;
  const { getItems } = props;

  const itemsLock = items.reduce((prev, current)=>prev+current._id, "");
  
  useEffect( ()=>{
    getItems();
  }, [itemsLock]);

  return (
    <Container>
        <ListGroup>
            {items.map( ({_id, name}) => (
                <ListGroupItem key={_id}>
                  { props.isAuthenticated ? <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={()=>{
                      props.deleteItem(_id);
                    } }>&times;</Button> : null }
                  
                    {name}
                </ListGroupItem>
            ) )}
        </ListGroup>
      </Container>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) =>

({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
