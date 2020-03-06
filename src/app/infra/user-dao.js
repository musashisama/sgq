class UserDao {

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
    getDadosForm(){
        // <-ARRUMAR
    }
}

module.exports = UserDao;