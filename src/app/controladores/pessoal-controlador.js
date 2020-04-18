const conn = require('../../config/mongodb').dados;
const PessoalDao = require('../infra/pessoal-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');


class PessoalControlador {

    static rotas() {
        return {
            autenticadas: '/pessoal/restrito*',
            pessoas: '/pessoal/restrito/pessoas',
            detalha: '/pessoal/restrito/pessoas/:id',
            cadastra: '/pessoal/restrito/pessoas/cadastra',
            conselheiros: '/pessoal/restrito/conselheiros',
            detalhacons:'/pessoal/restrito/conselheiros/:id',
            editacons: '/pessoal/restrito/conselheiros/edita'
        };
    }

    carregaPaginaCadastro() {
        return function (req, resp) {
            if (1 == 1) {

                resp.marko(templates.pessoal.cadastra)
            }
        }
    }

    carregaPaginaPessoal() {
        return function (req, resp) {
            // const role = 'admin';
            // const perfil = req.user.perfis;
            if (1 == 1) {//req.user.cpf == '71283242168' && perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.getUsersCargo()
                    .then(pessoas => {
                        resp.marko(templates.pessoal.pessoas, {
                            
                            col: JSON.stringify(pessoas[0]),
                            serv: JSON.stringify(pessoas[1]),
                            terc: JSON.stringify(pessoas[2])
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    carregaPaginaCons() {
        return function (req, resp) {
            // const role = 'admin';
            // const perfil = req.user.perfis;
            if (1 == 1) {//req.user.cpf == '71283242168' && perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.getUsers({cargo:"Conselheiro"})
                    .then(conselheiros => {
                        resp.marko(templates.pessoal.conselheiros, {
                            conselheiros: JSON.stringify(conselheiros),                            
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    carregaPaginaDetCons() {
        return function (req, resp) {
            // const role = 'admin';
            // const perfil = req.user.perfis;
            
            if (1 == 1) {//req.user.cpf == '71283242168' && perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.buscaUser(req.params.id)
                    .then(conselheiro => {     
                        pessoalDao.getUnidades({tipo:'judicante'}).then(tipo => {resp.marko(templates.pessoal.detalhacons, {
                            conselheiro: conselheiro[0], 
                            unidades:tipo                        
                        })})                   
                        
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    editaCons(){
        return function (req, resp) {
            //console.log(req.body);
            //console.log(req.params.id);
            console.log(req.user);
            if (1 == 1) {//req.user.cpf == '71283242168' && perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.editaCons(req.body)
                    .then(conselheiro => {                        
                        resp.marko(templates.pessoal.detalhacons, {
                            conselheiro: req.body,                            
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
}
module.exports = PessoalControlador;