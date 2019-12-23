class NCDao {

    constructor(db) {
        this._db = db;

    }

    listaNC(ordena = {}, filtro = {}) {

        return new Promise((resolve, reject) => {

            this._db.nc
                .find()
                .sort(ordena)
                .project(filtro)
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Não foi possível listar as Não Conformidades.');
                    }
                    return resolve(res);
                });

        });
    }

    listaUnidades(filtro = { _id: 0, Sigla: 1, Nome: 1 }) {

        return new Promise((resolve, reject) => {

            this._db.unidadesCARF
                .find()
                .sort({ Sigla: 1 })
                .project(filtro)
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Não foi possível listar as Unidades.');
                    }
                    return resolve(res);
                });

        });
    }

    listaMacro(filtro = {}) {

        return new Promise((resolve, reject) => {

            this._db.macroprocessos
                .find()
                .sort({ macroprocesso: 1 })
                .project(filtro)
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Não foi possível listar os macroprocessos.');
                    }
                    return resolve(res);
                });

        });
    }

    getDadosForm() {
        return Promise.all([this.listaMacro(), this.listaNC({ nconformidade: 1 }, {}), this.listaUnidades()]);
    }

    insere(registro) {

        return new Promise((resolve, reject) => {

            this._db.registroNC.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }

}
module.exports = NCDao;