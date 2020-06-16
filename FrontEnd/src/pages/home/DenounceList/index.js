import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

import client from '../../../services/client';

import ResultModal from '../ResultModal';
import DenounceModal from './DenounceModal';

import './style.css';

export default function(){
    const [denounceList, setDenounceList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxNumberPages, setMaxNumberPages] = useState(1);

    const [openResultModal, setOpenResultModal] = useState(false);
    const [resultModalTitle, setResultModalTitle] = useState('Erro');
    const [resultModalBody, setResultModalBody] = useState('Erro');

    const [openDenounceModal, setOpenDenounceModal] = useState(false);
    const [clickedDenounce, setClickedDenounce] = useState({});


    useEffect(() => {
        client.get('denounce/pages')
        .then( response => setMaxNumberPages(response.data.pages) )
        .catch( e => {
            setOpenResultModal(true);
            setResultModalTitle('Erro');
            setResultModalBody('Erro ao carregar lista de denúncias, tente novamente mais tarde!');
        })

        client.get('denounce/list?page=1')
        .then( response => setDenounceList(response.data))
        .catch( e => {
            setOpenResultModal(true);
            setResultModalTitle('Erro');
            setResultModalBody('Erro ao carregar lista de denúncias, tente novamente mais tarde!');      
        })
        
    }, [])

    useEffect(() => {
        const url = 'denounce/list?page=' + currentPage.toString();
        client.get(url)
        .then( response => setDenounceList(response.data))
        .catch( e => {
            setOpenResultModal(true);
            setResultModalTitle('Erro');
            setResultModalBody('Erro ao carregar lista de denúncias, tente novamente mais tarde!');      
        })
    }, [currentPage])


    function showDenounce(key){
        setOpenDenounceModal(true);
        setClickedDenounce(denounceList[key]);
    }

    return(        
        <Container fluid>
            <Row id="bg-denounce-list" className="white-border">
                <Col>
                    <Row style={{height: '80%',}}>
                        <Col  className="mt-5 p-3">
                            <h1 className="text-center mb-4"> Lista de Denúncias </h1>
                            <Table hover responsive variant="light" >
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="hide-xs"> UF </th>
                                        <th className="hide-xs"> Cidade </th>
                                        <th className="hide-lg"> Tipo </th>
                                        <th className="hide-lg"> Status </th>
                                    </tr>
                                </thead>

                                <tbody id="denounces-list">
                                    {
                                        denounceList.map( (denounce, index) => (
                                                <tr key={index} onClick={() => showDenounce(index)}> 
                                                    <td> {denounce.title} </td> 
                                                    <td className="hide-xs"> {denounce.uf} </td> 
                                                    <td className="hide-xs"> {denounce.city} </td> 
                                                    <td className="hide-lg"> {denounce.type} </td>
                                                    <td className="hide-lg"> {denounce.status} </td>
                                                </tr>
                                        ))
                                    }
                                </tbody>
                                <DenounceModal
                                denounce={clickedDenounce} 
                                show={openDenounceModal} 
                                onHide={ () => { setOpenDenounceModal(false) }}/>
                            </Table>
                        </Col>
                    </Row>

                    <Row className="justify-content-center align-items-center" style={{height: '10%',}}>
                        <Button id="button-left" onClick={ () => { if(currentPage > 1) setCurrentPage(currentPage - 1) }} />
                        <span className="mt-1"> {currentPage} / {maxNumberPages} </span>
                        <Button id="button-right" onClick={ () => { if(currentPage < maxNumberPages) setCurrentPage(currentPage + 1) }} />
                    </Row>

                    <Row style={{height: '10%',}}>
                        <Col className="h-50 align-self-end image-credit">
                            <p className="mb-0"> Photo by Rob Curran on Unsplash </p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <ResultModal
            show={openResultModal}
            onHide={() => setOpenResultModal(false)}
            title={resultModalTitle}
            body={resultModalBody}
            />


        </Container>
    );
}