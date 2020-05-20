const { ObjectID } = require('mongodb');

class JulgamentoDao {

    constructor(db) {
        this._db = db;
    }

    insereDadosCSV(registro) {
        return new Promise((resolve, reject) => {
            this._db.relatorios.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }

    getFAQ(filtro) {

        return new Promise((resolve, reject) => {
            this._db.faq
                .find(filtro)
                .sort({ _id:1 })
                .project()
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject(`Não foi possível listar o FAQ. Erro: ${erro}`);
                    }
                    return resolve(res);
                });
        });
    }

    insereFAQ(registro) {
        return new Promise((resolve, reject) => {
            this._db.faq.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }

    atualizaFAQ(filtro, registro) {
        return new Promise((resolve, reject) => {
            this._db.faq.updateOne(filtro, { $set: registro }, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível atualizar o registro de eventos.');
                }
                return resolve(res);
            })
        });
    }

    excluiFAQ(registro) {
        return new Promise((resolve, reject) => {
            this._db.faq.deleteOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível removver o registro de eventos.');
                }
                return resolve(res);
            })
        });
    }v

    insereCal(registro) {
        return new Promise((resolve, reject) => {
            this._db.calendario.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }

    getCal(filtro) {
        return new Promise((resolve, reject) => {
            this._db.calendario
                .find(filtro)
                .sort()
                .project()
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject(`Não foi possível listar os registros de eventos Erro: ${erro}`);
                    }
                    return resolve(res);
                });
        });
    }

    atualizaCal(filtro, registro) {
        return new Promise((resolve, reject) => {
            this._db.calendario.updateOne(filtro, { $set: registro }, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível atualizar o registro de eventos.');
                }
                return resolve(res);
            })
        });
    }

    excluiCal(registro) {
        return new Promise((resolve, reject) => {
            this._db.calendario.deleteOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível removver o registro de eventos.');
                }
                return resolve(res);
            })
        });
    }

  

    getRelatorios(filtro) {

        return new Promise((resolve, reject) => {
            this._db.relatorios
                .find(filtro)
                .sort({ _id: -1 })
                .project()
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject(`Não foi possível listar os relatórios. Erro: ${erro}`);
                    }
                    return resolve(res);
                });
        });
    }
}
module.exports = JulgamentoDao;