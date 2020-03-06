const UserControlador = require('../controladores/user-controlador');
const userControlador = new UserControlador();
const BaseControlador = require('../controladores/base-controlador')

module.exports = (app) => {

    const rotasUser = UserControlador.rotas(); 

    // app.get(rotasNC.listaRNC, ncControlador.listaRNC());
    // app.get(rotasNC.lista, ncControlador.lista());

    app.route(rotasUser.cadastro)
    .get(userControlador.formCadastra())
    .post(userControlador.cadastra())
    .put(userControlador.edita());
}   
    
    
