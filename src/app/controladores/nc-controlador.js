const conn = require('../../config/mongodb').dados;
const NCDao = require('../infra/nc-dao');
const requestIp = require('request-ip');

const templates = require('../views/templates');

class NCControlador {

    static rotas() {
        return {
            lista: '/lista',
            listaNC: '/listaNC',
            form: '/form',            
            listagem: '/listagem'      

        };
    }

    listagem() {
        return function (req, resp) {
            const ncDao = new NCDao(conn);
            ncDao.listaNC()
                .then(nc => resp.marko(
                    templates.nc.listagem,
                    {
                        nc: nc
                    }
                ))
                .catch(erro => console.log(erro));
        };
    }
    lista() {
        return function (req, resp) {
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
        return function (req, resp) {
            const ncDao = new NCDao(conn);
            ncDao.listaNC({ _id: 0 })
                .then(lista => {
                    console.log(lista);
                    resp.json(lista);

                })
                .catch(erro => console.log(erro));
        };
    }

    formularioCadastro() {
        return function (req, resp) {
            const ncDao = new NCDao(conn);
            ncDao.getDadosForm()
                .then(dadosForm => {
                    resp.marko(templates.nc.form, {
                        registroNC: {},
                        mp: dadosForm[0],
                        nconf: dadosForm[1],
                        und: dadosForm[2]

                    })
                })
                .catch(erro => console.log(erro));
        };
    }

    cadastra() {
        return function (req, resp) {
            //console.log(req.body.dataNC);  
            const clientIp = requestIp.getClientIp(req);
            var arrayData1 = req.body.dataNC.split("-");
            var dataAjustada1 = new Date(arrayData1[2], arrayData1[1] - 1, arrayData1[0], new Date().getHours()).toUTCString();
            req.body.dataNC = dataAjustada1;
            var arrayData2 = req.body.EncCorNC.split("-");
            var dataAjustada2 = new Date(arrayData2[2], arrayData2[1] - 1, arrayData2[0], new Date().getHours()).toUTCString();
            req.body.EncCorNC = dataAjustada2;
            const registro = req.body;
            registro['horaCriacao'] = new Date().toUTCString();
            registro['clientIP'] = clientIp;
            console.log(clientIp);
            console.log(registro);
            const ncDao = new NCDao(conn);
            ncDao.insere(registro)
                .then(resp.marko(templates.base.principal, {msg:"Não Conformidade(s) registrada(s) com sucesso!"}))
                .catch(erro => console.log(erro));
        }
    }

    ajustaData(data) {
        arrayData = data.split("-");
        console.log(arrayData[2] + ' ' + arrayData[1] + ' ' + arrayData[0]);
        dataAjustada = new Date(arrayData[2], arrayData[1] - 1, arrayData[0], new Date().getHours()).toUTCString();
        console.log('Data Ajustada: ', dataAjustada);
        return dataAjustada;
    } 
}

module.exports = NCControlador;
