// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/conselheiros/reinp_individual.marko",
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

  out.w("<div id=\"caixa\" class=\"container\"><h3 class=\"center-align titulo\">Relatório Gerencial de Indicação para Pauta</h3><br><div id=\"idProdutividade\"" +
    marko_attr("data-user", "" + data.user) +
    marko_attr("data-reinp", "" + data.reinp) +
    "></div><div class=\"row\"><p><h4>Produtividade Trimestral</h4></p><div class=\"col s12 m12\"><div class=\"card hoverable cardVermelho\"><div class=\"card-content\"><span class=\"card-title center\">ATENÇÃO</span> Os dados de produtividade do 3º trimestre de 2021 se referem somente às horas computadas em Solicitações de Redução de Meta.</div></div></div><div class=\"row\"><div id=\"anosReinp\"></div></div><div class=\"row\"><div class=\"col s12 m3\"><div class=\"card hoverable cardAzul\"><div class=\"card-content\"><span class=\"card-title center\" id=\"horas1T\"></span> 1º Trimestre</div></div></div><div class=\"col s12 m3\"><div class=\"card hoverable cardLaranja\"><div class=\"card-content \"><span class=\"card-title center\" id=\"horas2T\"></span> 2º Trimestre</div></div></div><div class=\"col s12 m3\"><div class=\"card hoverable cardVerde\"><div class=\"card-content \"><span class=\"card-title center\" id=\"horas3T\"></span> 3º Trimestre</div></div></div><div class=\"col s12 m3\"><div class=\"card hoverable cardFuchsia\"><div class=\"card-content \"><span class=\"card-title center\" id=\"horas4T\"></span> 4º Trimestre</div></div></div></div><div class=\"row\"><div class=\"col s6\"><div id=\"barrasReinpMensal\"></div></div><div class=\"col s6\"><div id=\"barrasReinpTrimestral\"></div></div></div><p><h4>Processos</h4></p><div class=\"row\"><div class=\"col s12 right-align\">");

  app_drop_download_tag({}, out, __component, "45");

  out.w("<a href=\"#!\" id=\"agrupaMes\" title=\"Agrupar/Desagrupar por Mês\" class=\"waves-effect waves-yellow hoverable z-depth-3 btn-floating blue\"><i class=\"material-icons\">unfold_less</i></a></div></div><div class=\"row\"><div id=\"tabelaReinpDet\"></div></div></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "51");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "60");

  app_scripts_js_tag({}, out, __component, "61");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/julgamento/helpers/reinpHelper.js\"></script><script src=\"/estatico/js/julgamento/conselheiros/reinp.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "67");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/conselheiros/reinp_individual.marko",
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
