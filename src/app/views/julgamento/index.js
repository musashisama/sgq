module.exports = {
  //COJUL
  estoque: require('./estoque/estoque.marko'),
  estoque_conselheiros: require('./estoque/estoque_conselheiros.marko'),
  analiseEstoque: require('./estoque/analiseEstoque.marko'),
  carregacsv: require('./carregacsv/carregacsv.marko'),
  escolhecsv: require('./escolhecsv/escolhecsv.marko'),
  escolhecsvregap: require('./escolhecsv/escolhecsvregap.marko'),
  escolhecsvanaliseestoque: require('./escolhecsv/escolhecsvanaliseestoque.marko'),
  escolhecsvreinp: require('./escolhecsv/escolhecsvreinp.marko'),
  reinpgeral: require('./reinp/reinpgeral.marko'),
  detalhareinp: require('./reinp/detalhareinp.marko'),
  corrigeReinp: require('./reinp/corrigereinp.marko'),
  //REGAP Antigo
  regapCojul: require('./regap/regapCojul.marko'),
  regap: require('./regap/regap.marko'),
  //Novo REGAP
  regap_individual_cojul: require('./regap/regapIndividualCojul.marko'),
  regap_consolidado: require('./regap/regapConsolidado.marko'),
  faqdipaj: require('./faqdipaj/faqdipaj.marko'),
  cadastrafaqdipaj: require('./faqdipaj/cadastrafaqdipaj.marko'),
  formFAQ: require('./faqdipaj/formFAQ.marko'),
  calendario: require('./calendario/calendario.marko'),
  calendarioView: require('./calendario/calendarioView.marko'),
  gestaoconhecimento: require('./gestaoconhecimento/gestaoconhecimento.marko'),
  gestaoGC: require('./gestaoconhecimento/gestaoGC.marko'),
  gestaoPortal: require('./portalcojul/gestaoPortal.marko'),
  portalCojul: require('./portalcojul/portalCojul.marko'),
  gestaosolicitacoes: require('./gestaosolicitacoes/gestaosolicitacoes.marko'),
  gestaoregsolicitacoes: require('./gestaosolicitacoes/gestaoregsolicitacoes.marko'),
  detalhasolicitacao: require('./gestaosolicitacoes/detalhasolicitacao.marko'),
  gestaorelatorios: require('./gestaorelatorios/gestaorelatorios.marko'),
  //Conselheiros
  paginadoconselheiro: require('./conselheiros/paginadoconselheiro.marko'),
  regap_individual: require('./conselheiros/regap_individual.marko'),
  portaldoconselheiro: require('./conselheiros/portaldoconselheiro.marko'),
  reinp_individual: require('./conselheiros/reinp_individual.marko'),
  ocorrencias: require('./conselheiros/ocorrencias.marko'),
  solicitacoescons: require('./conselheiros/solicitacoescons.marko'),
  consolicitacoes: require('./conselheiros/consolicitacoes.marko'),
  indicapauta: require('./conselheiros/indicapauta.marko'),
  //COSUP
  gestaoPortalCosup: require('./cosup/portalcosup/gestaoPortal.marko'),
  portalCosup: require('./cosup/portalcosup/portalCosup.marko'),
  gestaoIndicacao: require('./cosup/indicacao/gestaoIndicacao.marko'),
};
