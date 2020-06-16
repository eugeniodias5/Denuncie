import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

import client from '../../../../services/client';

import './style.css';

export default function(props){
    const { denounce,  ...generalProps} = props;
    const date = new Date(denounce.createdAt);

    const [ currentComment, setCurrentComment ] = useState("");
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        if(props.show){
            client.get(`comment/list/${denounce.idDenounce}`)
            .then( response => setComments(response.data) )
            .catch( err => { console.log(err) })
        }
    }, [props.show, denounce.idDenounce]);

    function registerComment(e) {
        e.preventDefault();

        document.getElementById("current-comment").setAttribute('placeholder', 'Escreva um comentário');
        document.getElementById("current-comment").style.border = '';

        if(!currentComment){
            document.getElementById("current-comment").setAttribute('placeholder', 'Preencha este campo');
            document.getElementById("current-comment").style.border = '2px solid red';
            return;
        }

        const denounceComment = {
            "idDenounce": denounce.idDenounce,
            "body": currentComment, 
        }

        client.post('comment/register', denounceComment)
            .then(res => 
                { 
                    setCurrentComment(''); 
                    setComments([res.data, ...comments]);
                })

    }

    return(
        <Modal 
        {...generalProps} 
        centered
        size="xl"
        id="denounce-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="w-75 text-center"> {denounce.title} </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <p> UF: {denounce.uf} </p>
                    </Col>

                    <Col md={6}>
                        <p> Cidade: {denounce.city} </p>
                    </Col>

                </Row>

                <Row>
                    <Col lg={6}>
                        <p> Endereço: {denounce.neighborhood} </p>
                    </Col>

                    <Col lg={6}>
                        <p> Data: {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} </p>
                    </Col>

                </Row>

                <Row>
                    <Col md={6}>
                        <p> Tipo: {denounce.type} </p>
                    </Col>

                    <Col md={6}>
                        <p> Status: {denounce.status} </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <p> {denounce.description} </p>
                    </Col>
                </Row>

                <Row>
                    {comments && comments.length > 0 
                    ?
                        <Col id="comments">
                            <h4 className="comments-title"> {comments.length} Comentários  </h4>
                            <ListGroup>
                            {
                                comments.map( comment => {
                                    const commentDate = new Date(comment.createdAt);
                                    const date = `${commentDate.getDate()}/${commentDate.getMonth() + 1}/${commentDate.getFullYear()}`;
                                    return(
                                        <ListGroup.Item key={comment.idComment}>
                                            <Row className="date justify-content-end"> <p> {date} </p> </Row>
                                            <Row className="pr-4"> <p>{comment.body}</p> </Row>
                                        </ListGroup.Item>
                                        )
                                    })
                            }
                                
                            </ListGroup>
                        </Col>
                    : 
                        <Col></Col>
                    }
                </Row>

            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-start">
                <Form className="w-100 mx-3 my-0">
                    <Form.Group as={Row} >
                        <Form.Control
                            id="current-comment"
                            as="textarea"
                            maxLength="500"
                            className="comment-box"
                            placeholder="Escreva um comentário"
                            type="text"
                            value={currentComment}
                            onChange={ e => setCurrentComment(e.target.value) }
                        />
                    </Form.Group>
                </Form>

                <Button className="ml-auto mr-3" variant="light" size="lg" onClick={registerComment} > Comentar </Button>

            </Modal.Footer>
        </Modal>
    );
}