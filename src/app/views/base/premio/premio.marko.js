// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/premio/premio.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    app_scripts_css_template = require("../../components/app-scripts-css.marko"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    app_scripts_css_tag = marko_loadTag(app_scripts_css_template),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    app_header_template = require("../../components/app-header.marko"),
    app_header_tag = marko_loadTag(app_header_template),
    app_navbar_template = require("../../components/app-navbar.marko"),
    app_navbar_tag = marko_loadTag(app_navbar_template),
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    app_footer_template = require("../../components/app-footer.marko"),
    app_footer_tag = marko_loadTag(app_footer_template),
    app_scripts_js_template = require("../../components/app-scripts-js.marko"),
    app_scripts_js_tag = marko_loadTag(app_scripts_js_template),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html>");

  app_scripts_css_tag({}, out, __component, "1");

  out.w("<style>\r\nbody {\r\n  background-image: url('/estatico/imagens/backgroundpremio.png');\r\n  background-repeat: no-repeat;\r\n  background-attachment: fixed;\r\n  background-size: 100% 100%;\r\n}\r\n</style><body>");

  component_globals_tag({}, out);

  app_header_tag({}, out, __component, "4");

  out.w("<main class=\"conteudoPrincipal\">");

  app_navbar_tag({}, out, __component, "6");

  out.w("<div class=\"container\"><br><br><div id=\"premioPrincipal\" style=\"font-size:1.2em;\"><div class=\"row\"><div class=\"col s12 m2\"><img src=\"/estatico/imagens/logopremio.png\" alt=\"Prêmio 'Mérito Funcional Ministro Leopoldo de Bulhões'\" style=\"float:left;width:100%\"></div><div class=\"col s12 m5\"><div class=\"card orange darken-1 hoverable\"><div class=\"card-content white-text\"><span class=\"card-title\">Sobre a Premiação</span><p>Informações acerca da Premiação.</p></div><div class=\"card-action right-align\"><a id=\"cardSobre\" class=\"white-text \" href=\"#\"><i class=\"material-icons hoverable\">send</i></a></div></div></div><div class=\"col s12 m5\"><div class=\"card blue darken-1 hoverable\"><div class=\"card-content white-text\"><span class=\"card-title\">Regulamentação</span><p>Regulamentação do Prêmio.</p></div><div class=\"card-action right-align\"><a class=\"white-text right-align\" href=\"https://intranet.carf/publicacoes-oficiais/copy_of_2016/portaria_carf-62-premio-merito-funcional-ministro-leopoldo-de-bulhoes.pdf\" target=\"_blank\"><i class=\"material-icons hoverable\">send</i></a></div></div></div><div class=\"col s12 m5\"><div class=\"card blue-grey lighten-2 hoverable\"><div class=\"card-content white-text\"><span class=\"card-title\">Agraciados</span><p>Relação dos agraciados nos anos anteriores.</p></div><div class=\"card-action right-align\"><a class=\"white-text right-align\" href=\"https://intranet.carf/gestao-corporativa/pessoas/relacao-de-premiados-pmflb-por-ano.pdf\" target=\"_blank\"><i class=\"material-icons hoverable\">send</i></a></div></div></div><div class=\"col s12 m5\"><div class=\"card green darken-1 hoverable\"><div class=\"card-content white-text\"><span class=\"card-title\">Votar</span><p>Efetuar o registro do seu voto.</p></div><div class=\"card-action right-align\"><a id=\"cardVoto\" class=\"white-text right-align\" href=\"#\"><i class=\"material-icons hoverable\">send</i></a></div></div></div></div></div><div id=\"premioVoto\"><div class=\"row\"><div id=\"dataCons\"" +
    marko_attr("data-cons", "" + data.cons) +
    "></div><div id=\"dataServ\"" +
    marko_attr("data-serv", "" + data.serv) +
    "></div><div id=\"dataTerc\"" +
    marko_attr("data-terc", "" + data.terc) +
    "></div><p style=\"font-size:1.2em;\">Para registrar seu voto, selecione o nome na lista e clique em <i class=\"material-icons blue-text\">send</i> para preencher o quadro colorido à direita. Caso tenha selecionado o candidato errado, clique em <i class=\"material-icons red-text\">cancel</i> à direita do quadro colorido e selecione o seu candidato novamente.<br> Após selecionados seus candidatos, clique em VOTAR <i class=\"material-icons\">check</i> e seu voto será automaticamente computado. <strong>Atenção! Cada pessoa poderá registrar apenas um voto por categoria e, após registrados, os votos não poderão ser excluídos ou corrigidos. A condecoração é concedida uma única vez durante toda a carreira funcional. Por isso, os agraciados em anos anteriores não constam da listagem de votação</strong></p><br><br><div class=\"row valign-wrapper\"><div class=\"form-group input-field selectCons col s5\"><select required name=\"selectCons\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$0 = 0;

  marko_forEach(data.cons, function(cons) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.cons) +
      ">" +
      marko_escapeXml(cons) +
      "</option>");
  });

  out.w("</select><label for=\"selectCons\">Conselheiro</label></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnSelCons\"><i class=\"material-icons green-text text-lighten-1\">send</i></a></div><div class=\"card hoverable green lighten-1 col s5\"><div class=\"card-content white-text\"><span class=\"card-title\">Conselheiro</span><h5 class=\"white-text\"><strong><span id=\"nomeCons\"></span></strong></h5></div></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnCancelCons\"><i class=\"material-icons red-text\">cancel</i></a></div></div><div class=\"row valign-wrapper\"><div class=\"form-group input-field selectServ col s5\"><select required name=\"selectServ\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$1 = 0;

  marko_forEach(data.serv, function(serv) {
    var $keyScope$1 = "[" + (($for$1++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.serv) +
      ">" +
      marko_escapeXml(serv) +
      "</option>");
  });

  out.w("</select><label for=\"selectServ\">Servidor</label></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnSelServ\"><i class=\"material-icons orange-text text-darken-1\">send</i></a></div><div class=\"card hoverable orange darken-1 col s5\"><div class=\"card-content white-text\"><span class=\"card-title\">Servidor</span><h5 class=\"white-text\"><strong><span id=\"nomeServ\"></span></strong></h5></div></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnCancelServ\"><i class=\"material-icons red-text\">cancel</i></a></div></div><div class=\"row valign-wrapper\"><div class=\"form-group input-field selectTerc col s5\"><select required name=\"selectTerc\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$2 = 0;

  marko_forEach(data.terc, function(terc) {
    var $keyScope$2 = "[" + (($for$2++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.terc) +
      ">" +
      marko_escapeXml(terc) +
      "</option>");
  });

  out.w("</select><label for=\"selectTerc\">Terceirizado</label></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnSelTerc\"><i class=\"material-icons light-blue-text text-darken-3\">send</i></a></div><div class=\"card hoverable light-blue darken-3 col s5\"><div class=\"card-content white-text\"><span class=\"card-title\">Terceirizado</span><h5 class=\"white-text\"><strong><span id=\"nomeTerc\"></span></strong></h5></div></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnCancelTerc\"><i class=\"material-icons red-text\">cancel</i></a></div></div></div><div class=\"row center-align\"><a class=\"waves-effect waves-light green btn-large btnVotar\"><i class=\"material-icons right\">check</i>VOTAR</a></div></div><div id=\"premioSobre\" style=\"font-size:1.2em;\"><h6>A Premiação</h6><p>O Prêmio tem o objetivo de promover o reconhecimento meritório dos servidores e conselheiros em exercício no Conselho Administrativo de Recursos Fiscais (CARF), bem como os colaboradores, que, por sua dedicação ao serviço e atributos profissionais e pessoais, se distingam entre seus pares, sejam referência em conduta profissional e contribuam para a harmonia e produtividade em seus ambientes de trabalho.</p><p>O reconhecimento profissional pelos relevantes serviços prestados aos órgão está diretamente relacionado aos objetivos estratégicos do Ministério da Economia e compõe uma das principais políticas deste Conselho, que é o reconhecimento e valorização do corpo funcional.</p><p>A premiação, instituída em 2010 por meio de Portaria do Presidente do CARF, é destinada aos Servidores em todos os níveis da carreira, aos Conselheiros e aos Colaboradores, como reconhecimento àqueles que se destacam no desempenho de suas funções. Esse reconhecimento fortalece o vínculo das pessoas ao CARF, criado pela Medida Provisória nº 449, de 2008, convertida na Lei nº 11.941, de 27 de maio de 2009, e instalado pelo Ministro de Estado da Fazenda em 15 de fevereiro de 2009, mediante Portaria MF nº 41, de 2009.</p><p>A condecoração é denominada “PRÊMIO DE MÉRITO FUNCIONAL MINISTRO LEOPOLDO DE BULHÕES” em homenagem ao primeiro presidente do primeiro tribunal brasileiro, instituído em 14 de setembro de 1925, na cidade do Rio de Janeiro – à época Distrito Federal –, com a finalidade de apreciar em última instância administrativa os processos administrativos fiscais: o Conselho de Contribuinte do Imposto de Renda no Distrito Federal.</p><p>A solenidade de entrega do prêmio ocorre, anualmente, na semana da comemoração do aniversário do CARF.</p><h6>O Homenageado</h6><img src=\"/estatico/imagens/leopoldo.jpg\" alt=\"Ministro Leopoldo de Bulhões\" style=\"float:right;width:13%\"><p>O Ministro Jose Leopoldo de Bulhões Jardim nasceu em 28 de setembro de 1856, na cidade de Goiás (GO), e formou-se em advocacia pela Faculdade de Direito, São Paulo, em 1880.</p><p>O homenageado foi Ministro da Fazenda nos governos dos presidentes Rodrigues Alves (1902-1906) e Nilo Peçanha (1910-1911), além presidir o Conselho de Contribuintes do Imposto de Renda no Distrito Federal, em 1925.</p><p>Leopoldo de Bulhões exerceu diversos cargos administrativos nas esferas estadual e federal e teve vasta vida parlamentar dedicada ao país. Foi Deputado Geral na Câmara Federal, no Império (1881/85); Constituinte Federal (1891); Constituinte Estadual (1891); Deputado Federal (1891/93); e Senador Federal nos períodos de 1897/90, 1900/03, 1911, 1912/15 e 1915/18.</p><p>Notável combatente da permanência de Rui Barbosa no Ministério da Fazenda, Leopoldo de Bulhões foi decisivo no plano de estabilização monetária do ex-presidente Washington Luís. Também foi um defensor da criação do imposto de renda. Em 1921, o presidente da Comissão de Finanças da Câmara dos Deputados, impressionado com a defesa do senador Leopoldo de Bulhões para a implantação do imposto de renda, convidou-o para combater os argumentos contra esse imposto. Anos antes, Leopoldo de Bulhões havia mostrado o nível de aperfeiçoamento que o imposto de renda havia alcançado em outros países com arrecadação cada vez mais satisfatória. Entretanto, como logo depois abandonou a política, não apresentou o projeto de lei que defendia.</p><p>Entre suas publicações destacam-se os discursos “A conversão do papel Moeda”, de 1892, e “Meio Circulante e Abolição dos Escravos”, de 1893.</p><p>Filho de Inácio Soares de Bulhões e Antônia Emília de Bulhões Jardim e casado com Cecília Félix de Souza (filha do Desembargador Benedito Félix de Souza), Leopoldo de Bulhões faleceu em 15 de dezembro de 1928, na cidade de Petrópolis (RJ).</p><h6>A Regulamentação</h6><p>Para a padronização dos procedimentos necessários ao “Prêmio de Mérito Funcional Ministro Leopoldo de Bulhões” são observados:</p><p><strong>1.1. Composição do prêmio</strong></p><p>O prêmio é composto por medalha e broche de lapela, acompanhados do respectivo diploma.</p><p><strong>1.2. Elegibilidade</strong></p><p>São candidatos à premiação os servidores, os conselheiros e os colaboradores em exercício no CARF que tenham se destacado no exercício de suas atribuições, por relevantes serviços prestados ao órgão.</p><p>A condecoração será concedida ao servidor, ao conselheiro ou ao colaborador por uma única vez durante toda a carreira funcional ou profissional, independentemente da razão de premiação.</p><p><strong>1.3. Total de homenageados.</strong></p><p>I – Condecorados com o Prêmio de Mérito Funcional, por desempenho, indicados pelos pares:</p><p>a) até três servidores; e</p><p>b) até três conselheiros.</p><p>O Auditor-Fiscal da Receita Federal do Brasil (AFRFB) que colaboram, em regime de dedicação integral, nas atividades finalísticas do CARF, na forma disposta no art. 8º da Portaria MF nº 343, de 9 de junho de 2015, votarão e serão votados, computando-se tais votos e indicações nas vagas destinadas aos conselheiros.</p><p>II – Condecorado com Diploma de Menção Honrosa</p><p>Serão condecorados com Menção Honrosa, por desempenho, até dois colaboradores que atuem em tempo integral no CARF mediante contrato de trabalho com empresas terceirizadas.</p><p>III – Condecorados em decorrência de elogio funcional:</p><p>Será condecorado o servidor, o conselheiro ou o colaborador que, nos doze meses que precedam a data da premiação, tenha recebido elogio funcional constante de Portaria do Presidente do CARF, por relevantes serviços prestados ao CARF.</p><p>São considerados colaboradores para fins da condecoração:</p><p>a) servidor ou empregado público à disposição do CARF ou que realizem atividades, mesmo que em caráter temporário, em prol da melhoria da gestão do órgão;</p><p>b) o contratado que atua em tempo integral no CARF mediante contrato de trabalho com empresa terceirizada, cujo reconhecimento dar-se-á com a concessão de Diploma de Mençao Honrosa.</p><p><strong>Não há limite</strong> de vagas para os homenageados em decorrência de elogio funcional constante de portaria do Presidente do CARF.</p><p><strong>1.4. Indicação e seleção</strong></p><p>Os servidores, os conselheiros e os colaboradores votarão e serão votados por meio de enquete aberta em sistema eletrônico disponibilizado pelo CARF, o qual conterá, separadamente, campos para votação em servidor, conselheiro ou colaborador. Para cada vaga disponível para a condecoração do Prêmio de Mérito Funcional ou do Diploma de Menção Honrosa, serão selecionados os três mais votados. A título de exemplo, tem-se a seguinte configuração:</p><p>a) Se uma vaga, seleciona-se os três mais votados;</p><p>b) Se duas vagas, seleciona-se os seis mais votados; e</p><p>c) Se três vagas, seleciona-se os nove mais votados.</p><p>O sistema informatizado gera o relatório com os nomes mais votados em cada categoria, com o <strong>percentual de votação</strong> de cada um dos indicados, de acordo com o número de vagas disponível.</p><p><strong>O relatório não deverá constar o número de votos recebidos</strong>, e sim, apenas o percentual.</p><p>Caberá a Comissão de Seleção fazer a análise das indicações e, de acordo com critérios pré-estabelecidos, selecionar dentre os indicados aqueles que serão condecorados.</p><p><strong>1.5. Comissão de seleção</strong></p><p>A Comissão de Seleção tem por atribuição e finalidade conduzir e coordenar o processo de seleção dos servidores, conselheiros e colaboradores indicados por meio de seleção interna para o processo de reconhecimento funcional.</p><p>A Comissão é constituída por portaria do Presidente do CARF especificamente para a seleção dos servidores, conselheiros e colaboradores a serem indicados ao Prêmio de Mérito Funcional e ao Diploma de Menção Honrosa. Será composta pelos Presidentes de Seção de Julgamento e pelo Coordenador de Gestão Coorporativa do CARF (Cogec), a quem compete presidir os trabalhos.</p><p>No impedimento ou impossibilidade, os membros da Comissão serão substituídos pelos substitutos eventuais das respectivas Seções e da Cogec.</p><p>Os membros designados para compor a Comissão de Seleção reunir-se-ão, ordinariamente, por convocação do Presidente da Comissão.</p><p><strong>1.6. Critérios de seleção</strong></p><p>Na seleção dos candidatos, pela Comissão, são consideradas características identificadoras de padrão de excelência e desempenho funcional, tais como: dedicação ao trabalho (comprometimento, responsabilidade, zelo pelo bem público e entusiasmo); competência profissional; cooperação (espírito de equipe, colaboração e coleguismo); e interesse (sugestões para melhoria do setor).</p><p>Estes critérios serão, tanto quanto possível, objetivos, cabendo ao Serviço de Gestão de Pessoas (Segep), subsidiado pela chefia imediata, fornecer as informações acima caso sejam necessárias e formalmente exigidas pela Comissão de Seleção.</p><p>Não pode ser agraciado com a premiação o servidor, conselheiro ou colaborador que tenha sofrido qualquer espécie de penalidade administrativa, ou que responda a inquérito administrativo ou a processo judicial por crime contra a administração pública, bem como que tenha sofrido censura ética.</p><p><strong>1.7. Critérios de desempate</strong></p><p>No caso de empate, são aplicados os seguintes critérios de desempate:</p><p>I – maior tempo de exercício contínuo no CARF;</p><p>II – maior tempo de exercício no CARF de forma descontinuada;</p><p>III – maior idade.</p><p>Caso ainda permaneça o empate, caberá ao presidente da Comissão de Seleção o desempate.</p><p><strong>1.8. Perda do direto ao uso da medalha</strong></p><p>Será excluído da relação de agraciados e perde o direito ao uso da medalha o condecorado que:</p><p>I – perder o cargo em virtude de sentença judicial transitada em julgado;</p><p>II – for demitido em razão de processo administrativo disciplinar; ou</p><p>III – for condenado, em sentença judicial transitada em julgado, por crimes contra a administração pública.</p><p><strong>1.9. Premiação e Solenidade Final</strong></p><p>A premiação ocorrerá,<strong>preferencialmente no dia 14 de setembro, aniversário do CARF</strong>, ou dentro da semana da respectiva semana no caso de feriado ou final de semana.</p><p>Previamente à cerimônia, será expedida portaria de concessão da condecoração com publicação em Boletim de Serviço do CARF, com obrigatória inclusão nos assentamentos funcionais dos condecorados.</p><p>A condecoração ocorrerá em solenidade oficial, com a presença dos premiados, seus familiares, colegas de trabalho, respectivas chefias imediatas e dirigentes do CARF.</p><p><strong>1.10. Perda de direito de uso da medalha</strong></p><p>Será excluído da relação de agraciados o perdera o direito ao uso da medalha o condecorado que:</p><p>I— perder o cargo em virtude de sentença judicial transitada em julgado;</p><p>II — for demitido em razão de processo administrativo disciplinar;</p><p>III — for condenado, em sentença judicial transitada em julgado, por crimes contra a administração publica.</p><h6>A Identidade Visual</h6><img src=\"/estatico/imagens/idvisual.png\" alt=\"Identidade Visual\"><h6>A Medalha</h6><img src=\"/estatico/imagens/medalha.png\" alt=\"Medalha\"><h6>O Broche de Lapela</h6><img src=\"/estatico/imagens/broche.png\" alt=\"Broche\"><h6>O Diploma</h6><img src=\"/estatico/imagens/diploma.png\" alt=\"Diploma\"></div></div></main>");

  app_footer_tag({}, out, __component, "210");

  app_scripts_js_tag({}, out, __component, "211");

  out.w("<script src=\"/estatico/js/base/premio.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "213");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/base/premio/premio.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
