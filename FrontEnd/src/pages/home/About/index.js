import React from 'react';
import {Col, Row, Container} from 'react-bootstrap';

import './style.css';

export default function(){
    return(
        <Container fluid className="white-border">
            <Row id="about">
                <Col className="h-100">
                    <Row className="p-3" style={{height: '90%'}}>
                        <Col className="align-self-center">
                            <h1> Sobre </h1>
                            <p>
                                Denuncie! É uma plataforma de denúncias anônimas online. Sabendo que muitas pessoas não denunciam crimes por medo ou falta de
                                informação, a ideia é que o Denuncie! seja um portal simples para denunciar e se alertar sobre eventuais crimes que aconteceram
                                na região. Vale ressaltar que o site ainda está em desenvolvimento.  
                            </p>
                        </Col>
                    </Row>

                    <Row style={{height: '10%'}}>
                        <Col className="h-50 pl-3 align-self-end image-credit">
                            <p className="mb-0"> Photo by Tim Gouw on Unsplash </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}