// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/cig/indicadores_cojul.marko",
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

  out.w("<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.css\"><body>");

  component_globals_tag({}, out);

  app_header_tag({}, out, __component, "4");

  out.w("<main class=\"conteudoPrincipal\">");

  app_navbar_tag({
      id: "slide-out",
      class: "sidenav"
    }, out, __component, "6");

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Indicadores do CIG</h3><br><div class=\"col s12\"><ul class=\"tabs\"><li class=\"tab col s3\"><a href=\"#paraRelatarCSRF\">Para Relatar - CSRF</a></li><li class=\"tab col s3\"><a href=\"#paraRelatarTO\">Para Relatar - Turmas Ordinárias</a></li><li class=\"tab col s3\"><a href=\"#paraRelatarTEX\">Para Relatar - Turmas Extraordinárias</a></li></ul></div><div id=\"paraRelatarCSRF\" class=\"col s12\"><h4>Temporalidade Média na Atividade «Para Relatar» nas Turmas da Câmara Superior</h4><p><div style=\"width:100%;auto;\" id=\"graficoCSRF\"></div><div style=\"width:100%;\"><canvas id=\"myChart\" width=\"900\" height=\"450\"></canvas></div></p></div><div id=\"paraRelatarTO\" class=\"col s12\"><h4>Temporalidade Média na Atividade «Para Relatar» nas Turmas Ordinárias</h4><p><div style=\"width:100%;auto;\" id=\"graficoTO\"></div></p></div><div id=\"paraRelatarTEX\" class=\"col s12\"><h4>Temporalidade Média na Atividade «Para Relatar» nas Turmas Extraordinárias</h4><p><div style=\"width:100%;auto;\" id=\"graficoTEX\"></div></p></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "33");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "42");

  app_scripts_js_tag({}, out, __component, "43");

  out.w("<script src=\"https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js\"></script><script src=\"/estatico/js/julgamento/cig/indicadoresCIG.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "46");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/cig/indicadores_cojul.marko",
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
