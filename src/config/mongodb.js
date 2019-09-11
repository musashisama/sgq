const cliente = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const opcoes = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true  
}
const dados = {};


cliente.connect(url, opcoes,function(err, cliente) {
    if (err) throw err;
    console.log(`Conectado à base ${url}`);
    const dbo = cliente.db('sgq');
     dados.nc = dbo.collection('naoconformidades');
     dados.registroNC = dbo.collection('registroNC');
     //dados.causas = dbo.collection('causas');
});

  
process.on('SIGINT', () =>
  cliente.close(() => {
      console.log('BD encerrado!');
      process.exit(0);
  })
);

module.exports = dados;



