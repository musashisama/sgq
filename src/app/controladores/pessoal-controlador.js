const conn = require('../../config/mongodb').dados;
const PessoalDao = require('../infra/pessoal-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');


class PessoalControlador {

    static rotas() {
        return {
            autenticadas: '/pessoal/restrito*',
            agenda: '/pessoal/agenda',
            pessoas: '/pessoal/restrito/pessoas',
            detalhaPess: '/pessoal/restrito/pessoas/:id',
            cadastraPess: '/pessoal/restrito/pessoas/cadastra',
            editaPess: '/pessoal/restrito/pessoas/edita',
            conselheiros: '/pessoal/restrito/conselheiros',
            detalhacons: '/pessoal/restrito/conselheiros/:id',
            editacons: '/pessoal/restrito/conselheiros/edita',
            insOcorrencia: '/pessoal/restrito/conselheiros/:id/ocorrencia',
            cadastraCons: '/pessoal/restrito/conselheiros/cadastra',
            editaOcorrencia: '/pessoal/restrito/conselheiros/ocorrencia/:id',
            excluiOcorrencia: '/pessoal/restrito/conselheiros/exclui-ocorrencia/:id',
            insOcorrenciaPess: '/pessoal/restrito/pessoas/:id/ocorrencia',
            editaOcorrenciaPess: '/pessoal/restrito/pessoas/ocorrencia/:id',
            excluiOcorrenciaPess: '/pessoal/restrito/pessoas/exclui-ocorrencia/:id'
        };
    }

    carregaAgenda(){
        return function (req, resp) {
            const pessoalDao = new PessoalDao(conn);
            pessoalDao.getUsers({},{nome:1,email:1,telefone:1, unidade:1, setor:1, cargo:1, funcao:1})
                .then(agenda => {
                    resp.marko(templates.pessoal.agenda, {agenda:JSON.stringify(agenda)})
                })
                .catch(erro => console.log(erro));
        }
    }

    carregaPaginaCadastro() {
        return function (req, resp) {
            const pessoalDao = new PessoalDao(conn);
            pessoalDao.getUsers()
                .then(pessoas => {
                    resp.marko(templates.pessoal.cadastra)
                })
                .catch(erro => console.log(erro));
        }
    }


    carregaPaginaPessoal() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.getUsers({ cargo: { $ne: "Conselheiro" } })
                    .then(pessoas => {
                        resp.marko(templates.pessoal.pessoas, {
                            pessoas: JSON.stringify(pessoas),

                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    carregaPaginaCons() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.getUsers({ cargo: "Conselheiro" })
                    .then(conselheiros => {
                        resp.marko(templates.pessoal.conselheiros, {
                            conselheiros: JSON.stringify(conselheiros),
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    carregaPaginaCadCons() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.getUnidades({ tipo: 'judicante' })
                    .then(tipo => {
                        pessoalDao.getfuncoesCarf()
                            .then(funcoes => {
                                resp.marko(templates.pessoal.cadcons, { unidades: tipo, funcoes: funcoes })
                            })
                    })


            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    carregaPaginaCadPess() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.getUnidades()
                    .then(tipo => {
                        pessoalDao.getfuncoesCarf()
                            .then(funcoes => {
                                resp.marko(templates.pessoal.cadpess, { unidades: tipo, funcoes: funcoes })
                            })
                    })


            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    carregaPaginaDetCons() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.buscaUser(req.params.id)
                    .then(conselheiro => {
                        pessoalDao.getUnidades({ tipo: 'judicante' })
                            .then(tipo => {
                                pessoalDao.getTipoOcorrencias()
                                    .then(tpOcorrencias => {
                                        pessoalDao.getOcorrencias({ cpf: req.params.id })
                                            .then(ocorrencias => {
                                                pessoalDao.getfuncoesCarf()
                                                    .then(funcoes => {
                                                        resp.marko(templates.pessoal.detalhacons, {
                                                            conselheiro: conselheiro[0],
                                                            unidades: tipo,
                                                            tipoOcorrencias: tpOcorrencias,
                                                            ocorrencias: JSON.stringify(ocorrencias),
                                                            funcoes: funcoes
                                                        })
                                                    })
                                            })
                                    })
                            })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }

    carregaPaginaDetalhaPessoal() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.buscaUser(req.params.id)
                    .then(pessoa => {
                        pessoalDao.getUnidades()
                            .then(tipo => {
                                pessoalDao.getTipoOcorrencias()
                                    .then(tpOcorrencias => {
                                        pessoalDao.getOcorrencias({ cpf: req.params.id })
                                            .then(ocorrencias => {
                                                pessoalDao.getfuncoesCarf()
                                                    .then(funcoes => {
                                                        resp.marko(templates.pessoal.detalhapess, {
                                                            pessoa: pessoa[0],
                                                            unidades: tipo,
                                                            tipoOcorrencias: tpOcorrencias,
                                                            ocorrencias: JSON.stringify(ocorrencias),
                                                            funcoes: funcoes
                                                        })
                                                    })
                                            })
                                    })
                            })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }

    editaOcorrencia() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            const id = req.params.id;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.editaOcorrencia(id, req.body)
                    .then(conselheiro => {
                        resp.marko(templates.pessoal.detalhacons, {
                            conselheiro: req.body,
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }

    editaOcorrenciaPess() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            const id = req.params.id;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.editaOcorrencia(id, req.body)
                    .then(pessoa => {
                        resp.marko(templates.pessoal.detalhapess, {
                            pessoa: req.body,
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }

    editaCons() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
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

    editaPessoa() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                console.log(req.body);
                pessoalDao.editaPessoa(req.body)
                    .then(pessoa => {
                        resp.marko(templates.pessoal.detalhapess, {
                            pessoa: req.body,
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }

    excluiOcorrencia() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.excluiOcorrencia(req.params.id)
                    .then(conselheiro => {
                        resp.marko(templates.pessoal.detalhacons, {
                            conselheiro: req.body,
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }

    excluiOcorrenciaPess() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.excluiOcorrencia(req.params.id)
                    .then(pessoa => {
                        resp.marko(templates.pessoal.detalhapess, {
                            pessoa: req.body,
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }

    insereOcorrencia() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.insereOcorrencia(req.body)
                    .then(conselheiro => {
                        resp.marko(templates.pessoal.detalhacons, {
                            conselheiro: req.body,
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    insereOcorrenciaPess() {
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.insereOcorrencia(req.body)
                    .then(pessoa => {
                        resp.marko(templates.pessoal.detalhapess, {
                            pessoa: req.body,
                        })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }

    cadastraCons(){
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.cadastraUser(req.body)
                    .then(conselheiro=> {
                        resp.redirect(PessoalControlador.rotas().conselheiros)
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
    cadastraPess(){
        return function (req, resp) {
            const role = 'pessoal';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const pessoalDao = new PessoalDao(conn);
                pessoalDao.cadastraUser(req.body)
                    .then(pessoa => {
                        resp.redirect(PessoalControlador.rotas().pessoas)
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        };
    }
}
module.exports = PessoalControlador;