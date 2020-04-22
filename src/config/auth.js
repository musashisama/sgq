const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const UserDao = require('../app/infra/user-dao');
const { ObjectID } = require('mongodb');
const db = require('./mongodb').dados;

module.exports = (app) => {

    
    passport.use(new LocalStrategy(
        {
            usernameField: 'cpf',
            passwordField: 'pwd'
        },
        (cpf, senha, done) => {
            const userDao = new UserDao(db);
            userDao.buscaUser({cpf:cpf})
                .then(cpf => {
                    if (Object.keys(cpf).length==0) {    
                        //console.log("No user");                    
                        return done(null, false, {
                            mensagem: "Usuário ou senha incorretos!"
                        });
                    }                    
                    if (Object.keys(cpf).length>0 && !bcrypt.compareSync(senha, cpf[0].senha)) {                        
                        //console.log("Senha errada");
                        return done(null, false, {
                            mensagem: "Usuário ou senha incorretos!"
                        });
                    }                    
                    return done(null, cpf);
                })
                .catch(erro => done(erro, false));
        }
    ));

    passport.serializeUser((cpf, done) => {
        const usuarioSessao = {
            nome: cpf[0].nome,
            cpf: cpf[0].cpf,
            perfis: cpf[0].perfil
        };        
        done(null, usuarioSessao);
    });

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao);
    });

    app.use(sessao({
        secret: ['X5f6oH8gaAwxrvM0OgI1FCbotQtshMiM','Kd22KDvHFkAaFU86ufl0iLyipj8wiyM2','POpdELY5mhuHcsaYcoioB9l2wK4ctyAb','DELugjXEO4Un5IsrJJKVq7G2bLftpB5S'],
        name:'Sistema de Gestao Integrada',        
        genid: function (req) {
            return uuid();
        },
        resave: false,
        saveUninitialized: false,
        cookie : { httpOnly: true, maxAge: 2419200000 }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, resp, next) {
        req.passport = passport;        
        next();
    })
}