import axios from 'axios';


//const serverPort = '3333';  //development
//const baseURL = 'http://' + window.location.hostname + ':' + serverPort; /development

const baseURL = 'https://denuncie-app.herokuapp.com/';

const client = axios.create({
    baseURL,
});

export default client;