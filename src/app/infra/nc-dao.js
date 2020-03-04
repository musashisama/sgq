class NCDao {

    constructor(db) {
        this._db = db;

    }

    buscaNCPorId(nc) {

        return new Promise((resolve, reject) => {

            this._db.nc
                .find({ _id: nc })
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Não foi possível listar as Não Conformidades.');
                    }
                    return resolve(res);
                });

        });
    }

    atualiza(req) {

        return new Promise((resolve, reject) => {
            console.log(req);
            console.log("Veio aqui o safado");

        });

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

    

    getRegistrosNC(filtro, ordena) {
        return new Promise((resolve, reject) => {
            this._db.registroNC
                .find()
                .sort(ordena)
                .project(filtro)
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Não foi possível listar os registros de não conformidades.');
                    }
                    return resolve(res);
                });
        });
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

    cadastraNC(registro) {

        return new Promise((resolve, reject) => {

            this._db.nc.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }
    getDadosForm() {
        return Promise.all([
            this.listaMacro({}, { macroprocesso: 1 }),
            this.listaNC({ nconformidade: 1 }, {}),
            this.listaUnidades({ _id: 0, Sigla: 1, Nome: 1 }, { Sigla: 1 })
        ]);
    }
    getListaTipos() {
        return Promise.all([
            this.listaMacro({}, { macroprocesso: 1 }),
            this.listaNC({ nconformidade: 1 }, {})            
        ]);
    }

}
module.exports = NCDao;