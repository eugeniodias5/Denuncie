import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    useParams  
} from 'react-router-dom';

import Home from './pages/home/'

export default function Routes() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="/cadastro">
                        <h1>Tela de cadastro</h1>
                    </Route>
                    <Route path="/denuncias" exact>
                        <h1>Tela de denuncias</h1>
                    </Route>
                    <Route path="/denuncias/:id">
                        <Denuncia/>
                    </Route>
                </Switch>  
            </Router>    
        )}

function Denuncia(){
    return <h1> {useParams().id} </h1>
}
