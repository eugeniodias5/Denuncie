import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ResultModal(props){

    const { title, body, ...generalProps} = props

    return (
        <Modal {...generalProps}>
            <Modal.Header closeButton>
                <Modal.Title> {props.title} </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{fontSize: '18px',}}>
                <p> {props.body} </p>
            </Modal.Body>

            <Modal.Footer>
                <Button className="ml-auto mr-3" variant="danger" size="lg"  onClick={generalProps.onHide} > Continuar </Button>
            </Modal.Footer>
        </Modal>
    )
}