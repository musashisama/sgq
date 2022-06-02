// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/faqdipaj/faqdipaj.marko",
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

  out.w("<body>");

  component_globals_tag({}, out);

  app_header_tag({}, out, __component, "3");

  out.w("<main class=\"conteudoPrincipal\">");

  app_navbar_tag({
      id: "slide-out",
      class: "sidenav"
    }, out, __component, "5");

  out.w("<div class=\"container\"><h3 id=\"inicio\" class=\"center-align titulo\">Perguntas & Respostas - COJUL</h3><br><div class=\"row\"><div class=\"col s12\"><div class=\"row\"><div class=\"input-field col s12\"><i class=\"material-icons prefix\">textsms</i><input type=\"text\" id=\"autocomplete-input\" class=\"autocomplete\"><label for=\"autocomplete-input\">Digite aqui sua pergunta</label></div></div></div></div><div class=\"row\"><div id=\"faq\"" +
    marko_attr("data-faq", "" + data.faq) +
    "></div><h5 id=\"mprod\" class=\"scrollspy n\">Meta de Produtividade</h5><ul class=\"collapsible popout prod\"></ul><h5 id=\"idregap\" class=\" scrollspy \">REGAP</h5><ul class=\"collapsible popout regap\"></ul><h5 id=\"idreinp\" class=\" scrollspy \">REINP</h5><ul class=\"collapsible popout reinp\"></ul><h5 id=\"idrejul\" class=\"scrollspy \">REJUL</h5><ul class=\"collapsible popout rejul\"></ul><h5 id=\"idsorteio\" class=\"scrollspy \">Dispensa de Sorteio</h5><ul class=\"collapsible popout sorteio\"></ul><h5 id=\"idnotificacao\" class=\"scrollspy \">Notificações</h5><ul class=\"collapsible popout notificacao\"></ul></div><div class=\"row\"><p class=\"center\">Caso não tenha solucionado sua dúvida, <a href=\"/julgamento/restrito/formFAQ\">clique aqui</a>.</p></div></div><div class=\"scspy2 col hide-on-small-only m3 l2 right\"><ul class=\"section table-of-contents\"><li><a href=\"#inicio\">Início</a></li><li><a href=\"#mprod\">Meta de Produtividade</a></li><li><a href=\"#idregap\">REGAP</a></li><li><a href=\"#idreinp\">REINP</a></li><li><a href=\"#idrejul\">REJUL</a></li><li><a href=\"#idsorteio\">Dispensa de Sorteio</a></li><li><a href=\"#idnotificacao\">Notificações</a></li></ul></div></main>");

  app_footer_tag({}, out, __component, "49");

  app_scripts_js_tag({}, out, __component, "50");

  out.w("<script src=\"/estatico/js/julgamento/faq_dipaj.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "52");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/faqdipaj/faqdipaj.marko",
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
