const conn = require('../../config/mongodb').dados;
const templates = require('../views/templates');

class BaseControlador {

    static rotas() {
        return {
            autenticadas:'/gestao*',
            principal: '/',            
            login: '/login'
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
    efetuaLogin() {
        return function (req, resp, next) {
            console.log(req.session);
            const passport = req.passport;
            passport.authenticate('local', (erro, usuario, msg) => {
                if (msg) {
                    return resp.marko(templates.base.login, {msg:msg.mensagem});
                }
                if (erro) {
                    return next(erro);
                }

                req.login(usuario, (erro) => {
                    if (erro) {
                        
                        return next(erro);
                    }                    
                    return resp.redirect(req.session.baseUrl);
                })
            })(req, resp, next);
        }
    }
}
module.exports = BaseControlador;
