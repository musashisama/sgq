const conn = require('../../config/mongodb').dados;
const PessoalDao = require('../infra/pessoal-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');


class PessoalControlador {

    static rotas() {
        return {
            autenticadas: '/pessoal/restrito*',
            pessoas: '/pessoal/restrito/pessoas',            
            detalha: '/pessoal/restrito/pessoas/:id'
        };
    }

    carregaPaginaPessoal() {
        return function (req, resp) {
           // const role = 'admin';
           // const perfil = req.user.perfis;
            if (1==1) {//req.user.cpf == '71283242168' && perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);                
                pessoalDao.getUsersCargo()
                    .then(pessoas => {
                        resp.marko(templates.pessoal.pessoas, {
                            cons: JSON.stringify(pessoas[0]),
                            col: JSON.stringify(pessoas[1]),
                            serv: JSON.stringify(pessoas[2]),
                            terc: JSON.stringify(pessoas[3])
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }   
}
module.exports = PessoalControlador;