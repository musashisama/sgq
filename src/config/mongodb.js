const mongo = require('mongodb');
const cliente = require('mongodb').MongoClient;
//const url = "mongodb://sgi:X19T2eOt!Z6BDaT#yt4w!24nI@localhost:27017";
const url = "mongodb://localhost:27017/sgq";
const opcoes = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const dados = {};
const dbo = '';
const db = new mongo.Db('sgq', new mongo.Server("127.0.0.1", 27017), opcoes);

cliente.connect(url, opcoes, function (err, cliente) {
  if (err) throw err;
  console.log(`Conectado à base de dados.`);
  const dbo = cliente.db('sgq');
  dados.nc = dbo.collection('naoconformidades');
  dados.registroNC = dbo.collection('registroNC');
  dados.macroprocessos = dbo.collection('macroprocessos');
  dados.unidadesCARF = dbo.collection('unidadesCARF');
  dados.usuarios = dbo.collection('usuarios');
  dados.solicitacoes = dbo.collection('solicitacoes');
  dados.tpSolicitacoes = dbo.collection('tipoSolicitacoes');
  dados.registroLogs = dbo.collection('logs');
  dados.calendario = dbo.collection('calendario');
  dados.faq = dbo.collection('faq');
  dados.gc = dbo.collection('gc');
  dados.portal = dbo.collection('portal');
  dados.tipoOcorrencias = dbo.collection('tipoOcorrencias');
  dados.ocorrencias = dbo.collection('ocorrencias');
  dados.funcoesCarf = dbo.collection('funcoesCARF');
  dados.perfis = dbo.collection('perfis');
  dados.trocasenha = dbo.collection('trocasenha');
  dados.relatorios = dbo.collection('relatorios');
  dados.config = dbo.collection('config');
  dados.fschunks = dbo.collection('uploads.chunks');
  dados.fsfiles = dbo.collection('uploads.files');
  dados.arquivos = dbo.collection('arquivos');
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



