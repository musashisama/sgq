// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/conselheiros/paginadoconselheiro.marko",
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
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    app_modal_tabela_legenda_template = require("../../components/app-modal-tabela-legenda.marko"),
    app_modal_tabela_legenda_tag = marko_loadTag(app_modal_tabela_legenda_template),
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

  out.w("<body>");

  component_globals_tag({}, out);

  app_header_tag({}, out, __component, "3");

  out.w("<main class=\"conteudoPrincipal\">");

  app_navbar_tag({
      id: "slide-out",
      class: "sidenav"
    }, out, __component, "5");

  out.w("<div class=\"container\"><h3 class=\"center-align titulo nomeSol\"><strong>Cons. " +
    marko_escapeXml(data.user.nome) +
    "</strong> - " +
    marko_escapeXml(data.user.tipo) +
    "</h3><div class=\"row\"><div class=\"col s12\"><p><h6><strong>CPF:</strong><span id=\"cpfCons\">" +
    marko_escapeXml(data.user.cpf) +
    "</span></h6></p><p><h6><strong>Turma:</strong> " +
    marko_escapeXml(data.user.unidade) +
    "</h6></p><p><h6><strong>Final do Mandato:</strong> " +
    marko_escapeXml(data.user.dtFimMandato) +
    "</h6></p><p><h6>Falta(m) <strong><span id=\"daps\"></span></strong> dia(s) para a próxima sessão, que será realizada em <strong><span id=\"ps\"></span></strong>.</h6></p></div></div><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s2\"><a href=\"#processos\">Processos - REGAP</a></li><li class=\"tab col s3\"><a href=\"#produtividade\">Produtividade - REINP</a></li><li class=\"tab col s3\"><a href=\"#stats\">Gráficos - REGAP e REINP</a></li><li class=\"tab col s2\"><a href=\"#ocorrencias\">Ocorrências</a></li><li class=\"tab col s2\"><a href=\"#solicitacoes\">Solicitações</a></li></ul></div><div id=\"processos\" class=\"col s12\"><div class=\"row\"><br><div id=\"dataCAL\"" +
    marko_attr("data-cal", "" + data.cal) +
    "></div><div class=\"form-group input-field  col s3\"><select class=\"dataRelRegap\" name=\"dataRelRegap\" id=\"dataRelRegap\"><option class=\"form-group\"" +
    marko_attr("value", "") +
    " disabled selected>Clique para selecionar</option>");

  var $for$0 = 0;

  marko_forEach(data.dados, function(dado) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", "" + dado.id) +
      ">" +
      marko_escapeXml(dado.dtExtracao) +
      "</option>");
  });

  out.w("</select><label>Selecione a data do relatório:</label></div><div class=\"form-group input-field  col s3\"><select class=\"Atividade\" name=\"atividadeSelect\" id=\"atividadeSelect\"><option class=\"form-group\" value=\"Todas\" selected>Todas</option><option class=\"form-group\" value=\"Para Relatar\">Para Relatar</option><option class=\"form-group\" value=\"Formalizar Decisao\">Formalizar Decisão</option><option class=\"form-group\" value=\"Formalizar Voto Vencedor\">Formalizar Voto Vencedor</option><option class=\"form-group\" value=\"Corrigir Decisão\">Corrigir Decisão</option><option class=\"form-group\" value=\"Apreciar e Assinar Documento\">Apreciar e Assinar Documento</option></select><label>Selecione a atividade para filtrar:</label></div><div class=\"form-group input-field  col s2\"><label><input name=\"repetitivosCheck\" id=\"repetitivosCheck\" type=\"checkbox\"><span>Ocultar Repetitivos</span></label></div><div class=\"form-group input-field  col s2\"><label><input name=\"aguardandoPauta\" id=\"aguardandoPauta\" type=\"checkbox\"><span>Somente \"Aguardando Pauta\"?</span></label></div><div class=\"form-group input-field  col s2\"><label><input name=\"abaixoUM\" id=\"abaixoUM\" type=\"checkbox\"><span>Somente Abaixo de R$ 1 milhão??*</span></label></div><div class=\"progressRegap col s3\"><div class=\"preloader-wrapper small active\"><div class=\"spinner-layer spinner-green-only\"><div class=\"circle-clipper left\"><div class=\"circle\"></div></div><div class=\"gap-patch\"><div class=\"circle\"></div></div><div class=\"circle-clipper right\"><div class=\"circle\"></div></div></div></div></div></div><div id=\"\" class=\"row classProcessos\"><div class=\"col s12 right-align\"><a class=\"dropdownDownloadCons waves-effect waves-yellow hoverable z-depth-3 btn-floating red\" href=\"#\" data-target=\"dropdownRegap\"><i class=\"material-icons\">file_download</i></a><ul id=\"dropdownRegap\" class=\"dropdown-content\"><li class=\"divider\" tabindex=\"-1\"></li><li><a class=\"xlsxDownRegap\" href=\"#!\"><i class=\"xlsxDownRegap material-icons\">file_download</i>XLSX</a></li><li class=\"divider\" tabindex=\"-1\"></li><li><a class=\"csvDownRegap\" href=\"#!\"><i class=\"csvDownRegap material-icons\">file_download</i>CSV</a></li><li class=\"divider\" tabindex=\"-1\"></li></ul><a href=\"#!\" id=\"mostraColunasAtividade\" title=\"Agrupar/Desagrupar por Atividade\" class=\"waves-effect waves-yellow hoverable z-depth-3 btn-floating blue\"><i class=\"material-icons\">unfold_less</i></a><a href=\"#modal2\" id=\"mostraLegenda\" title=\"Mostrar Legenda da Tabela\" class=\"waves-effect waves-purple hoverable z-depth-3 btn-floating black\"><i class=\"material-icons\">details</i></a></div></div><div id=\"tabelaRegap\"></div><p>* <strong>ATENÇÃO:</strong> O campo \"Valor Originário\" é extraído diretamente do e-Processo e não leva em consideração outros fatores que possam alterar o valor a ser considerado para indicação. Dessa forma, para casos concretos, deverão ser somadas a esse valor outras informações, nos termos das <strong>orientações para indicação de pauta</strong>.</p></div><div id=\"produtividade\"><br><div id=\"idProdutividade\"" +
    marko_attr("data-reinp", "" + data.reinp) +
    "></div><br><br><br><p><h4>Produtividade Trimestral</h4></p><div class=\"row\"><div id=\"tabelaReinp\"></div></div><p><h4>Processos</h4></p><div class=\"row\"><div class=\"col s12 right-align\"><a class=\"dropdownDownloadCons waves-effect waves-yellow hoverable z-depth-3 btn-floating red\" href=\"#\" data-target=\"dropdownReinp\"><i class=\"material-icons\">file_download</i></a><ul id=\"dropdownReinp\" class=\"dropdown-content\"><li class=\"divider\" tabindex=\"-1\"></li><li><a class=\"xlsxDownReinp\" href=\"#!\"><i class=\"xlsxDownReinp material-icons\">file_download</i>XLSX</a></li><li class=\"divider\" tabindex=\"-1\"></li><li><a class=\"csvDownReinp\" href=\"#!\"><i class=\"csvDownReinp material-icons\">file_download</i>CSV</a></li><li class=\"divider\" tabindex=\"-1\"></li></ul><a href=\"#!\" id=\"agrupaMes\" title=\"Agrupar/Desagrupar por Mês\" class=\"waves-effect waves-yellow hoverable z-depth-3 btn-floating blue\"><i class=\"material-icons\">unfold_less</i></a></div></div><div class=\"row\"><div id=\"tabelaReinpDet\"></div></div></div><div id=\"stats\" class=\"col s12\"><div class=\"row classProcessos\"><h4>Carga Horária de processos por atividade:</h4><div class=\"col s8\"><div id=\"barrasAtividade\"></div></div></div><div class=\"row\"><h4>Produtividade Mensal e Trimestral:</h4></div><div class=\"row\"><div class=\"col s6\"><div id=\"barrasReinpMensal\"></div></div><div class=\"col s6\"><div id=\"barrasReinpTrimestral\"></div></div></div></div><div id=\"ocorrencias\" class=\"col s12\"><br><div class=\"row\"><div id=\"tabelaOcorrencias\"" +
    marko_attr("data-ocorrencias", "" + data.ocorrencias) +
    "></div></div></div><div id=\"solicitacoes\" class=\"col s12\"><br><div class=\"row\"><div class=\"col s1 offset-s11\"><a id=\"btnSolModal\" class=\"btn-floating green waves-effect waves-light hoverable z-depth-3 right\" title=\"Fazer nova solicitação\" href=\"#solModal\"><i class=\"material-icons\">add</i></a></div></div><br><div class=\"row\"><div id=\"tabelaSolicitacoes\"" +
    marko_attr("data-tpSol", "" + data.tpSol) +
    marko_attr("data-solicitacoes", "" + data.solicitacoes) +
    "></div></div><div id=\"solModal\" class=\"modal modal-fixed-footer\"><div class=\"modal-content\"><h4 class=\"hSModal\">Inclusão de Solicitação</h4><div class=\"pSModal\"><div class=\"row\"><div class=\"col s7\"><h5>Tipo de Solicitação</h5><label for=\"tipoSolicitacao\">Selecione o tipo de solicitação:</label><select required name=\"tipoSolicitacao\" id=\"tipoSolicitacao\"><option class=\"form-group\"" +
    marko_attr("value", "") +
    " disabled selected>Clique para selecionar</option>");

  var $for$1 = 0;

  marko_forEach(data.tpSol, function(sol) {
    var $keyScope$1 = "[" + (($for$1++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", "" + sol.tipoSolicitacao) +
      ">" +
      marko_escapeXml(sol.tipoSolicitacao) +
      "</option>");
  });

  out.w("</select><label for=\"tipoSolicitacao\">Selecione o tipo de solicitação:</label></div></div><div class=\"row\"><div class=\"col s12\"><span id=\"divTipo\"></span></div></div><div class=\"row valign-wrapper\"><div id=\"enviaArq\" class=\"col s6 valign-wrapper\"></div><div id=\"mostraArq\" class=\"col s6\"><ul class=\"collection arqsUp\"></ul></div></div><blockquote><strong>Importante:</strong> Os afastamentos são aplicáveis <strong>apenas</strong> para efeitos de cálculo das <strong>Metas de Produtividade</strong>.<br> Dúvidas relativas aos <strong>efeitos financeiros</strong> devem ser tratadas diretamente com a <strong>COGEC</strong>.</blockquote></div></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda modal-close\">Confirma <i class=\"material-icons right\">send</i></button></div></div></div></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "187");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda modal-close\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "196");

  app_scripts_js_tag({}, out, __component, "197");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/libs/quill.min.js\"></script><script src=\"/estatico/js/julgamento/paginadoconselheiro.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "203");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/conselheiros/paginadoconselheiro.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-modal-tabela-legenda.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
