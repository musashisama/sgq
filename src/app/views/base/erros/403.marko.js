// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/erros/403.marko",
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

  out.w("<div class=\"container\"><div class=\"row center\"><h1>Acesso não autorizado</h1><p>Verifique seus perfis de acesso</p><a href=\"/\">Voltar</a></div></div></main><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"></div></div>");

  app_footer_tag({}, out, __component, "16");

  app_scripts_js_tag({}, out, __component, "17");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "18");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/base/erros/403.marko",
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
