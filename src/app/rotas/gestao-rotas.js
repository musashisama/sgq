const NCControlador = require('../controladores/nc-controlador');
const ncControlador = new NCControlador();

module.exports = (app) => {

    const rotasNC = NCControlador.rotas(); 

    app.get(rotasNC.listaRNC, ncControlador.listaRNC())
}   
    
    
