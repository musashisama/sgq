const NCControlador = require('../controladores/nc-controlador');
const ncControlador = new NCControlador();

module.exports = (app) => {

    const rotasNC = NCControlador.rotas();    

    //app.get(rotasNC.lista, ncControlador.lista());
    app.get(rotasNC.listagem,ncControlador.listagem());
    app.get(rotasNC.listaNC,ncControlador.listaNC());
    
    
    app.route(rotasNC.form)
        .get(ncControlador.formularioCadastro())
        .post(ncControlador.cadastra());       
}
