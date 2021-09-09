// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/conselheiros/indicapauta.marko",
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
    app_drop_download_template = require("../../components/app-drop-download.marko"),
    app_drop_download_tag = marko_loadTag(app_drop_download_template),
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

  out.w("<div id=\"caixa\" class=\"container\"><div id=\"dataCAL\"" +
    marko_attr("data-cal", "" + data.cal) +
    "></div><div id=\"dataUser\"" +
    marko_attr("data-user", "" + data.user) +
    "></div><div id=\"dataPauta\"" +
    marko_attr("data-pauta", "" + data.pauta) +
    "></div><h3 class=\"center-align titulo\">Indicação de Processos para Pauta de Julgamento</h3><br><h6></h6><div class=\"col s12 m12\"><div class=\"card hoverable cardAzul\"><div class=\"card-content\">Falta(m) <strong><span id=\"daps\"></span></strong> dia(s) para a próxima sessão, que será realizada em <strong><span id=\"ps\"></span></strong>.</div></div></div><div class=\"row\"><div class=\"col s6 offset-s3\"><div id=\"cardSoma\" class=\"card hoverable cardLaranja\"><div class=\"card-content \"><span class=\"card-title\">Somatório de Horas da Indicação: <span id=\"somatorioHoras\">0</span></span></div></div></div></div><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li id=\"processosTab\" class=\"tab col s3\"><a href=\"#processos\">Escolher Processos</a></li><li id=\"aptidaoTab\" class=\"tab col s5 disabled\"><a href=\"#aptidao\">Verificar Aptidão, Alegações e Questionamentos</a></li><li id=\"confirmacaoTab\" class=\"tab col s3 disabled\"><a href=\"#confirmacao\">Confirmar Indicação</a></li></ul></div><div id=\"processos\" class=\"col s12\"><br><div class=\"row\"><div class=\"col s6 offset-s6\"><a id=\"botaoIndica\" class=\"waves-effect waves-light btn-large\"><i class=\"fas fa-arrow-alt-circle-right right\"></i>Proceder para Verificação de Aptidão para Julgamento</a></div><div class=\"col s12\"><blockquote><strong><p class=\"valign-wrapper\"><i class=\"fas fa-info-circle medium blue-text\"></i> &nbsp; Para indicar processos para pauta, clique no processo desejado. Ao terminar suas indicações, clique no botão acima.</p></strong></blockquote></div></div><div class=\"row\"><div class=\"col s12 right-align\">");

  app_drop_download_tag({}, out, __component, "48");

  out.w("<a href=\"#modal2\" id=\"mostraLegenda\" title=\"Mostrar Legenda da Tabela\" class=\"waves-effect waves-purple hoverable z-depth-3 btn-floating black\"><i class=\"material-icons\">details</i></a></div></div><div id=\"tabelaIndicacao\"" +
    marko_attr("data-indicacao", "" + data.relatorio) +
    "></div></div><div id=\"aptidao\" class=\"col s12\"><h4 class=\"center\">Verificar Aptidão para Julgamento em Sessão Virtual</h4><div class=\"row\"><div class=\"col s6 offset-s6\"><a id=\"botaoVerifica\" class=\"waves-effect waves-light btn-large\"><i class=\"fas fa-arrow-alt-circle-right right\"></i>Proceder para Confirmação da Indicação</a></div><div class=\"col s12\"><blockquote><strong><p class=\"valign-wrapper\"><i class=\"fas fa-info-circle medium blue-text\"></i> &nbsp; Para verificar aptidão dos processos, clique nos ícones &nbsp;<i class=\"fa fa-times red-text\"></i> &nbsp;ou&nbsp; <i class=\"fa fa-check green-text\"></i>. A coluna \"Processo Apto?\" é calculada automaticamente.</p></strong></blockquote><blockquote><strong><p class=\"valign-wrapper\"><i class=\"fas fa-info-circle medium blue-text\"></i> &nbsp; <a href=\"http://dispe.carf/tab-alegacoes/\" target=\"_blank\">Clique aqui</a> &nbsp;para acessar a &nbsp; <a href=\"http://dispe.carf/tab-alegacoes/\" target=\"_blank\">Tabela de Alegações.</a></p></strong></blockquote></div></div><div class=\"row\"><div class=\"col s12 right\"><a class=\"dropdownDownloadPauta waves-effect waves-yellow hoverable z-depth-3 btn-floating red right\" href=\"#\" data-target=\"dropdown3\"><i class=\"material-icons\">file_download</i></a><ul id=\"dropdown3\" class=\"dropdown-content\"><li class=\"divider\" tabindex=\"-1\"></li><li><a class=\"xlsxDownPauta\" href=\"#!\"><i class=\"xlsxDownPauta material-icons\">file_download</i>XLSX</a></li><li class=\"divider\" tabindex=\"-1\"></li><li><a class=\"csvDownPauta\" href=\"#!\"><i class=\"csvDownPauta material-icons\">file_download</i>CSV</a></li><li class=\"divider\" tabindex=\"-1\"></li></ul></div></div><div class=\"row\"><div id=\"tabelaAptidao\"></div></div></div><div id=\"confirmacao\" class=\"col s12\"><div class=\"row\"><h4 class=\"center\">Confirmar Indicação para Pauta</h4></div><div class=\"row\"><div id=\"tabelaConfirmacao\"></div></div><div class=\"row\"><a id=\"botaoConfirma\" class=\"waves-effect waves-light btn-large right\"><i class=\"fas fa-arrow-alt-circle-right right\"></i>Confirmar Indicação</a></div></div></div><p><div class=\"col s12 m12\"><div class=\"card hoverable cardVermelho\"><div class=\"card-content\"><span class=\"card-title center\">ATENÇÃO</span><a id=\"oitomilhoes\"></a>* O campo \"Valor Originário\" é extraído diretamente do e-Processo e não leva em consideração outros fatores que possam alterar o valor a ser considerado no momento da indicação para pauta. Dessa forma, para casos concretos, deverão ser somadas a esse valor outras informações, nos termos das <strong>orientações para indicação de pauta</strong>.</div></div></div></p></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "103");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "112");

  app_scripts_js_tag({}, out, __component, "113");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/julgamento/helpers/configTabelaNovoRegap.js\"></script><script src=\"/estatico/js/julgamento/conselheiros/indicacao.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "119");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/conselheiros/indicapauta.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-drop-download.marko",
      "../../components/app-modal-tabela-legenda.marko",
      "../../components/app-footer.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
