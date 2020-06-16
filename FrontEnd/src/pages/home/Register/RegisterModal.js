import React, { useState, Fragment } from 'react';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';

import client from '../../../services/client';

import ResultModal from '../ResultModal';

import './style.css';

export default function RegisterModal(props) {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ openResultModal, setOpenResultModal ] = useState(false);
    const [resultModalTitle, setResultModalTitle] = useState("");
    const [resultModalBody, setResultModalBody] = useState("");

    function verifyRegister(){
        let inputs = document.getElementsByClassName('register-input');

        let inputsAreNotEmpty = true;
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style = "";
            
            if(!inputs[i].value){
                inputsAreNotEmpty = false;
                inputs[i].style.border = "3px solid red";
                inputs[i].setAttribute("placeholder", "Preencha este campo");
            }
        
        }

        if(inputsAreNotEmpty){
            const user = { name, email, password}

            const route = 'user/register';

            client.post(route, user)
            .then(() => {
                setOpenResultModal(true);
                setResultModalTitle("Sucesso!")
                setResultModalBody("Cadastro feito com sucesso!")
            })
            .catch(() => {
                setOpenResultModal(true);
                setResultModalTitle("Erro!")
                setResultModalBody("Houve um erro no cadastro. Tente novamente mais tarde")
            })

            props.onHide();
        }
    }

    return(
         <Fragment>   
            <Modal
                {...props}
                size = "lg"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastre-se </Modal.Title>
                    </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Form.Group as={Row}>
                                    <Col sm={2}>
                                        <Form.Label className="modal-label my-auto"> Nome: </Form.Label>
                                    </Col>
                                    <Col sm={10} className="my-auto">
                                        <Form.Control
                                            placeholder="Digite seu nome"
                                            type="text"
                                            className="register-input"
                                            value={name}
                                            onChange={ e => setName(e.target.value) }
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={2}>
                                        <Form.Label className="modal-label my-auto"> Email: </Form.Label>
                                    </Col>
                                    <Col sm={10} className="my-auto">
                                        <Form.Control
                                            placeholder="Digite seu email"
                                            type="email"
                                            className="register-input"
                                            value={email}
                                            onChange={ e => {setEmail(e.target.value)} }
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={2}>
                                        <Form.Label className="modal-label my-auto"> Senha: </Form.Label>
                                    </Col>
                                    <Col sm={10} className="my-auto">
                                        <Form.Control
                                        placeholder="Digite sua senha"
                                        type="password"
                                        className="register-input"
                                        value={password}
                                        onChange={ e => {setPassword(e.target.value)} }
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button className="ml-auto mr-3" variant="danger" onClick={ verifyRegister } size={"lg"}> CADASTRAR </Button>
                        </Modal.Footer>
                </Modal>

            <ResultModal
            title={resultModalTitle}
            body={resultModalBody}
            show={openResultModal}
            onHide={ () => { setOpenResultModal(false);  window.location.reload(); }}
            />
        </Fragment>
        
        );
    }