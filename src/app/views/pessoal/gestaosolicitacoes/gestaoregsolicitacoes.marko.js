// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/pessoal/gestaosolicitacoes/gestaoregsolicitacoes.marko",
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
    app_modal_template = require("../../components/app-modal.marko"),
    app_modal_tag = marko_loadTag(app_modal_template),
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Gestão de Solicitações dos Conselheiros - Módulo de Pessoal</h3><div id=\"solicitacoes\"" +
    marko_attr("data-solicitacoes", "" + data.solicitacoes) +
    "></div><div class=\"row\"><div class=\"col s12 m12\"><div class=\"card hoverable cardAzul\"><div class=\"card-content\"><span class=\"card-title\">Orientações:</span><ul><li><i class=\"fas fa-bullhorn\"></i> As solicitações que constem afastamentos para redução de meta e justificativa de suspensão de prazos e faltas à sessões de julgamento deverão ser efetuadas <strong>após</strong> transcorrido o evento. Caso sejam efetuadas antes do evento, serão <strong>rejeitadas</strong>.</li><li><i class=\"fas fa-bullhorn\"></i> As solicitações de Dispensa de Sorteio só poderão ser enviadas caso o somatório total seja maior ou igual a 126 horas.</li><li><i class=\"fas fa-bullhorn\"></i> Retornos de Diligência e Retorno de Embargos não são considerados como horas excedentes para fins de Dispensa de Sorteio.</li></ul></div></div></div><div class=\"row\"><div class=\"col s12 right-align\"><a href=\"#!\" id=\"agrupaSol\" title=\"Agrupar/Desagrupar por Tipo de Solicitação\" class=\"waves-effect waves-green hoverable z-depth-3 btn-floating blue\"><i class=\"material-icons\">unfold_less</i></a><a href=\"#!\" id=\"agrupaCons\" title=\"Agrupar/Desagrupar por Conselheiro\" class=\"waves-effect waves-green hoverable z-depth-3 btn-floating green\"><i class=\"material-icons\">unfold_less</i></a>");

  app_drop_download_tag({}, out, __component, "29");

  out.w("<div class=\"form-group input-field  col s3\"><select class=\"status\" name=\"status\" id=\"status\"><option class=\"form-group\" value=\"Todas\" selected>Todas</option><option class=\"form-group\" value=\"Encaminhada para Análise\">Encaminhada para Análise</option><option class=\"form-group\" value=\"Aprovada com Efeitos Financeiros\">Aprovada com Efeitos Financeiros</option><option class=\"form-group\" value=\"Aprovada sem Efeitos Financeiros\">Aprovada sem Efeitos Financeiros</option><option class=\"form-group\" value=\"Rejeitada\">Rejeitada</option></select><label>Selecione o status para filtrar:</label></div></div></div><div id=\"tabelaSolicitacoes\"></div><div class=\"solAprovada\"></div><div class=\"solAprovadaSem\"></div><div class=\"solEncaminhada \"></div><div class=\"solRejeitada\"></div></div><br></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "45");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><button class=\"btn waves-effect waves-light concorda modal-close\">Fechar <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "53");

  app_modal_tag({}, out, __component, "54");

  app_scripts_js_tag({}, out, __component, "55");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/libs/quill.min.js\"></script><script src=\"/estatico/js/pessoal/gestaoregsolicitacoes.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "61");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/pessoal/gestaosolicitacoes/gestaoregsolicitacoes.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-drop-download.marko",
      "../../components/app-modal-tabela-legenda.marko",
      "../../components/app-footer.marko",
      "../../components/app-modal.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
