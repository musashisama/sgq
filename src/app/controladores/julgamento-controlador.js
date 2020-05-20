const conn = require('../../config/mongodb').dados;
const JulgamentoDao = require('../infra/julgamento-dao');
const PessoalDao = require('../infra/pessoal-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');
const formidable = require('formidable');
const moment = require('moment');
const tz = require('moment-timezone');
let sp = 'America/Sao_Paulo'
moment.updateLocale('en', {
    relativeTime: {
        future: "em %s",
        past: "há %s",
        s: 'poucos segundos',
        ss: '%d segundos',
        m: "um minuto",
        mm: "%d minutos",
        h: "uma hora",
        hh: "%d horas",
        d: "um dia",
        dd: "%d dias",
        w: "uma semana",
        ww: "%d semanas",
        M: "um mês",
        MM: "%d meses",
        y: "um ano",
        yy: "%d anos"
    }
});
const Mailer = require('../infra/helpers/Mailer');
const ACL = require('../infra/helpers/ACL');
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
            calendario: '/julgamento/restrito/calendario/:id',
            faqdipaj: '/julgamento/faqdipaj',
            conselheiros: '/julgamento/conselheiros',
            regapcons: '/julgamento/conselheiros/:id',
            estoque: '/julgamento/restrito/diagnostico-carga',
            cadastrafaqdipaj: '/julgamento/restrito/cadastrafaqdipaj/:id',
            carregacsv: '/julgamento/restrito/carrega-csv',
            escolhecsv: '/julgamento/restrito/escolhe-csv',
            escolhecsvregap: '/julgamento/restrito/escolhe-csv-regap',
            escolhecsvreinp: '/julgamento/restrito/escolhe-csv-reinp',
            reinp: '/julgamento/restrito/reinp/:id',
            detalhareinp: '/julgamento/restrito/reinp/detalha/:id',
            escolhecsvcons: '/julgamento/restrito/escolhe-csv-cons',
            detalhaestoque: '/julgamento/restrito/diagnostico-carga/:id',
            regapCojul: '/julgamento/restrito/regap-cojul/:id',
            detalharegap: '/julgamento/restrito/regap-cojul/detalha/:id',
            regap: '/julgamento/restrito/regap/:id'
        };
    }

    handleFAQDipaj() {
        return function (req, resp) {           
            if (req.method == 'GET') {
                const julgamentoDao = new JulgamentoDao(conn);
                julgamentoDao.getFAQ()
                    .then(msg => {
                        resp.marko(templates.julgamento.cadastrafaqdipaj, { faq: JSON.stringify(msg) })
                    })
            } else {
                const julgamentoDao = new JulgamentoDao(conn);
                if (req.method == 'POST' || req.method == 'PUT') {
                    julgamentoDao.getFAQ({ uniqueId: req.body.uniqueId })
                        .then(msg => {
                            if (!msg[0]) {
                                julgamentoDao.insereFAQ(req.body)
                                    .then(msg => {
                                        resp.json(msg)
                                    })
                            } else {

                                julgamentoDao.atualizaFAQ({ uniqueId: req.body.uniqueId }, req.body)
                                    .then(msg => {
                                        resp.json(msg)
                                    })
                            }
                        })
                } else if (req.method == 'DELETE') {
                    console.log('delete');
                    console.log(req.body);
                    julgamentoDao.excluiFAQ({ uniqueId: req.body.uniqueId })
                        .then(msg => {
                            resp.json(msg)
                        })
                }
            }
        }
    }

    carregaFAQDipaj() {
        return function (req, resp) {
           
            const julgamentoDao = new JulgamentoDao(conn);
            julgamentoDao.getFAQ()
            .then(faq => {
                resp.marko(templates.julgamento.faqdipaj,{faq:JSON.stringify(faq)})
            })
            
        }
    }

    carregaPaginaConselheiros() {
        return function (req, resp) {
            let cpf = req.user.cpf;
            let unidade = req.user.unidade;
            let semana = CSVHandler.semanaCores(unidade);
            const pessoalDao = new PessoalDao(conn);
            pessoalDao.getUsers({ cpf: cpf })
                .then(user => {
                    const julgamentoDao = new JulgamentoDao(conn);
                    julgamentoDao.getRelatorios({
                        $or: [
                            { $and: [{ tipoRel: 'REGAP' }, { semana: semana }] },
                            { tipoRel: 'Estoque' }]
                    })
                        .then(dados => {
                            dados.forEach(dado => {
                                dado.id = dado._id;
                                dado.semana = dado.semana;
                                dado.dataEnvio = dado.dataEnvio;
                                dado.dtExtracao = dado.dtExtracao;
                            })
                            julgamentoDao.getRelatorios({ tipoRel: 'REINP' })
                                .then(reinp => {
                                    reinp.forEach(dado => {
                                        dado.id = dado._id;
                                        dado.semana = dado.semana;
                                        dado.dataEnvio = dado.dataEnvio;
                                        dado.dtExtracao = dado.dtExtracao;
                                    })
                                    const pessoalDao = new PessoalDao(conn);
                                    pessoalDao.getOcorrencias({ cpf: cpf })
                                        .then(ocorrencias => {
                                            resp.marko(templates.julgamento.regapcons, { user: user[0], reinp: reinp, dados: dados, ocorrencias: JSON.stringify(ocorrencias) })
                                        })
                                })
                        })

                })
        }
    }

    carregaTabelaConselheiros() {
        return function (req, resp) {
            let CPF = req.user.cpf;
            let id = new ObjectID(req.params.id);
            const julgamentoDao = new JulgamentoDao(conn);
            julgamentoDao.getRelatorios({ _id: id })
                .then(rel => {
                    let caminho = rel[0].caminho;
                    if (rel[0].tipoRel == 'REGAP' || rel[0].tipoRel == 'Estoque') {
                        dados = CSVHandler.pegaRegap(`${caminho}`, 'CONS', CPF)
                            .then(dados => {
                                let respJSON = [];
                                // dados.forEach(dado => {
                                //     if (dado.CPF == CPF) {
                                //         respJSON.push(dado);
                                //     }
                                // })
                                resp.send(dados);
                            })
                    } else if (rel[0].tipoRel == 'REINP') {
                        dados = CSVHandler.pegaReinp(`${caminho}`, CPF)
                            .then(dados => {
                                resp.send(dados);
                            })
                    }
                })
        }
    }


    carregaCSV() {
        return function (req, resp) {
            let form = formidable.IncomingForm({ keepExtensions: true });
            form.parse(req, function (err, fields, files) {
                if (err) {
                    console.log(err);
                }
                registro['nome'] = files.file.name;
                let oldpath = files.file.path;
                if (fields.tipoRel == 'Estoque' || fields.tipoRel == 'REJUL' || fields.tipoRel == 'REINP') {
                    fields.semana = 'Todas';
                }
                newpath = path + fields.semana + '-' + files.file.name;
                fse.move(oldpath, newpath, { overwrite: true })
                    .then(() => {
                        registro = CSVHandler.wrangleCSV(newpath, fields.semana, fields.tipoRel)
                            .then(registro => {
                                if (req.isAuthenticated()) {
                                    registro['usuarioLogado'] = req.user.cpf;
                                }
                                const clientIp = requestIp.getClientIp(req);
                                registro['clientIP'] = clientIp;
                                registro['tipoRel'] = fields.tipoRel;
                                registro['semana'] = fields.semana;
                                if (fields.tipoRel == 'REINP') {
                                    registro['trimestre'] = fields.trimestre;
                                }
                                registro['dtExtracao'] = moment(fields.dataExt, 'DD/MM/YYYY').format('DD/MM/YYYY');
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

    handleCalendario() {
        return function (req, resp) {
            if (req.method == 'GET') {
                const julgamentoDao = new JulgamentoDao(conn);
                julgamentoDao.getCal()
                    .then(msg => {
                        resp.marko(templates.julgamento.calendario, { cal: JSON.stringify(msg) })
                    })

            } else {
                const julgamentoDao = new JulgamentoDao(conn);
                if (req.method == 'POST' || req.method == 'PUT') {
                    julgamentoDao.getCal({ uniqueId: req.body.uniqueId })
                        .then(msg => {
                            if (!msg[0]) {
                                julgamentoDao.insereCal(req.body)
                                    .then(msg => {
                                        resp.json(msg)
                                    })
                            } else {

                                julgamentoDao.atualizaCal({ uniqueId: req.body.uniqueId }, req.body)
                                    .then(msg => {
                                        resp.json(msg)
                                    })
                            }
                        })

                } else if (req.method == 'DELETE') {
                    console.log('delete');
                    console.log(req.body);
                    julgamentoDao.excluiCal({ uniqueId: req.body.uniqueId })
                        .then(msg => {
                            resp.json(msg)
                        })
                }
            }

        }
    }
    escolheCSVReinp() {
        return function (req, resp) {
            const julgamentoDao = new JulgamentoDao(conn);
            julgamentoDao.getRelatorios({ tipoRel: 'REINP' })
                .then(dados => {
                    dados.forEach(dado => {
                        dado.dataEnvio = dado.dataEnvio;
                        dado.dias = moment(dado.dtExtracao, 'DD/MM/YYYY').tz(sp).fromNow();
                        dado.caminho = dado.caminho.split("/")
                        dado.caminho = dado.caminho[4];
                    })
                    resp.marko(templates.julgamento.escolhecsvreinp, { dados: dados })
                })
                .catch(erro => console.log(erro));
        }
    }
    escolheCSVRegap() {
        return function (req, resp) {
            const julgamentoDao = new JulgamentoDao(conn);
            let options = { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' };
            const formato = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }
            julgamentoDao.getRelatorios({ $or: [{ tipoRel: 'REGAP' }, { tipoRel: 'Estoque' }] })
                .then(dados => {
                    dados.forEach(dado => {
                        dado.semana = dado.semana;
                        dado.dataEnvio = moment(dado.dataEnvio).format('DD/MM/YYYY')
                        dado.dias = moment(dado.dtExtracao, 'DD/MM/YYYY').fromNow();
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
            julgamentoDao.getRelatorios({ tipoRel: 'Estoque' })
                .then(dados => {
                    dados.forEach(dado => {
                        dado.dataEnvio = moment(dado.dataEnvio).format('DD/MM/YYYY')
                        dado.dtExtracao = moment(dado.dtExtracao, 'DD/MM/YYYY').format('DD/MM/YYYY')
                        dado.dias = moment(dado.dtExtracao, 'DD/MM/YYYY').fromNow();
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

    //ESTOQUE
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
                                        dado.unidade = user.unidade;
                                    }
                                })
                            })
                            resp.marko(templates.julgamento.estoque, { relatorio: JSON.stringify(dados) });
                        })
                })
        }
    }
    carregaPaginaReinp() {
        return function (req, resp) {
            let caminho = req.params.id;
            req.session.caminho = caminho;
            dados = CSVHandler.pegaReinp(`${path}${caminho}`)
                .then(dados => {
                    const pessoalDao = new PessoalDao(conn);
                    pessoalDao.getUsers()
                        .then(users => {
                            dados.forEach(semana => {
                                semana.forEach(dado => {
                                    users.forEach(user => {
                                        if (dado.CPF == user.cpf) {
                                            dado.nome = user.nome;
                                            dado.setor = user.setor;
                                            dado.camara = user.camara;
                                            dado.turma = user.turma;
                                            dado._id = new ObjectID(user._id);
                                            dado.unidade = user.unidade;
                                        }
                                    })
                                })
                            })
                            resp.marko(templates.julgamento.reinpgeral, { relatorio: JSON.stringify(dados), users: JSON.stringify(users) });
                        })
                })
        }
    }
    carregaPaginaDetalhaReinp() {
        return function (req, resp) {
            let cpf = req.params.id;
            let caminho = (req.headers.referrer || req.headers.referer).split('/');
            caminho = req.session.caminho;
            if (!caminho) {
                resp.render(404);
            }
            dados = CSVHandler.pegaReinp(`${path}${caminho}`, cpf)
                .then(dados => {
                    const pessoalDao = new PessoalDao(conn);
                    pessoalDao.getUsers({ cpf: cpf })
                        .then(user => {
                            const julgamentoDao = new JulgamentoDao(conn);
                            julgamentoDao.getRelatorios({ caminho: `${path}${caminho}` })
                                .then(dataEnvio => {
                                    resp.marko(templates.julgamento.detalhareinp, {
                                        relatorio: JSON.stringify(dados),
                                        user: JSON.stringify(user[0]),
                                        nome: user[0].nome,
                                        cpf: user[0].cpf,
                                        turma: user[0].turma,
                                        camara: user[0].camara,
                                        setor: user[0].setor,
                                        unidade: user[0].unidade,
                                        caminho: caminho,
                                        dataEnvio: dataEnvio[0].dtExtracao,
                                        dtFimMandato: user[0].dtFimMandato,
                                        tipo: user[0].tipo
                                    });
                                })
                        })
                })
        }
    }
    carregaPaginaRegapCojul() {
        return function (req, resp) {
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
                                        dado.dtFimMandato = user.dtFimMandato;
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
            caminho = req.session.caminho;
            if (!caminho) {
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
                                        dado.dtFimMandato = user.dtFimMandato;
                                        dado.tipo = user.tipo;
                                    }
                                })
                            });
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
                                        dataEnvio: dataEnvio[0].dtExtracao,
                                        dtFimMandato: dados[0].dtFimMandato,
                                        tipo: dados[0].tipo
                                    });
                                })
                        })
                })
        }
    }
}
module.exports = JulgamentoControlador;