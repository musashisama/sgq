// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/gestaosolicitacoes/detalhasolicitacao.marko",
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Detalhamento de Solicitação</h3><div id=\"dadosSolicitacao\"" +
    marko_attr("data-solicitacao", "" + data.solicitacao) +
    "></div><div class=\"row\"><div id=\"solicitacao\" class=\"col s12\"></div></div></div></main><footer class=\"page-footer rodape\"></footer>");

  app_modal_tabela_legenda_tag({}, out, __component, "12");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><button class=\"btn waves-effect waves-light concorda modal-close\">Fechar <i class=\"material-icons right\">send</i></button></div></div>");

  app_footer_tag({}, out, __component, "20");

  app_modal_tag({}, out, __component, "21");

  app_scripts_js_tag({}, out, __component, "22");

  out.w("<script src=\"/estatico/js/libs/plotly-latest.min.js\"></script><script src=\"/estatico/js/libs/plotly-locale-pt-br.js\"></script><script>Plotly.setPlotConfig({locale: 'pt-BR'})</script><script src=\"/estatico/js/libs/quill.min.js\"></script><script src=\"/estatico/js/julgamento/detalhasolicitacao.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "28");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/gestaosolicitacoes/detalhasolicitacao.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-modal-tabela-legenda.marko",
      "../../components/app-footer.marko",
      "../../components/app-modal.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
