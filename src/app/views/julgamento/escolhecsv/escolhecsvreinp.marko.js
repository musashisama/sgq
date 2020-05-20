// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/escolhecsv/escolhecsvreinp.marko",
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
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
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

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Selecione o relatório que deseja visualizar:</h3><br><br><br><br><div class=\"row conteudoPrincipal\"> ");

  var $for$0 = 0;

  marko_forEach(data.dados, function(dado) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<div class=\"card conteudoPrincipalCard\"><div class=\"card-image waves-effect waves-block waves-light\"><img class=\"activator scaleImg\" alt=\"Clique para informações do relatório\" title=\"Clique para informações do relatório\" src=\"/estatico/imagens/CSV.png\"></div><div class=\"card-content\"><span class=\"card-title activator grey-text text-darken-4\"><p>Relatório Extraído " +
      marko_escapeXml(dado.dias) +
      " (" +
      marko_escapeXml(dado.dtExtracao) +
      ").</p><i class=\"material-icons right\" title=\"Clique para informações do relatório\">more_vert</i></span><p>Relatório Extraído " +
      marko_escapeXml(dado.dias) +
      " (" +
      marko_escapeXml(dado.dtExtracao) +
      ").</p><p><br><a class=\"btn-floating btn-insere halfway-fab waves-effect waves-light red\" title=\"Clique para acessar relatório\"" +
      marko_attr("href", "/julgamento/restrito/reinp/" + dado.caminho) +
      "><i class=\"material-icons\">send</i></a><div class=\"controle\">" +
      marko_escapeXml(dado.caminho) +
      "</div></p></div><div class=\"card-reveal\"><span class=\"card-title grey-text text-darken-4\">Informações do relatório:<i class=\"material-icons right\">close</i></span><p>Este relatório foi extraído " +
      marko_escapeXml(dado.dias) +
      " (" +
      marko_escapeXml(dado.dtExtracao) +
      ").</p></div></div>");
  });

  out.w("</div></div></main>");

  app_footer_tag({}, out, __component, "30");

  app_scripts_js_tag({}, out, __component, "31");

  out.w("<script src=\"/estatico/js/julgamento/escolhe.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "33");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/escolhecsv/escolhecsvreinp.marko",
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
