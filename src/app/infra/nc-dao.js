  
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
                .find({$or: [ {Macroprocesso:'Julgar'},{Macroprocesso:'Admissibilidade'}]})                
                .project({})
                .toArray(function(erro, res){
                    if(erro){
                        return reject('Não foi possível listar os riscos.');
                    } 
                //console.log(res);
                return resolve(res);            
            });
             
        });
    }

}

module.exports = NCDao;