const { promises } = require("fs-extra");

class PessoalDao {

    constructor(db) {
        this._db = db;
    }

    buscaUser(cpf) {
        return new Promise((resolve, reject) => {

            this._db.usuarios
                .find({ cpf: cpf })
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Erro na base de dados. Tente novamente mais tarde.');
                    }
                    return resolve(res);
                });

        });
    }

    getUsersCargo() {
        return Promise.all([
            //this.getUsers({cargo:"Conselheiro"}),
            this.getUsers({ funcao: "Colaborador" }),
            this.getUsers({ $and: [{ funcao: { $ne: "Terceirizado" } }, { funcao: { $ne: "Colaborador" } }, { cargo: { $ne: "Conselheiro" } }] }),
            this.getUsers({ funcao: "Terceirizado" })
        ]
        )
    }

    insereOcorrencia(registro){
        return new Promise((resolve, reject) => {
            this._db.ocorrencias.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }

    getUsers(filtro) {
        return new Promise((resolve, reject) => {

            this._db.usuarios
                .find(filtro)
                .project()
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Erro na base de dados. Tente novamente mais tarde.');
                    }
                    return resolve(res);
                });

        });
    }

    getUnidades(filtro) {
        return new Promise((resolve, reject) => {

            this._db.unidadesCARF
                .find(filtro)
                .project()
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Erro na base de dados. Tente novamente mais tarde.');
                    }
                    return resolve(res);
                });

        });
    }
    getTipoOcorrencias(filtro) {
        return new Promise((resolve, reject) => {

            this._db.tipoOcorrencias
                .find(filtro)
                .project()
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Erro na base de dados. Tente novamente mais tarde.');
                    }
                    return resolve(res);
                });

        });
    }

    getfuncoesCarf(filtro) {
        return new Promise((resolve, reject) => {
            this._db.funcoesCarf
                .find(filtro)
                .project()
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Erro na base de dados. Tente novamente mais tarde.');
                    }
                    return resolve(res);
                });

        });
    }

    getOcorrencias(filtro) {
        return new Promise((resolve, reject) => {
            this._db.ocorrencias
                .find(filtro)
                .project()
                .toArray(function (erro, res) {
                    if (erro) {
                        return reject('Erro na base de dados. Tente novamente mais tarde.');
                    }
                    return resolve(res);
                });

        });
    }

    editaCons(registro) {
        return new Promise((resolve, reject) => {
            console.log(registro.cpf);
            this._db.usuarios.updateOne({cpf:registro.cpf}, {$set :registro}, function (erro, res) {
                if (erro) {
                    return reject('Erro na base de dados. Tente novamente mais tarde.');
                }                    
                return resolve(res);
            });
        });

    }

    cadastraUser(registro) {

        return new Promise((resolve, reject) => {

            this._db.usuarios.insertOne(registro, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }
}

module.exports = PessoalDao;