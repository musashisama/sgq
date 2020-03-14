const { ObjectID } = require('mongodb');
class BaseDao {

    constructor(db) {
        this._db = db;

    }

    listaUnidades(filtro, ordena) {

        return new Promise((resolve, reject) => {

            this._db.unidadesCARF
                .find()
                .sort(ordena)
                .project(filtro)
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Não foi possível listar as Unidades.');
                    }
                    return resolve(res);
                });

        });
    }

    listaMacro(filtro, ordena) {

        return new Promise((resolve, reject) => {

            this._db.macroprocessos
                .find()
                .sort(ordena)
                .project(filtro)
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Não foi possível listar os macroprocessos.');
                    }
                    return resolve(res);
                });

        });
    }

    listaPerfis(filtro, ordena) {

        return new Promise((resolve, reject) => {

            this._db.perfis
                .find()
                .sort(ordena)
                .project(filtro)
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Não foi possível listar os macroprocessos.');
                    }
                    return resolve(res);
                });

        });
    }
}
module.exports = BaseDao;