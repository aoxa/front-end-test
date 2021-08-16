import React, { useEffect } from "react";
import {
    Container, ListGroup, ListGroupItem, Button, Row, Col
  } from 'reactstrap';
import { connect } from 'react-redux';
import { getNodes } from "../../actions/nodeAction";
import ListingItem from "./NodeListingItem"; 

const NodeList = (props) => {
    const { nodes } = props.node;
    const { getNodes } = props;

    const nodesLock = nodes.reduce((prev, current)=>prev+current.id, "");

    useEffect( ()=>{
        getNodes()
    }, [nodesLock]);

    return (
        <Container>
            <Row>
                <Col xs="10">
                    <ListGroup>
                        {nodes.map( (node, index) => (
                            <ListGroupItem key={node.id}>
                                <ListingItem node={node}></ListingItem>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
                <Col xs="2">
                    
                </Col>
            </Row>
            
        </Container>
    );
}

const mapStateToProps = (state) => ({
  node: state.node,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getNodes})(NodeList);