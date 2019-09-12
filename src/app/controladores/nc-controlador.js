const conn = require('../../config/mongodb').dados;
const NCDao = require('../infra/nc-dao');

const templates = require('../views/templates');

class NCControlador {

    static rotas() {
        return {
            
            lista: '/lista',
            listaNC:'/listaNC',
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

    listaNC() {
        return function(req, resp) {
            const ncDao = new NCDao(conn);            
            ncDao.lista({_id:0})
                    .then(lista =>{
                        resp.json(lista);                        
                    })
                    .catch(erro => console.log(erro));
        };
    }



    formularioCadastro(){
        return function(req, resp) {
            const ncDao = new NCDao(conn);
            ncDao.listaMacro()
            .then(mp => {
                resp.marko(templates.nc.form, { registroNC: {}, mp:mp  })                
            })            
            .catch(erro => console.log(erro));

            
        };
    }

    cadastra() {
        return function(req, resp) {
            console.log(req.body);
            const registro = req.body;
            const ncDao = new NCDao(conn);
            ncDao.insere(registro)
                .then(resp.redirect(NCControlador.rotas().form))
                .catch(erro => console.log(erro));
        }
    }
}

module.exports = NCControlador;