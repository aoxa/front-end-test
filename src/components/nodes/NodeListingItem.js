import React, { useState } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { Col, Row } from "reactstrap";
import { tokenConfig } from "../auth/tokenConfig";
import useUserInfoEffect from "./getUserInfoEffect";

const ListingItem = (props) => {
    const {node} = props;

    let [author, setAuthor] = useState(undefined);

    const style = {
        width: '35px',
        borderRadius: "50%"
    }

    useUserInfoEffect(node.author, tokenConfig(props), setAuthor)

    return (
        <Row>
            <Col xs="1">{node.type}</Col>
            <Col xs="1">{author ? <img src={author.avatar} style={style} /> : node.author.username}</Col>
            <Col xs="10"><Link to={`/node/${node.id}`}>{node.title}</Link></Col>            
        </Row>
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default connect(mapStateToProps) (ListingItem);