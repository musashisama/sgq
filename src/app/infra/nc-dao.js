  
class NCDao {

    constructor(db) {
        this._db = db;

    }

    buscaPorEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM usuarios
                    WHERE email = ?
                `,
                [email],
                (erro, usuario) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o usuário!');
                    }

                    return resolve(usuario);
                }
            )
        });
    }

    lista() {
        
        return new Promise((resolve, reject) => {

            this._db.nc                
                .find()                
                .project({})
                .toArray(function(erro, res){
                    if(erro){
                        return reject('Não foi possível listar as Não conformidades.');
                    } 
                //console.log(res);
                return resolve(res);            
            });
             
        });
    }

    insere(registro) {

        return new Promise((resolve, reject) => {
                        
            this._db.registroNC.insertOne(registro, function(erro, res){
                if(erro) {
                    return reject('Não foi possível inserir o registro.');
                }
                return resolve(res);
            })
        });
    }

}

module.exports = NCDao;