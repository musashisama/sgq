const { promises } = require("fs-extra");
const { ObjectID } = require("mongodb");

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

    getUsers(filtro, projecao) {
        return new Promise((resolve, reject) => {

            this._db.usuarios
                .find(filtro)
                .project(projecao)
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

    editaPessoa(registro) {
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

    editaOcorrencia(id, registro) {
        return new Promise((resolve, reject) => {            
            delete registro._id
            this._db.ocorrencias.updateOne({_id: new ObjectID(id) }, {$set :registro}, function (erro, res) {
                if (erro) {
                    
                    return reject('Erro na base de dados. Tente novamente mais tarde.');
                }                    
                return resolve(res);
            });
        });
    }

    excluiOcorrencia(id){        
        return new Promise((resolve, reject) => {
            this._db.ocorrencias.deleteOne({_id: new ObjectID(id)}, function (erro, res) {
                if (erro) {
                    return reject('Não foi possível excluir o registro.');
                }
                return resolve(res);
            })
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