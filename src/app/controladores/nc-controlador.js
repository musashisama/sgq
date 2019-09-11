const conn = require('../../config/mongodb');
const NCDao = require('../infra/nc-dao');

const templates = require('../views/templates');

class NCControlador {

    static rotas() {
        return {
            
            lista: '/lista',
            form: '/form'
            
        };
    }

    lista() {
        return function(req, resp) {
            const ncDao = new NCDao(conn);            
            ncDao.lista()
                    .then(nc => resp.marko(
                        templates.nc.lista,
                        {
                            nc: nc
                        }
                    ))
                    .catch(erro => console.log(erro));
        };
    }

    formularioCadastro(){
        return function(req, resp) {
            resp.marko(templates.nc.form, { registroNC: {} });
        };
    }

    cadastra() {
        return function(req, resp) {
            console.log(req.body);
            const registro = req.body;
            const ncDao = new NCDao(conn);
            ncDao.insere(registro)
                .then(resp.redirect(NCControlador.rotas().lista))
                .catch(erro => console.log(erro));
        }
    }
}

module.exports = NCControlador;