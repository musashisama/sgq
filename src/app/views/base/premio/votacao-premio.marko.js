// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/premio/votacao-premio.marko",
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

  out.w("<div id=\"idVotos\"" +
    marko_attr("data-votos", "" + data.votos) +
    "></div><div class=\"container\"><div class=\"row\"><h3>Prêmio Mérito Funcional Ministro Leopoldo de Bulhões</h3><h4>Total de Votos: <span id=\"qtdeVotos\"></span></h4><p>Total de Usuários na Base: 562 em 01/08/2024.</p><p>Total de Usuários <strong>excluindo conselheiros com mandato não ativo</strong>: 412</p></div><div class=\"row\"><h5 class=\"center\">Conselheiros</h5></div><div class=\"row\"><div class=\"col s6\" id=\"grafCons\"></div><div class=\"col s6\" id=\"grafConsCount\"></div></div><div class=\"divider\"></div><div class=\"row\"><h5 class=\"center\">Servidores</h5></div><div class=\"row\"><div class=\"col s6\" id=\"grafServ\"></div><div class=\"col s6\" id=\"grafServCount\"></div></div><div class=\"divider\"></div><div class=\"row\"><h5 class=\"center\">Terceirizados</h5></div><div class=\"row\"><div class=\"col s6\" id=\"grafTerc\"></div><div class=\"col s6\" id=\"grafTercCount\"></div></div></div></main>");

  app_footer_tag({}, out, __component, "33");

  app_scripts_js_tag({}, out, __component, "34");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/base/votacao-premio.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "39");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/base/premio/votacao-premio.marko",
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
