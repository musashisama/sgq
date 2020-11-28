// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/regap/regapIndividualCojul.marko",
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
    marko_escapeXml = marko_helpers.x,
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Relatório Gerencial de Acompanhamento de Prazos - Novo</h3><div id=\"dataCAL\"" +
    marko_attr("data-cal", "" + data.cal) +
    "></div><div class=\"row\"><div class=\"col s12\"><div class=\"card hoverable cardAzul z-depth-4 cardBorda\"><div class=\"card-content white-text\"><span class=\"card-title\">Conselheiro(a): " +
    marko_escapeXml(data.user) +
    " - " +
    marko_escapeXml(data.tipo) +
    "</span><p><h6>CPF: " +
    marko_escapeXml(data.cpf) +
    "</h6></p><p><h6>Colegiado: " +
    marko_escapeXml(data.turma) +
    " " +
    marko_escapeXml(data.camara) +
    " " +
    marko_escapeXml(data.setor) +
    "</h6></p><p><h6>Final do Mandato: " +
    marko_escapeXml(data.dtFimMandato) +
    "</h6></p><p><h6>Relatorio extraído do e-Processo em " +
    marko_escapeXml(data.dataEnvio) +
    "</h6></p><p><h6>Falta(m) <strong><span id=\"daps\"></span></strong> dia(s) para a próxima sessão, que será realizada em <strong><span id=\"ps\"></span></strong>.</h6></p></div></div></div></div><br><br><form id=\"formGerencial\"" +
    marko_attr("data-regap", "" + data.relatorio) +
    " name=\"formGerencial\" action=\"/julgamento/restrito/regap-cojul/detalha/\" method=\"post\"><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s3\"><a href=\"#processos\">Processos</a></li><li class=\"tab col s3\"><a href=\"#stats\">Estatísticas</a></li></ul></div><div id=\"processos\" class=\"col s12\"><br><div class=\"row\"><div class=\"form-group input-field  col s3\"><select class=\"Atividade\" name=\"atividadeSelect\" id=\"atividadeSelect\"><option class=\"form-group\" value=\"Todas\" selected>Todas</option><option class=\"form-group\" value=\"Para Relatar\">Para Relatar</option><option class=\"form-group\" value=\"Formalizar Decisao\">Formalizar Decisão</option><option class=\"form-group\" value=\"Formalizar Voto Vencedor\">Formalizar Voto Vencedor</option><option class=\"form-group\" value=\"Corrigir Decisão\">Corrigir Decisão</option><option class=\"form-group\" value=\"Apreciar e Assinar Documento\">Apreciar e Assinar Documento</option></select><label>Selecione a atividade para filtrar:</label></div><div class=\"col s3 right-align\"></div><div class=\"col s12 right-align\">");

  app_drop_download_tag({}, out, __component, "52");

  out.w("<a href=\"#!\" id=\"mostraColunasAtividade\" title=\"Agrupar/Desagrupar por Atividade\" class=\"waves-effect waves-yellow hoverable z-depth-3 btn-floating blue\"><i class=\"material-icons\">unfold_less</i></a><a href=\"#modal2\" id=\"mostraLegenda\" title=\"Mostrar Legenda da Tabela\" class=\"waves-effect waves-purple hoverable z-depth-3 btn-floating black\"><i class=\"material-icons\">details</i></a></div></div><div id=\"tabelaRegap\"></div></div><div id=\"stats\" class=\"col s12\">Test 2</div></div></form></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "60");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "69");

  app_scripts_js_tag({}, out, __component, "70");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/julgamento/helpers/configTabelaNovoRegap.js\"></script><script src=\"/estatico/js/julgamento/regap-individual.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "76");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/regap/regapIndividualCojul.marko",
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
