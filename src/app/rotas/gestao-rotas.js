const NCControlador = require('../controladores/nc-controlador');
const ncControlador = new NCControlador();

module.exports = (app) => {

    const rotasNC = NCControlador.rotas(); 

    app.get(rotasNC.listaRNC, ncControlador.listaRNC());
    app.get(rotasNC.lista, ncControlador.lista());

    app.route(rotasNC.cadastraNC)
    .get(ncControlador.formCadastraNC())
    .post(ncControlador.cadastraNC());
}   
    
    
