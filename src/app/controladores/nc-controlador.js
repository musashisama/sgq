const conn = require('../../config/mongodb').dados;
const NCDao = require('../infra/nc-dao');

const templates = require('../views/templates');

class NCControlador {

    static rotas() {
        return {
            
            lista: '/lista',
            listaNC:'/listaNC',
            form: '/form',
            sucesso: '/sucesso',
            principal: '/'
            
        };
    }

    lista() {
        return function(req, resp) {
            const ncDao = new NCDao(conn);            
            ncDao.listaNC()
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
            ncDao.listaNC({_id:0})
                    .then(lista =>{
                        console.log(lista);
                        resp.json(lista);
                        
                    })
                    .catch(erro => console.log(erro));
        };
    }

    formularioCadastro(){
        return function(req, resp) {
            const ncDao = new NCDao(conn);
            ncDao.getDadosForm()
            .then(dadosForm => {                
                resp.marko(templates.nc.form, { 
                    registroNC: {}, 
                    mp:dadosForm[0],
                    nconf:dadosForm[1],
                    und:dadosForm[2]

                })                
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
                .then(resp.redirect(NCControlador.rotas().sucesso))
                .catch(erro => console.log(erro));
        }
    }
    
    sucesso() {
    return function(req,resp) {
    	resp.marko(templates.nc.sucesso)
        }
    }
    principal(){
        return function(req, resp) {
        resp.marko(templates.nc.principal)
        }
    }
}

module.exports = NCControlador;
