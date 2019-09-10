const cliente = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const opcoes = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true  
}
const dados = {};


cliente.connect(url, opcoes,function(err, cliente) {
    if (err) throw err;
    console.log("Conectado");
    const dbo = cliente.db('grci');
     dados.riscos = dbo.collection('riscos');
     dados.causas = dbo.collection('causas');

    //console.log(dados.riscos);
       
});

  
process.on('SIGINT', () =>
  cliente.close(() => {
      console.log('BD encerrado!');
      process.exit(0);
  })
);

module.exports = dados;



