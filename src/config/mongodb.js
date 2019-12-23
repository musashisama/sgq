const mongo = require('mongodb');
const cliente = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/sgq";
const opcoes = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
}
const dados = {};
const dbo ='';
const db = new mongo.Db('sgq', new mongo.Server("127.0.0.1", 27017), opcoes);

cliente.connect(url,opcoes,function(err, cliente) {
    if (err) throw err;
    console.log(`Conectado à base ${url}`);
    const dbo = cliente.db('sgq');      
     dados.nc = dbo.collection('naoconformidades');
     dados.registroNC = dbo.collection('registroNC');
     dados.macroprocessos = dbo.collection('macroprocessos');
     dados.unidadesCARF = dbo.collection('unidadesCARF');
     dados.usuarios = dbo.collection('usuarios');
     dados.fschunks = dbo.collection('uploads.chunks');
     dados.fsfiles = dbo.collection('uploads.files');
});

  
process.on('SIGINT', () =>
  cliente.close(() => {
      console.log('BD encerrado!');
      process.exit(0);
  })
);

module.exports = {
  dados, mongo, url, dbo, db
}



