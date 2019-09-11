const conn = require('../../config/mongodb');
const NCDao = require('../infra/nc-dao');

const templates = require('../views/templates');

class NCControlador {

    static rotas() {
        return {
            
            lista: '/lista'
            
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

    insere() {
        return function(req, resp) {
            const ncDao = new NCDao(conn);
            ncDao.insere(mp, nc);
        }
    }
}

module.exports = NCControlador;