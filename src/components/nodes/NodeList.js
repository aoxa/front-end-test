import React, { useEffect } from "react";
import {
    Container, ListGroup, ListGroupItem, Row, Col
  } from 'reactstrap';
import { connect } from 'react-redux';
import { getNodes } from "../../actions/nodeAction";
import ListingItem from "./NodeListingItem"; 
import Pager from "../Pager";

const NodeList = (props) => {
    const { nodes, page, pageCount } = props.node;
    const { getNodes } = props;

    const nodesLock = nodes.reduce((prev, current)=>prev+current.id, "");

    useEffect( ()=>{
        getNodes()
    }, [nodesLock, getNodes]);

    return (
        <Container>
            <Row>
                <Col xs="10">
                    <ListGroup>
                        {nodes.map( (node) => (
                            <ListGroupItem style={{border: "unset"}} key={node.id}>
                                <ListingItem node={node}></ListingItem>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
                <Col xs="2">
                    
                </Col>
            </Row>
            <Pager page={page} total={pageCount}></Pager>
        </Container>
    );
}

const mapStateToProps = (state) => ({
  node: state.node,
  page: state.page,
  total: state.pageCount,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getNodes})(NodeList);