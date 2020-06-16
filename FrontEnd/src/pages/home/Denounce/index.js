import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import axios from 'axios';

import client from '../../../services/client';

import ResultModal from '../ResultModal';

import './style.css';

export default function(){

    const [ title, setTitle] = useState('');
    const [ type, setType] = useState('AMEAÇA');
    const [ status, setStatus] = useState('TENTATIVA');
    const [ uf, setUf] = useState('AC');
    const [ city, setCity] = useState('');
    const [ neighborhood, setNeighborhood] = useState('');
    const [ description, setDescription ] = useState('');

    const [ openResultModal, setOpenResultModal ] = useState(false);
    const [resultModalTitle, setResultModalTitle] = useState("");
    const [resultModalBody, setResultModalBody] = useState("");

    const ufs = [ 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ',
                  'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

    const [ cities, setCities ] = useState([]);

    useEffect(() => {
        setUf('AC');
    }, [])

    useEffect(() => {
        const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + uf + '/municipios';
        
        document.getElementById('cities').innerHTML = '';

        axios.get(url)
        .then((response) => {
            setCities(response.data);
            setCity(response.data[0].nome);
        })
        .catch(() => setOpenResultModal(true));

    }, [uf]);

    useEffect(() => {
        cities.sort( (a, b) => {
            return a.nome.localeCompare(b.nome);
        })
        
        cities.forEach( (city, index) => { 
            document.getElementById('cities').innerHTML += `<option key=${index} value="${city.nome}"> ${city.nome} </option> `;
        });
    }, [cities])

    function checkObrigatoryData(){
        let obrigatoryDataEmpty = false;

        const titleHtml = document.getElementById('title')
        const neighborhoodHtml = document.getElementById('neighborhood')

        titleHtml.classList.remove('red-border');
        neighborhoodHtml.classList.remove('red-border')

        if(title.length <= 5){
            titleHtml.classList.add('red-border');
            titleHtml.setAttribute('placeholder', 'Preencha este campo');

            obrigatoryDataEmpty = true;
        }

        if(neighborhood.length <= 5){
            neighborhoodHtml.classList.add('red-border');
            neighborhoodHtml.setAttribute('placeholder', 'Preencha este campo');

            obrigatoryDataEmpty = true;
        }

        return obrigatoryDataEmpty;
    }

    function registerDenounce(e) {
        const obrigatoryDataEmpty = checkObrigatoryData();

        if(obrigatoryDataEmpty) return;

        e.preventDefault();
        const denounce = { uf, city, neighborhood, status, type, title, description};
        client.post('denounce/register', denounce)
        .then(() => {
            setOpenResultModal(true);
            setResultModalTitle('Sucesso');
            setResultModalBody('Sua denúncia foi feita!');
        })
        .catch((e) => {
            setOpenResultModal(true);
            setResultModalTitle('Erro');
            setResultModalBody('Erro ao fazer a denúncia, tente novamente mais tarde!');     
        })
    }

    return (
        <Container fluid>
            <Row id="denounce-bg">
                <Col md={6} className="white-border">
                    <Row className="mt-5 p-3">
                        <Col className="d-flex justify-content-center">
                            <h1> Faça sua denúncia! </h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="mx-4 p-4">
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label> Título: </Form.Label>
                                        <Form.Control id="title" type="text" minLength="5" maxLength="85" onChange={ e => setTitle(e.target.value)}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label> Tipo: </Form.Label>
                                        <Form.Control as="select" onChange={ e => setType(e.target.value) }>
                                            <option value="AMEAÇA">AMEAÇA</option>
                                            <option value="ASSALTO">ASSALTO</option>
                                            <option value="ASSASSINATO">ASSASSINATO</option>
                                            <option value="ASSÉDIO">ASSÉDIO</option>
                                            <option value="ESTUPRO">ESTUPRO</option>
                                            <option value="HOMICÍDIO">HOMICÍDIO</option>
                                            <option value="INVASÃO">INVASÃO</option>
                                            <option value="LATROCÍNIO">LATROCÍNIO</option>
                                            <option value="ROUBO">ROUBO</option>
                                            <option value="OUTROS">OUTROS</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label> Status: </Form.Label>
                                        <Form.Control as="select" onChange={ e => setStatus(e.target.value) }>
                                            <option value="TENTATIVA">TENTATIVA</option>
                                            <option value="CONCLUÍDO">CONCLUÍDO</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} sm={4}>
                                        <Form.Label> UF: </Form.Label>
                                        <Form.Control as='select' onChange={ e => setUf(e.target.value) }>
                                            {
                                                ufs.map( (uf, index) => {
                                                    return (<option key={index} value={uf}>{uf}</option>)
                                                })
                                            }
                                        </Form.Control> 
                                    </Form.Group>

                                    <Form.Group as={Col} sm={8}>
                                        <Form.Label> Cidade: </Form.Label>
                                        <Form.Control value={city} as="select" id="cities" onChange={ e => setCity(e.target.value) }>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label> Endereço: </Form.Label>
                                        <Form.Control id="neighborhood" type="text" maxLength="50" onChange={ (e) => setNeighborhood(e.target.value) }/> 
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label> Descrição </Form.Label>
                                        <Form.Control as="textarea" rows="4" maxLength="400" onChange={ e => setDescription(e.target.value) }/>
                                    </Form.Group>
                                </Form.Row>
                            </Form>

                            <Row className="mt-3">
                                <Col className="d-flex justify-content-center">
                                    <Button variant="outline-light" onChange={ e => setDescription(e.target.value)} onClick={ registerDenounce }> DENUNCIAR </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col md={6} className="white-border">
                    <Row className="denounce-info">
                        <Col>
                            <Row className="p-3" style={{height: '90%',}}>
                                <Col className="w-100 my-auto" style={{textAlign: "justify"}}>
                                    <h1> Denuncie! </h1>
                                    <p> Não tenha medo! Faça sua denúncia anonimamente. </p>
                                </Col>
                            </Row>

                            <Row style={{height: '10%',}}>
                                <Col className="h-50 align-self-end image-credit" >
                                    <p>Photo by Melany Rochester on Unsplash</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <ResultModal
            title={resultModalTitle}
            body={resultModalBody}
            show={openResultModal}
            onHide={ () => { setOpenResultModal(false); window.location.reload(); } }
            />
        </Container>
    );
};