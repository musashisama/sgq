// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/suporte/gestaoindicacao/gerenciaPauta.marko",
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Gerenciar Pauta</h3><br><div class=\"row conteudoPrincipal\"></div><br><div class=\"row\"><h4>Gerenciar Pauta</h4></div><div class=\"row\"><div id=\"cardInfo\"></div></div><div class=\"row\"><div class=\"col s12\"><ul class=\"tabs\"><li id=\"processosTab\" class=\"tab col s3\"><a href=\"#processos\">Processos</a></li><li id=\"retornosTab\" class=\"tab col s5 \"><a href=\"#retornos\">Gerenciar Retornos</a></li><li id=\"virtualTab\" class=\"tab col s3\"><a href=\"#virtual\">Pauta Consolidada Virtual</a></li></ul></div><div id=\"processos\" class=\"col s12\"><div class=\"row\"><div class=\"col s12 right-align\"><div id=\"pauta\"" +
    marko_attr("data-pauta", "" + data.pauta) +
    marko_attr("data-idindicacao", "" + data.idIndicacao) +
    marko_attr("data-colegiado", "" + data.colegiado) +
    "></div></div></div><div class=\"row\"><div class=\"form-group input-field  col s3\"><label><input name=\"questionamentosCheck\" id=\"questionamentosCheck\" type=\"checkbox\"><span>Mostrar Questionamentos Incorretos</span></label></div><div class=\"form-group input-field  col s3\"><label><input name=\"aptosCheck\" id=\"aptosCheck\" type=\"checkbox\"><span>Mostrar Somente Não Aptos</span></label></div><div class=\"col s12 right-align\">");

  app_drop_download_tag({}, out, __component, "38");

  out.w("<a href=\"#modal2\" id=\"mostraLegenda\" title=\"Mostrar Legenda da Tabela\" class=\"waves-effect waves-purple hoverable z-depth-3 btn-floating black\"><i class=\"material-icons\">details</i></a></div></div><div class=\"row\"></div><div class=\"row\"><div id=\"tabelaPauta\"></div></div><div class=\"row\"><a id=\"botaoCriaVirtual\" class=\"waves-effect waves-light btn-large right\"><i class=\"fas fa-arrow-alt-circle-right right\"></i>Criar Pauta Consolidada Virtual</a></div></div><div id=\"retornos\" class=\"col s12\"><div class=\"row\"></div><div class=\"row\"><div class=\"file-field ctoastsucesso input-field form-group col s6\"><div class=\"btn\"><span>Arquivo</span><input class=\"tooltipped\" data-position=\"bottom\" data-tooltip=\"Somente arquivos XLS\" type=\"file\" name=\"filetoupload\" id=\"file\" accept=\".xls,.xlsx\" onchange=\"triggerValidation(this)\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\"></div></div><a id=\"botaoEnviaExcel\" class=\"waves-effect waves-light btn-large\"><i class=\"fas fa-arrow-alt-circle-right right\"></i>Enviar Planilha</a></div><div class=\"row\"><p id=\"statusRetorno\"></p><p>Processos selecionados: <span id=\"select-stats\"></span></p></div><div class=\"row\"><div id=\"tabelaRetornos\"></div></div><div class=\"row\"><a id=\"botaoAddRetornos\" class=\"waves-effect waves-light btn-large right\"><i class=\"fas fa-arrow-alt-circle-right right\"></i>Adicionar Retornos à Pauta Consolidada Virtual</a></div></div><div id=\"virtual\" class=\"col s12\"><div class=\"row\"></div><div class=\"row\"></div><div class=\"row\"><div id=\"tabelaConsolidadaVirtual\"></div></div><div class=\"row\"><a id=\"botaoConsolida\" class=\"waves-effect waves-light btn-large right\"><i class=\"fas fa-arrow-alt-circle-right right\"></i>Consolidar Pauta</a></div></div></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "76");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "85");

  app_scripts_js_tag({}, out, __component, "86");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/julgamento/helpers/configTabelaNovoRegap.js\"></script><script src=\"/estatico/js/julgamento/cosup/gerenciaPauta.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "92");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/suporte/gestaoindicacao/gerenciaPauta.marko",
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
