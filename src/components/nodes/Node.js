import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { tokenConfig } from '../auth/tokenConfig';
import useUserInfoEffect from './getUserInfoEffect';
import { Container,Row, Col } from 'reactstrap';

const SubNodeContet = (props) => {
    const { subNode } = props;
    let [author, setAuthor] = useState(undefined)
    
    const avatarStyle = {
        width: '35px',
        borderRadius: "50%"
    }

    useUserInfoEffect(subNode.author, tokenConfig(props), setAuthor);

    return (
        <Row>
            <Col xs="2">{author ? <img src={author.avatar} style={avatarStyle} /> : subNode.author.username}</Col>
            <Col xs="10">{subNode.body}</Col>
        </Row>
    )
}

const NodeContent = (props) => {
    const {node} = props;

    let [currentAnwers, setCurrentAnswers] = useState(undefined);
    let [author, setAuthor] = useState(undefined);
    let [activity, setActivity] = useState(undefined);

    const style = {
        color: '#666'
    }

    const avatarStyle = {
        width: '35px',
        borderRadius: "50%"
    }

    useEffect(()=>{
        const config = tokenConfig(props)
        axios.get(
            `/services/v2/question/${props.match.params.nodeid}/answer.json`, config)
        .then( res => setCurrentAnswers(res.data) )
        .catch(err=>console.log(err))
    } ,[] );

    useUserInfoEffect(node.author, tokenConfig(props), setAuthor);

    useEffect(()=>{
        const config = tokenConfig(props)        
        axios.get(
            `/services/v2/action/${node.lastEditedAction}.json`, config)
        .then( res => setActivity(res.data) )
        .catch(err=>console.log(err))
    } ,[] );

    return (
        <Container> 
            <Row>
                <Col xs="2">{author ? <img style={avatarStyle} src={author.avatar} alt={author.username} /> : node.author.username}</Col>
                <Col xs="10">
                    <span style={style}>{activity ? activity.user.username : node.author.username}</span> {activity ? activity.verb : ""} &middot; {node.title}
                </Col>
            </Row>
            <Row>
                <Col xs="2"></Col>
                <Col xs="10">{node.body}</Col>
            </Row>
            <Row>
                <Col xs="12">{`${node.answerCount} Answers`}</Col>
            </Row>
            {currentAnwers && currentAnwers.list.map(element => {
                return (<SubNodeContet key={element.id} subNode={element} {...props} />)
            })}
            
        </Container>
    )
}

const Node = (props) => {

    let [current, setCurrent] = useState(undefined);
    

    useEffect(()=>{
        const config = tokenConfig(props)        
        axios.get(
            `/services/v2/question/${props.match.params.nodeid}.json`, config)
        .then( res => setCurrent(res.data) )
        .catch(err=>console.log(err))
    } ,[] );

    return (
    <Container>
        <Row>
            <Col xs="9">
                {current !== undefined ? <NodeContent node={current} {...props} /> : "Loading.."}
            </Col>
            <Col xs="3">Widgets</Col>
        </Row>        
    </Container>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth,
    auth: state.auth
  });

export default connect(mapStateToProps)(Node);