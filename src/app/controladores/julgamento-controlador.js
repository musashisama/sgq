const conn = require('../../config/mongodb').dados;
const JulgamentoDao = require('../infra/julgamento-dao');
const PessoalDao = require('../infra/pessoal-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');
const formidable = require('formidable');
const Mailer = require('../infra/helpers/Mailer')
const ACL = require('../infra/helpers/ACL')
const fs = require('fs');
const fse = require('fs-extra');
const d3 = require('d3');
const CSVHandler = require('../infra/helpers/CSVHandler');
const { ObjectID } = require('mongodb');
const path = 'src/app/arquivos/csv/';
let registro = {};
let dados = [];
let nome = "";
let newpath = "";
const url = require('url');

class JulgamentoControlador {
    static rotas() {
        return {
            autenticadas: '/julgamento/restrito*',
            calendario: '/julgamento/calendario',
            cargacons: '/julgamento/restrito/diagnostico-carga',
            carregacsv: '/julgamento/restrito/carrega-csv',
            escolhecsv: '/julgamento/restrito/escolhe-csv',
            escolhecsvregap: '/julgamento/restrito/escolhe-csv-regap',
            detalha: '/julgamento/restrito/diagnostico-carga/:id',
            regapCojul: '/julgamento/restrito/regap-cojul/:id',
            detalharegap: '/julgamento/restrito/regap-cojul/detalha/:id',
            regap: '/julgamento/restrito/regap/:id'
        };
    }
    carregaCSV() {
        return function (req, resp) {
            const role = 'julgamento';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                let form = formidable.IncomingForm({ keepExtensions: true });
                form.parse(req, function (err, fields, files) {
                    if (err) {
                        console.log(err);
                    }
                    registro['nome'] = files.filetoupload.name;
                    let oldpath = files.filetoupload.path;
                    if (fields.tipoRel == 'Estoque' || fields.tipoRel == 'REINP' || fields.tipoRel == 'REJUL') {
                        fields.semana = 'Todas';
                    }
                    newpath = path + fields.semana + '-' + files.filetoupload.name;
                    fse.move(oldpath, newpath, { overwrite: true })
                        .then(() => {
                            registro = CSVHandler.wrangleCSV(newpath, fields.semana)
                                .then((registro) => {
                                    if (req.isAuthenticated()) {
                                        registro['usuarioLogado'] = req.user.cpf;
                                    }
                                    const clientIp = requestIp.getClientIp(req);
                                    registro['clientIP'] = clientIp;
                                    registro['tipoRel'] = fields.tipoRel;
                                    registro['semana'] = fields.semana;
                                    registro['dtExtracao'] = fields.dataExt;
                                    const julgamentoDao = new JulgamentoDao(conn);
                                    julgamentoDao.insereDadosCSV(registro)
                                        .then(resp.marko(templates.base.principal, { msg: "Relatório enviado com sucesso!" }))
                                        .catch(erro => console.log(erro));
                                });
                        })
                        .catch(err => console.error(err));
                });
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        }
    }

    carregaPaginaCalendario() {
        return function (req, resp) {
            resp.marko(templates.julgamento.calendario)
        }
    }
    escolheCSVRegap() {
        return function (req, resp) {
            // const roles = ['julgamento','admin','blabl','qualidade'];
            // const perfil = req.user.perfis;
            if (1 == 1) {               //ACL.checaACL(perfil,roles)
                const julgamentoDao = new JulgamentoDao(conn);
                let options = { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' };
                const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }
                julgamentoDao.getRelatorios({ tipoRel: 'REGAP' })
                    .then(dados => {
                        dados.forEach(dado => {
                            dado.semana = dado.semana;
                            dado.dataEnvio = new Date(dado.dataEnvio).toLocaleString();
                            dado.caminho = dado.caminho.split("/")
                            dado.caminho = dado.caminho[4];
                            dado.totalCSRF = dado.ParaRelatarCSRF + dado.FormalizarCSRF;
                            dado.totalTOTE = dado.ParaRelatarTOTE + dado.FormalizarTOTE;
                            dado.total = dado.totalCSRF + dado.totalTOTE;
                            dado.totalHoras = dado.totalHorasTOTE + dado.totalHorasCSRF;
                            dado.totalValorCSRF = dado.totalValorCSRF.toLocaleString('pt-BR', formato);
                            dado.totalValorTOTE = dado.totalValorTOTE.toLocaleString('pt-BR', formato);
                        })
                        resp.marko(templates.julgamento.escolhecsvregap, { dados: dados })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        }
    }
    escolheCSV() {
        return function (req, resp) {
            const role = 'julgamento';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) > -1) {
                const julgamentoDao = new JulgamentoDao(conn);
                let options = { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' };
                julgamentoDao.getRelatorios({ tipoRel: { $not: /REGAP/ } })
                    .then(dados => {
                        dados.forEach(dado => {
                            dado.dataEnvio = new Date(dado.dataEnvio).toLocaleString();
                            dado.caminho = dado.caminho.split("/")
                            dado.caminho = dado.caminho[4];
                            dado.totalCSRF = dado.ParaRelatarCSRF + dado.FormalizarCSRF + +dado.AguardPautaCSRF + +dado.ApreciarCSRF + +dado.FormDecCSRF + +dado.CorrigirCSRF;
                            dado.totalTOTE = dado.ParaRelatarTOTE + dado.FormalizarTOTE + +dado.AguardPautaTOTE + +dado.ApreciarTOTE + +dado.FormDecTOTE + +dado.CorrigirTOTE;
                            dado.total = dado.totalCSRF + dado.totalTOTE;
                            dado.totalHoras = dado.totalHorasTOTE + dado.totalHorasCSRF;
                            const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }
                            dado.totalValorCSRF = dado.totalValorCSRF.toLocaleString('pt-BR', formato);
                            dado.totalValorTOTE = dado.totalValorTOTE.toLocaleString('pt-BR', formato);
                        })
                        resp.marko(templates.julgamento.escolhecsv, { dados: dados })
                    })
                    .catch(erro => console.log(erro));
            } else resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });

        }
    }
    carregaPaginaInsereCSV() {
        return function (req, resp) {
            const role = 'julgamento';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) < 0) {
                resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });
                return;
            } resp.marko(templates.julgamento.carregacsv, { dados: '' })
        }
    }
    carregaPaginaDiag() {
        return function (req, resp) {
            const role = 'julgamento';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) < 0) {
                resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });
            } else {
                let caminho = req.params.id;
                dados = CSVHandler.pegaEstoque(`${path}${caminho}`)
                    .then(dados => {
                        const pessoalDao = new PessoalDao(conn);
                        pessoalDao.getUsers()
                            .then(users => {
                                dados.forEach(dado => {
                                    users.forEach(user => {
                                        if (dado.CPF == user.cpf) {
                                            dado.nome = user.nome;
                                            dado.setor = user.setor;
                                            dado.camara = user.camara;
                                            dado.turma = user.turma;
                                            dado._id = new ObjectID(user._id);
                                        }
                                    })
                                })
                                resp.marko(templates.julgamento.cargacons, { relatorio: JSON.stringify(dados) });
                            })
                    })
            }
        }
    }
    carregaPaginaRegapCojul() {
        return function (req, resp) {
            const role = 'julgamento';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) < 0) {
                resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });
            } else {
                let caminho = req.params.id;
                req.session.caminho = caminho;
                dados = CSVHandler.pegaRegap(`${path}${caminho}`, 'COJUL')
                    .then(dados => {
                        const pessoalDao = new PessoalDao(conn);
                        pessoalDao.getUsers()
                            .then(users => {
                                dados.forEach(dado => {
                                    users.forEach(user => {
                                        if (dado.CPF == user.cpf) {
                                            dado.nome = user.nome;
                                            dado.setor = user.setor;
                                            dado.camara = user.camara;
                                            dado.turma = user.turma;
                                            dado._id = new ObjectID(user._id);
                                        }
                                    })
                                })
                                resp.marko(templates.julgamento.regapCojul, { relatorio: JSON.stringify(dados) });
                            })
                    })
            }
        }
    }
    carregaPaginaRegap() {
        return function (req, resp) {
            const role = 'julgamento';
            const perfil = req.user.perfis;
            if (perfil.indexOf(role) < 0) {
                resp.marko(templates.base.principal, { msg: "Usuário não autorizado a executar esta operação." });
            } else {
                let cpf = req.params.id;
                let caminho = (req.headers.referrer || req.headers.referer).split('/');
                caminho = req.session.caminho;
                if(!caminho){
                    resp.render(404);
                }
                dados = CSVHandler.pegaRegap(`${path}${caminho}`, 'CONS', cpf)
                    .then(dados => {
                        const pessoalDao = new PessoalDao(conn);
                        pessoalDao.getUsers()
                            .then(users => {
                                dados.forEach(dado => {
                                    users.forEach(user => {
                                        if (dado.CPF == user.cpf) {
                                            dado.nome = user.nome;
                                            dado.setor = user.setor;
                                            dado.camara = user.camara;
                                            dado.turma = user.turma;
                                            dado.diasAtividade = new Date() - dado.Entrada_na_Atividade
                                            dado._id = new ObjectID(user._id);
                                        }
                                    })

                                });
                                let options = { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' };
                                const julgamentoDao = new JulgamentoDao(conn);
                                julgamentoDao.getRelatorios({ caminho: `${path}${caminho}` })
                                    .then(dataEnvio => {
                                        resp.marko(templates.julgamento.regap, {
                                            relatorio: JSON.stringify(dados),
                                            user: dados[0].nome,
                                            cpf: dados[0].CPF,
                                            turma: dados[0].turma,
                                            camara: dados[0].camara,
                                            setor: dados[0].setor,
                                            caminho: caminho,
                                            dataEnvio: dataEnvio[0].dtExtracao
                                        });

                                    })

                            })
                    })
            }
        }
    }
}
module.exports = JulgamentoControlador;