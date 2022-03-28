import React, { useState } from "react";
import { connect } from "react-redux";
import TimeAgo from 'react-timeago'
import {Link} from 'react-router-dom';
import { Col, Row } from "reactstrap";
import { tokenConfig } from "../auth/tokenConfig";
import useUserInfoEffect from "./getUserInfoEffect";
import TopicListing from "./TopicListing";

const ListingItem = (props) => {
    const {node} = props;

    let [author, setAuthor] = useState(undefined);

    const style = {
        width: '32px',
        borderRadius: "50%"
    }

    useUserInfoEffect(node.author, tokenConfig(props), setAuthor)

    return (
        <>
            <Row>
                <Col xs="1">{node.type.charAt(0).toUpperCase()}</Col>
                <Col xs="1">{author ? <img src={author.avatar + "?s=32"} style={style} /> : node.author.username}</Col>
                <Col xs="10">
                    <Row>                    
                        <Col xs="12" style={{fontSize: "12px"}}><strong>{node.author.username}</strong> &middot; <TimeAgo date={new Date(node.lastActiveDate)} /> </Col>
                    </Row>
                    <Row>                    
                        <Col xs="12"><Link to={`/node/${node.id}`}>{node.title}</Link></Col>
                    </Row>                    
                    <Row>
                        <Col xs="12">                            
                            {node.topics.map( (topic, index) => (                            
                                <TopicListing  key={topic.id} topic={topic} />                            
                            ))}                                                            
                        </Col>
                    </Row>
                </Col>            
            </Row>            
        </>        
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default connect(mapStateToProps) (ListingItem);