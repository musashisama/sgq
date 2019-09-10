const conn = require('../../config/mongodb');
const RiscoDao = require('../infra/risco-dao');

const templates = require('../views/templates');

class RiscoControlador {

    static rotas() {
        return {
            
            lista: '/riscos'
            
        };
    }

    lista() {
        return function(req, resp) {
            const riscoDao = new RiscoDao(conn);
            console.log("Cheguei aqui");
            riscoDao.lista()
                    .then(riscos => resp.marko(
                        templates.riscos.lista,
                        {
                            riscos: riscos
                        }
                    ))
                    .catch(erro => console.log(erro));
        };
    }
}

module.exports = RiscoControlador;