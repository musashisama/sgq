const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserDao = require('../app/infra/user-dao');
const db = require('./mongodb').dados;

module.exports = (app) => {

    
    passport.use(new LocalStrategy(
        {
            usernameField: 'cpf',
            passwordField: 'pwd'
        },
        (cpf, senha, done) => {
            const userDao = new UserDao(db);
            userDao.buscaUser(cpf)
                .then(cpf => {
                    if (Object.keys(cpf).length==0) {    
                        console.log("No user");                    
                        return done(null, false, {
                            mensagem: "Usuário ou senha incorretos!"
                        });
                    }
                    if (Object.keys(cpf).length>0 && senha != cpf[0].senha) {
                        console.log("Senha errada");
                        return done(null, false, {
                            mensagem: "Usuário ou senha incorretos!"
                        });
                    }
                    return done(null, cpf);
                })
                .catch(erro => done(erro, false));
        }
    ));

    passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome,
            cpf: usuario.cpf
        };
        done(null, usuarioSessao);
    });

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao);
    });

    app.use(sessao({
        secret: 'teste',
        genid: function (req) {
            return uuid();
        },
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, resp, next) {
        req.passport = passport;
        next();
    })
}