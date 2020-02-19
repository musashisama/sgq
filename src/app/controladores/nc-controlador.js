const conn = require('../../config/mongodb').dados;
const NCDao = require('../infra/nc-dao');
const requestIp = require('request-ip');

const templates = require('../views/templates');

class NCControlador {

    static rotas() {
        return {
            lista: '/gestao/lista',
            listaNC: '/listaNC',
            form: '/form',
            listagem: '/listagem',
            listaRNC: '/gestao/listaregistronc',
            cadastraNC: '/gestao/cadastranc'
        };
    }

    static ajustaData(data) {

        const arrayData = data.split("-");
        console.log(arrayData[2] + ' ' + arrayData[1] + ' ' + arrayData[0]);
        const dataAjustada = new Date(arrayData[2], arrayData[1] - 1, arrayData[0], new Date().getHours()).toUTCString();
        console.log('Data Ajustada: ', dataAjustada);
        return dataAjustada;
    }
    //Lista os eventos possíves de não conformidades. Aberto.
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
    //Lista os eventos possíves de não conformidades. Aberto.
    lista() {
        return function (req, resp) {
            const ncDao = new NCDao(conn);
            ncDao.listaNC({ nconformidade: 1 }, {})
                .then(nc => resp.marko(
                    templates.nc.lista,
                    {
                        nc: nc
                    }
                ))
                .catch(erro => console.log(erro));
        };
    }
    //Retorna um JSON com possíveis eventos de não conformidades.
    listaNC() {
        return function (req, resp) {
            const ncDao = new NCDao(conn);
            ncDao.listaNC({},{ _id: 0})
                .then(lista => {
                    console.log(lista);
                    resp.json(lista);

                })
                .catch(erro => console.log(erro));
        };
    }
    // Carrega o formulário de registro de não conformidades. Aberto
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
    //Lista os registros de não conformidade. Fechado.
    listaRNC() {
        return function (req, resp) {
            const role = 'admin';
            const perfil = req.user.perfis;
            if (req.user.cpf == '71283242168' && perfil.indexOf(role) > -1) {
                const ncDao = new NCDao(conn);
                ncDao.getRegistrosNC({}, {})
                    .then(registroNC => {
                        resp.marko(templates.nc.listaregistros, {
                            registroNC: registroNC,

                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    //Chamado pelo formulário. Cadastra uma ou várias não conformidades. Loga o CPF do usuário autenticado, caso exista.
    cadastra() {
        return function (req, resp) {

            const registro = req.body;
            if (req.isAuthenticated()) {
                registro['usuarioLogado'] = req.user.cpf;
            }
            const clientIp = requestIp.getClientIp(req);
            req.body.EncCorNC = NCControlador.ajustaData(req.body.EncCorNC);
            req.body.dataNC = NCControlador.ajustaData(req.body.dataNC);
            registro['horaCriacao'] = new Date().toUTCString();
            registro['clientIP'] = clientIp;
            console.log(clientIp);
            console.log(registro);
            const ncDao = new NCDao(conn);
            ncDao.insere(registro)
                .then(resp.marko(templates.base.principal, { msg: "Não Conformidade(s) registrada(s) com sucesso!" }))
                .catch(erro => console.log(erro));
        }
    }
    //Carrega o formulário de registro de nova possível não conformidade. Fechado.
    formCadastraNC() {
        return function (req, resp) {
            const role = 'gestaoNC';
            const perfil = req.user.perfis;
            if (req.isAuthenticated() && perfil.indexOf(role) > -1) {
                const ncDao = new NCDao(conn);
                ncDao.getDadosForm()
                    .then(dadosForm => {
                        resp.marko(templates.nc.cadastranc, {
                            cadastraNC: {},
                            mp: dadosForm[0]
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });
        };

    }
    //Chamado pelo formulário. Cadastra nova possível não conformidade.
    cadastraNC() {
        return function (req, resp) {
            const registro = req.body;
            const clientIp = requestIp.getClientIp(req);
            registro['horaCriacao'] = new Date().toUTCString();
            registro['clientIP'] = clientIp;
            registro['cpfUsuario'] = req.user.cpf;
            const ncDao = new NCDao(conn);
            ncDao.cadastraNC(registro)
                .then(resp.marko(templates.base.principal, { msg: "Não Conformidade cadastrada com sucesso!" }))
                .catch(erro => console.log(erro));
        };
    }

}

module.exports = NCControlador;
