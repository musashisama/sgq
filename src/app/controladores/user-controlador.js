const conn = require('../../config/mongodb').dados;
const templates = require('../views/templates');
const UserDao = require('../infra/user-dao');
const NCDao = require('../infra/nc-dao');
const BaseDao = require('../infra/base-dao');
const requestIp = require('request-ip');
const { ObjectID } = require('mongodb');


class UserControlador {

    static rotas() {
        return {
            autenticadas: '/admin*',
            cadastro: '/admin/usuario',
            edicao: '/admin/usuario/:id',
            delecao: '/admin/usuario/delete/:id'
        };

    }

    formCadastra() {
        return function (req, resp) {
            const userDao = new UserDao(conn);
            const ncDao = new NCDao(conn);
            const baseDao = new BaseDao(conn);
            let form = [{}];
            baseDao.listaUnidades()
                .then(und => {
                    form[0] = und;
                }).then(
                    baseDao.listaPerfis()
                        .then(prf => {
                            form[1] = prf;
                        })
                ).then(
                    userDao.getUsers()
                        .then(dadosForm => {
                            resp.marko(templates.admin.caduser, {
                                registroUser: {},
                                und: form[0],
                                prf: form[1]

                            })
                        })
                        .catch(erro => console.log(erro)));
        };
    }

    cadastra() {
        return function (req, resp) {
            const registro = req.body;
            const clientIp = requestIp.getClientIp(req);
            registro['horaCriacao'] = new Date().toISOString();
            registro['clientIP'] = clientIp;
            registro['cpfCadastro'] = req.user.cpf;
            const userDao = new UserDao(conn);
            userDao.cadastraUser(registro)
                .then(resp.marko(templates.base.principal, { msg: "Usuário cadastrado com sucesso!" }))
                .catch(erro => console.log(erro));
        };
    }

    edita() {
        return function (req, resp) {
            const ncDao = new NCDao(conn); // <-ARRUMAR
            ncDao.atualiza(req.body) // <-ARRUMAR
                .then(resp.redirect(NCControlador.rotas().lista))
                .catch(erro => console.log(erro));
        };
    }
}
module.exports = UserControlador;
