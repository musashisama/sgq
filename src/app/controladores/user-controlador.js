const conn = require('../../config/mongodb').dados;
const templates = require('../views/templates');
const UserDao = require('../infra/user-dao');
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
            
            userDao.getUsers()
                .then(dadosForm => {
                    resp.marko(templates.admin.caduser, {
                        registroUser: {},                        
                        und: dadosForm[2]

                    })
                })
                .catch(erro => console.log(erro));
        };
    }

    cadastra() {
        return function (req, resp) {
            const registro = req.body;
            const clientIp = requestIp.getClientIp(req);
            registro['horaCriacao'] = new Date().toUTCString();
            registro['clientIP'] = clientIp;
            registro['cpfUsuario'] = req.user.cpf;
            const ncDao = new NCDao(conn); // <-ARRUMAR
            ncDao.cadastraNC(registro) // <-ARRUMAR
                .then(resp.marko(templates.base.principal, { msg: "Não Conformidade cadastrada com sucesso!" }))
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
