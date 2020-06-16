import React, { Fragment } from 'react';

import MenuBar from './MenuBar';
import Login from './Login';
import Denounce from './Denounce'; 
import DenounceList from './DenounceList';
import About from './About';

import './style.css';

export default function Home(){
    
    return( 
            <Fragment>
                <header>  
                    <MenuBar/>
                </header>
                
                <section>
                    <Login/>
                </section>

                <section>
                    <Denounce/>
                </section>

                <section>
                    <DenounceList/>
                </section>

                <section>
                    <About/>
                </section>

            </Fragment>
    );
}