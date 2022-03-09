let colResponsivo = {
    formatter: 'responsiveCollapse',
    width: 30,
    minWidth: 30,
    hozAlign: 'left',
    resizable: false,
    headerSort: false,
    responsive: 0,
    download: true,
  },
  colProcesso = {
    title: 'Processo',
    field: 'Processo',
    sorter: 'number',
    hozAlign: 'center',
    headerFilter: 'input',
    topCalc: countCalc,
    editor: false,
    responsive: 0,
    download: true,
  },
  colContribuinte = {
    title: 'Contribuinte',
    field: 'contribuinte',
    headerFilter: 'input',
    sorter: 'string',
    hozAlign: 'center',
    width: 150,
    editor: false,
    responsive: 0,
    download: true,
  },
  colProcessoColore = {
    title: 'Processo',
    field: 'Processo',
    formatter: coloreProc,
    sorter: 'number',
    hozAlign: 'center',
    headerFilter: 'input',
    topCalc: countCalc,
    editor: false,
    responsive: 0,
    download: true,
  },
  colContribuinteColore = {
    title: 'Contribuinte',
    field: 'contribuinte',
    formatter: coloreProc,
    headerFilter: 'input',
    sorter: 'string',
    hozAlign: 'center',
    width: 150,
    editor: false,
    responsive: 0,
    download: true,
  },
  colApenso = {
    title: 'Ind. Apenso',
    field: 'apenso',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: true,
  },
  colAtividade = {
    title: 'Atividade',
    field: 'atividade',
    sorter: 'string',
    hozAlign: 'center',
    topCalc: countCalc,
    editor: false,
    responsive: 0,
    download: true,
  },
  colSituacao = {
    title: 'Situação de Julgamento',
    field: 'situacao',
    sorter: 'string',
    headerFilter: 'input',
    topCalc: countCalc,
    hozAlign: 'center',
    editor: false,
    responsive: 0,
    download: true,
  },
  colEntradaAtividade = {
    title: 'Entrada na Atividade',
    field: 'entradaAtividade',
    sorter: 'date',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: true,
  },
  colHE = {
    title: 'Horas CARF',
    field: 'HE',
    sorter: 'number',
    hozAlign: 'center',
    headerFilter: 'input',
    accessorDownload: numberConvert,
    topCalc: somaCalc,
    editor: false,
    responsive: 0,
    download: true,
  },
  colDiasNaAtividade = {
    title: 'Dias na Atividade',
    field: 'Dias_na_Atividade',
    sorter: 'number',
    hozAlign: 'center',
    width: 140,
    topCalc: mediaCalc,
    editor: false,
    formatter: coloreDias,
    responsive: 0,
    download: true,
  },
  colDAAPS = {
    title: 'Dias na Atividade na Próxima Sessão',
    field: 'DAAPS',
    sorter: 'number',
    width: 140,
    hozAlign: 'center',
    editor: false,
    formatter: coloreDias,
    responsive: 0,
    download: true,
  },
  colValor = {
    title: 'Valor do Processo',
    field: 'valor',
    sorter: 'number',
    hozAlign: 'center',
    editor: false,
    formatter: formatValor,
    accessorDownload: numberConvert,
    responsive: 0,
    download: true,
  },
  colValorOriginal = {
    title: 'Valor Original',
    field: 'valorOriginal',
    sorter: 'number',
    hozAlign: 'center',
    editor: false,
    formatter: formatValor,
    accessorDownload: numberConvert,
    responsive: 0,
    download: true,
  },
  colValorOriginario = {
    title: 'Valor Originário Lançado/Pleiteado',
    field: 'valorOrig',
    sorter: 'number',
    hozAlign: 'center',
    editor: false,
    formatter: formatValor,
    accessorDownload: numberConvert,
    responsive: 0,
    download: true,
  },
  colValorCreditoLancado = {
    title: 'Valor Crédito Lançado (Multa de Ofício)',
    field: 'valorCrdLanc',
    sorter: 'number',
    hozAlign: 'center',
    editor: false,
    formatter: formatValor,
    accessorDownload: numberConvert,
    responsive: 1,
    download: true,
  },
  colValorSemTJM = {
    title: 'Valor Sem TJM (Atual)',
    field: 'valorSemTJM',
    sorter: 'number',
    hozAlign: 'center',
    editor: false,
    formatter: formatValor,
    accessorDownload: numberConvert,
    responsive: 1,
    download: true,
  },
  colImpostoProjetado = {
    title:
      'Imposto Projetado Sobre Lançamento de Reduções de Base de Cálculo e/ou de Imposto',
    field: 'impostoProj',
    sorter: 'number',
    hozAlign: 'center',
    editor: false,
    formatter: formatValor,
    accessorDownload: numberConvert,
    responsive: 1,
    download: true,
  },
  colOBS = {
    title: 'Observações',
    field: 'obs',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: true,
  },
  colPrioridade = {
    title: 'Prioridade',
    field: 'prioridade',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: true,
  },
  colAssunto = {
    title: 'Assunto',
    field: 'assunto',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: true,
  },
  colMotivoPrioridade = {
    title: 'Motivo da Prioridade',
    field: 'motPrior',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: true,
  },
  colAlegacoes = {
    title: 'Alegações',
    field: 'alegacoes',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: true,
  },
  colDiasDaSessao = {
    title: 'Dias da Sessão de Julgamento',
    field: 'Dias_da_SJ',
    sorter: 'number',
    width: 150,
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: false,
  },
  colDataSessao = {
    title: 'Data da Sessão de Julgamento',
    field: 'dtSessao',
    sorter: 'number',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: false,
  },
  colDiasUltimaDistruicao = {
    title: 'Dias da Última Distribuição',
    field: 'Dias_da_Dist',
    sorter: 'number',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: false,
  },
  colRetornoSEPOJ = {
    title: 'Retorno Sepoj?',
    field: 'Retorno_Sepoj',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: true,
  },
  colUltimaEquipe = {
    title: 'Última Equipe',
    field: 'ultEquipe',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: false,
  },
  colJuntada = {
    title: 'Solicitação de Juntada?',
    field: 'juntada',
    sorter: 'string',
    hozAlign: 'center',
    editor: false,
    responsive: 2,
    download: false,
  };
