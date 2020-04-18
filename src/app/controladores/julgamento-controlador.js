const conn = require('../../config/mongodb').dados;
const JulgamentoDao = require('../infra/julgamento-dao');
const PessoalDao = require('../infra/pessoal-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');
const formidable = require('formidable');
const Mailer = require('../infra/helpers/Mailer')
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
            cargacons: '/julgamento/restrito/diagnostico-carga',
            carregacsv: '/julgamento/restrito/carregacsv',
            escolhecsv: '/julgamento/restrito/escolhecsv',
            escolhecsvregap: '/julgamento/restrito/escolhecsvregap',
            detalha: '/julgamento/restrito/diagnostico-carga/:id',
            regapCojul: '/julgamento/restrito/regapCojul/:id',
            detalharegap: '/julgamento/restrito/regapCojul/detalha/:id',
            regap: '/julgamento/restrito/regap/:id'
        };
    }
    carregaCSV() {
        return function (req, resp) {
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
        }
    }
    escolheCSVRegap() {
        return function (req, resp) {
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
        }
    }
    escolheCSV() {
        return function (req, resp) {
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
        }
    }
    carregaPaginaInsereCSV() {
        return function (req, resp) {
            resp.marko(templates.julgamento.carregacsv, { dados: '' })
        }
    }
    carregaPaginaDiag() {
        return function (req, resp) {
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
    carregaPaginaRegapCojul() {
        return function (req, resp) {
            let caminho = req.params.id;
            dados = CSVHandler.pegaRegap(`${path}${caminho}`,'COJUL')
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
    carregaPaginaRegap() {
        return function (req, resp) {
            let cpf = req.params.id;
            let caminho = (req.headers.referrer || req.headers.referer).split('/');
            caminho = caminho[caminho.length-1];
            console.log(caminho);
            console.log(cpf);
            dados = CSVHandler.pegaRegap(`${path}${caminho}`,'CONS', cpf)
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
                            })
                            resp.marko(templates.julgamento.regapCojul, { relatorio: JSON.stringify(dados) });
                        })
                })
        }
    }
}
module.exports = JulgamentoControlador;