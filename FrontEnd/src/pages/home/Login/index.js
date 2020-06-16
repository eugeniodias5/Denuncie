import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import client from '../../../services/client';

import './style.css';
import RegisterModal from '../Register/RegisterModal';
import ResultModal from '../ResultModal';

export default function Login(){

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ openRegisterModal, setOpenRegisterModal ] = useState(false);

    const [ openResultModal, setOpenResultModal] = useState(false);
    const [ resultModalTitle, setResultModalTitle] = useState('');
    const [ resultModalBody, setResultModalBody] = useState('');


    function checkInputs(){
        let inputs = document.getElementsByClassName('login-input');

        let inputsAreNotEmpty = true;
        for(let i = 0; i < inputs.length; i++){
            inputs[i].classList.remove('red-border');

            if(!inputs[i].value){
                inputsAreNotEmpty = false;
                inputs[i].classList.add('red-border');
                inputs[i].setAttribute("placeholder", "Preencha este campo");
            }
        
        }

        return inputsAreNotEmpty;
    }

    function verifyLogin(e){
        e.preventDefault();

        if(checkInputs()){
            const user = { email, password };
            const route = 'user/login';

            client.post(route, user)
            .then( res => { 
                localStorage.setItem('token', res.data.token);  
                setOpenResultModal(true);
                setResultModalTitle('Sucesso');
                setResultModalBody('Usuário logado com sucesso.');
            })
            .catch( e => {
                setOpenResultModal(true);
                setResultModalTitle('Erro');
                setResultModalBody('Não foi possível fazer login. E-mail ou senha incorretos.');
            });

        }
        
    }

    return (
        <Container fluid>

            <Row> 
                <Col md={{order: "last", number: "6" }} id="bg-login" className="white-border login-input">
                    <Row className="h-100 ml-4 p-5">
                        <Col className="my-auto">    
                            <Form>
                                <h1 className="text-center mb-4"> Login </h1>
                                <Form.Group as={Row}>
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control 
                                    className="login-input"
                                    value={email} 
                                    type="email" 
                                    placeholder="Digite seu e-mail" 
                                    onChange={ e => setEmail(e.target.value) } 
                                    />
                                </Form.Group>

                                <Form.Group as={Row} className="mt-4">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control
                                    className="login-input"
                                    value={password}
                                    type="password"
                                    placeholder="Digite sua senha"
                                    onChange={ e =>  setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Row>
                                    <Link to="#" className="login-link my-3" onClick={() => { setOpenRegisterModal(true); }}> Não tenho cadastro </Link>
                                </Row>

                                <Row>
                                    <Button onClick={verifyLogin} className="mx-auto mt-4" size="lg" variant="outline-light"> ENTRAR </Button>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Col>

                <Col md={6} className="white-border">
                    <Row className="login-info">
                        <Col>
                            <Row className="p-3" style={{height: "90%",}}>
                                <Col className="my-auto" style={{textAlign: "justify"}}>
                                    <h1> Faça a cidade mais segura! </h1>
                                    <p className="mt-3"> Ajude pessoas que passam pelo local. </p>
                                </Col>
                            </Row>

                            <Row style={{height: '10%'}}>                           
                                <Col className="h-50 align-self-end image-credit">
                                    <p>Photo by Omid Armin on Unsplash</p>
                                </Col>
                            </Row>
                        </Col> 
                    </Row>    
                </Col>
                
            </Row>

            <RegisterModal 
            show={ openRegisterModal } 
            onHide={ () => { setOpenRegisterModal(false) } }
            />

            <ResultModal 
            show={ openResultModal } 
            onHide={ () => { setOpenResultModal(false) } }
            title={resultModalTitle}
            body={resultModalBody}
            />

        </Container>


    );
    
}