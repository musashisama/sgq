// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/login/login.marko",
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
    marko_escapeXml = marko_helpers.x,
    marko_classAttr = marko_helpers.ca,
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

  out.w(" <div class=\"container\"><div class=\"row\">");

  if (data.msg) {
    out.w("<div" +
      marko_classAttr("col s4 offset-s4 center-align " + data.msg.cor) +
      "><h6><i class=\"material-icons prefix\">" +
      marko_escapeXml(data.msg.alert) +
      "</i>" +
      marko_escapeXml(data.msg.text) +
      "</h6></div>");
  }

  out.w("<br><br><br><br><div class=\"col s6 offset-s3 center-align\"><div class=\"card\"><br><h4 class=\"center-align titulo\">Login</h4><div class=\"card-content\"><form action=\"/login\" method=\"post\"><div class=\"form-group input-field cpf\"><i class=\"material-icons prefix\">account_circle</i><label for=\"cpf\">CPF:</label><input type=\"text\" required autocomplete=\"username\" id=\"cpf\" name=\"cpf\"" +
    marko_attr("value", data.id) +
    " placeholder=\"Digite seu CPF.\" class=\"form-control tooltipped\" data-position=\"bottom\" data-tooltip=\"Somente números.\"></div><div class=\"form-group input-field pwd\"><i class=\"material-icons prefix\">lock</i><input type=\"password\" required autocomplete=\"current-password\" id=\"pwd\" name=\"pwd\"" +
    marko_attr("value", data.pwd) +
    " placeholder=\"Digite sua senha.\" class=\"form-control\"></div> <div class=\"form-group\"><a id=\"aModal\" href=\"#modal1\" class=\"waves-effect waves-light btn-ligaModal btn-small red lighten-3\"><i class=\"material-icons left\">error</i>Esqueci a senha</a><button class=\"btn-small waves-effect waves-light concorda green right\" type=\"submit\" name=\"action\">Efetuar login <i class=\"material-icons left\">send</i></button></div></form></div></div></div></div></div></main><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"></div></div>");

  app_footer_tag({}, out, __component, "38");

  app_scripts_js_tag({}, out, __component, "39");

  out.w("<script src=\"/estatico/js/base/login.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "41");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/base/login/login.marko",
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
