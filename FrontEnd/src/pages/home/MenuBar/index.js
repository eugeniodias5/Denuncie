import React, { useEffect, useState } from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';

import './style.css'
import logo from '../../../assets/logo.png'

export default function MenuBar(){

    const [loginPosition] = useState(0);
    const [denouncePosition, setDenouncePosition] = useState(0);
    const [denouncesListPosition, setDenouncesListPosition] = useState(0);
    const [aboutPosition, setAboutPosition] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', setMenuBarActiveLink);
        window.addEventListener('resize', getSectionsPositions);
        getSectionsPositions();
    })

    function setScrollbarPosition(position){
        window.scrollTo(0, position);
    }

    function getSectionsPositions(){
        const sections = document.getElementsByTagName('section');
        const navBarSize = document.getElementById('navbar').offsetHeight;

        setDenouncePosition(sections[1].offsetTop - navBarSize);
        setDenouncesListPosition(sections[2].offsetTop - navBarSize);
        setAboutPosition(sections[3].offsetTop - navBarSize);

        setMenuBarActiveLink();
    }

    function setMenuBarActiveLink(){
        let menuLinks = document.getElementsByClassName('menu-link');

        const scrollbarPosition = Math.ceil(window.pageYOffset);

        for(let index = 0; index < menuLinks.length; index++) {

            if((loginPosition <= scrollbarPosition && scrollbarPosition < denouncePosition) && index === 0)
                menuLinks[index].classList.add('active');
            else if((denouncePosition <= scrollbarPosition && scrollbarPosition < denouncesListPosition) && index === 1)
                menuLinks[index].classList.add('active');
            else if((denouncesListPosition <= scrollbarPosition && scrollbarPosition < aboutPosition) && index === 2)
                menuLinks[index].classList.add('active');
            else if((aboutPosition <= scrollbarPosition) && index === 3)
                menuLinks[index].classList.add('active');
            else
                menuLinks[index].classList.remove('active');
            
        }
    }

         return (
            <header>
                <Container fluid id="container">
                        <Navbar expand="md" id="navbar" fixed="top">
                            <Navbar.Brand>
                                <Nav.Link href="#">
                                    <img alt="Logo" height="200" width="200" src={logo} />
                                </Nav.Link>
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse>
                                <Nav className="ml-auto">
                                    <Nav.Link className="menu-link" href="#Login" active onClick={() => setScrollbarPosition(loginPosition) }> LOGIN </Nav.Link>
                                    <Nav.Link className="menu-link" href="#Denuncie" onClick={ () => setScrollbarPosition(denouncePosition) }> DENUNCIE! </Nav.Link>
                                    <Nav.Link className="menu-link" href="#Denuncias" onClick={ () => setScrollbarPosition(denouncesListPosition) }> DENÚNCIAS </Nav.Link>
                                    <Nav.Link className="menu-link" href="#Sobre" onClick={ () => setScrollbarPosition(aboutPosition) }> SOBRE </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                </Container>
            </header>
         );  
    }
