const conn = require('../../config/mongodb').dados;
const templates = require('../views/templates');
const UserDao = require('../infra/user-dao');
const { ObjectID } = require('mongodb');
const Mailer = require('../infra/helpers/Mailer');
const requestIp = require('request-ip');
const bcrypt = require('bcryptjs');
const url = require('url');


class BaseControlador {

    static rotas() {
        return {
            principal: '/',
            login: '/login',
            logout: '/logout',
            trocasenhaSemID: '/altera-senha',
            trocasenha: '/altera-senha/:id',
            formalterasenha: '/form-altera-senha',
            enviamail: '/enviamail'
        };

    }    

    principal() {
        return function (req, resp) {
            resp.marko(templates.base.principal)
        }
    }

    login() {
        return function (req, resp) {
            resp.marko(templates.base.login)
        }
    }

    logout() {
        return function (req, resp) {
            req.logout();
            resp.redirect('/');
        }
    }

    efetuaLogin() {
        return function (req, resp, next) {
            const passport = req.passport;
            passport.authenticate('local', (erro, usuario, msg) => {
                if (msg) {
                    return resp.marko(templates.base.login, { msg: { cor: 'login_error', alert: 'error', text: msg.mensagem } });
                }
                if (erro) {
                    return next(erro);
                }

                req.login(usuario, (erro) => {
                    if (erro) {

                        return next(erro);
                    }
                    if (req.session.baseUrl) {
                        return resp.redirect(req.session.baseUrl);
                    } else return resp.redirect(BaseControlador.rotas().principal);

                })
            })(req, resp, next);
        }
    }
    enviaMail() {
        return function (req, resp, next) {            
            let email = req.body.email.toLowerCase();
            let userDao = new UserDao(conn);
            userDao.getUsers({ email: email }).then(user => {
                if (Object.keys(user).length > 0) {
                    let registro = {};
                    registro.email = email;
                    registro.controle = new ObjectID();
                    registro.timestamp = new Date().toISOString();
                    registro.expirado = false;
                    const clientIp = requestIp.getClientIp(req);
                    registro['requestIP'] = clientIp;
                    let URL = url.parse((req.headers.referrer || req.headers.referer).replace("/login", ""));
                    let corpo = `<p>Olá!</p>
                    <p>Uma solicitação de alteração de senha foi feita utilizando o seu email (${registro.email}).</p>
<p>Caso tenha sido você, <a href="http://${URL.host}/altera-senha/${registro.controle}">clique aqui</a> ou no link abaixo para efetuar a troca de senha:</p>

http://${URL.host}/altera-senha/${registro.controle}

<p><strong>Caso não tenha sido você, ignore esta mensagem.</strong></p>`                    
                    Mailer.enviaMail(registro.email, '[SGI-CARF] Solicitação de Alteração de Senha', corpo)
                    userDao.insereTrocasenha(registro).then(() => {
                        return resp.marko(templates.base.login, { msg: { cor: 'login_ok', alert: 'done_all', text: 'Cheque sua caixa de email para alteração da senha.' } });
                    })
                } else return resp.marko(templates.base.login, { msg: { cor: 'login_error', alert: 'error', text: 'Endereço não encontrado na base. Entre em contato com o administrador do sistema.' } });
            });
        }
    }
    paginaAlteracao() {
        return function (req, resp, next) {
            let id = req.params.id;
            let controle = '';
            let userDao = new UserDao(conn);
            try {
                controle = ObjectID(id);
            } catch (erro) {

                return resp.marko(templates.base.login, { msg: { cor: 'login_error', alert: 'error', text: 'Solicitação inválida. Caso queira trocar sua senha, crie uma nova solicitação.' } });
            }
            userDao.buscaTrocaSenha({ controle: controle }).then(user => {
                if (Object.keys(user).length > 0) {
                    if (user[0].expirado == false) {
                        return resp.marko(templates.base.trocasenha, { controle: controle });
                    } else return resp.marko(templates.base.login, { msg: { cor: 'login_error', alert: 'error', text: 'Solicitação expirada. Crie uma nova solicitação de troca de senha.' } });
                } return resp.marko(templates.base.login, { msg: { cor: 'login_error', alert: 'error', text: 'Solicitação inexistente. Caso queira trocar sua senha, crie uma nova solicitação.' } });

            }).catch(error => {
                return resp.marko(templates.base.login, { msg: { cor: 'login_error', alert: 'error', text: error } });
            })
        }
    }
    alteraSenha() {
        return function (req, resp, next) {
            let controle = '';
            try {
                controle = ObjectID(JSON.parse(req.body.controle));
            } catch (erro) {

                return resp.marko(templates.base.login, { msg: { cor: 'login_error', alert: 'error', text: 'Solicitação inválida. Caso queira trocar sua senha, crie uma nova solicitação.' } });
            }
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.pwd, salt);
            const clientIp = requestIp.getClientIp(req);
            let userDao = new UserDao(conn);
            userDao.buscaTrocaSenha({ controle: controle }).then(user => {
                userDao.atualizaSenha({ email: user[0].email }, hash).then(() => {
                    userDao.atualizaControle({ controle: controle }, { alteraIP: clientIp, expirado: true }).then(() => {
                        return resp.marko(templates.base.login, { msg: { cor: 'login_ok', alert: 'error', text: 'Senha atualizada com sucesso!' } });
                    })

                })

            })
        }
    }
    
}
module.exports = BaseControlador;
