const conn = require('../../config/mongodb').dados;
const JulgamentoDao = require('../infra/julgamento-dao');
const requestIp = require('request-ip');
const templates = require('../views/templates');
const formidable = require('formidable');
const fs = require('fs');
const fse = require('fs-extra');
const d3 = require('d3');
const CSVHandler = require('../infra/helpers/CSVHandler');
const path = 'src/app/arquivos/csv/';
let registro = {};
let nome = "";
let newpath = "";

class JulgamentoControlador {

    static rotas() {
        return {
            autenticadas: '/julgamento/restrito*',
            cargacons: '/julgamento/restrito/diagnostico-carga',
            carregacsv: '/julgamento/restrito/carregacsv',
            escolhecsv: '/julgamento/restrito/escolhecsv',
            detalha: '/julgamento/restrito/diagnostico-carga/:id'
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
                newpath = 'src/app/arquivos/csv/' + files.filetoupload.name;
                fse.move(oldpath, newpath, { overwrite: true })
                    .then(() => {
                        registro = CSVHandler.readCSV(newpath)
                        .then((registro) => {
                            if (req.isAuthenticated()) {
                                registro['usuarioLogado'] = req.user.cpf;
                            }
                            const clientIp = requestIp.getClientIp(req);
                            registro['clientIP'] = clientIp;
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

    escolheCSV() {
        return function (req, resp) {
            dados = "";
            dados = JSON.stringify(CSVHandler.pegaEstoque(path + req.body.relatorio))
            req.body.relatorio = {}
            fs.readdir(path, (err, items) => {
                resp.json({ relatorio: dados })
            })
        }
    }

    carregaPaginaInsereCSV() {
        return function (req, resp) {
            resp.marko(templates.julgamento.carregacsv, { dados: '' })
        }
    }

    carregaPaginaDiag() {
        return function (req, resp) {
            let dados = {};
            if (req.body.relatorio) {
                dados = "";
                dados = JSON.stringify(CSVHandler.pegaEstoque(path + req.body.relatorio))
                req.body.relatorio = {}
                fs.readdir(path, (err, items) => {
                    resp.json({ relatorio: dados })
                })
            } else {
                dados = null;
                fs.readdir(path, (err, items) => {
                    resp.marko(templates.julgamento.cargacons, { dados: items, relatorio: dados })
                })
            }
        }
    }
}
module.exports = JulgamentoControlador;