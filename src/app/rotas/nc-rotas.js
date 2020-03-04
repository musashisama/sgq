const NCControlador = require('../controladores/nc-controlador');
const ncControlador = new NCControlador();
const BaseControlador = require('../controladores/base-controlador')
const baseControlador = new BaseControlador();

module.exports = (app) => {

    const rotasNC = NCControlador.rotas();
    const rotasBase = BaseControlador.rotas();

    app.use(rotasNC.autenticadas, function(req, resp, next){   
        req.session.baseUrl = req.baseUrl;
        if(req.isAuthenticated()){                     
            next();
        } else{
            resp.redirect(rotasBase.login);
        }
    });

    
    app.get(rotasNC.listagem,ncControlador.listagem());
    app.get(rotasNC.listaNC,ncControlador.listaNC());
    
    
    app.route(rotasNC.form)
        .get(ncControlador.formularioCadastro())
        .post(ncControlador.cadastra());    
        
    app.get(rotasNC.listaRNC, ncControlador.listaRNC());
    app.get(rotasNC.lista, ncControlador.lista());

    app.route(rotasNC.cadastraNC)
    .get(ncControlador.formCadastraNC())
    .post(ncControlador.cadastraNC())
    .put(ncControlador.edita());

    app.get(rotasNC.edicao, ncControlador.formEdicao());
}
