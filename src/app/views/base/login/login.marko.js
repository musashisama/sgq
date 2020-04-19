// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/login/login.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_escapeXml = marko_helpers.x,
    marko_classAttr = marko_helpers.ca,
    marko_attr = marko_helpers.a,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Sistema de Gestão Integrada</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><ul id=\"slide-out\" class=\"sidenav\"></ul> <div class=\"container\"><div class=\"row\">");

  if (data.msg) {
    out.w("<div" +
      marko_classAttr("col s4 offset-s4 center-align " + data.msg.cor) +
      "><h6><i class=\"material-icons prefix\">" +
      marko_escapeXml(data.msg.alert) +
      "</i>" +
      marko_escapeXml(data.msg.text) +
      "</h6></div>");
  }

  out.w("<br><br><br><br><div class=\"col s6 offset-s3 center-align\"><div class=\"card\"><br><h4 class=\"center-align\">Login</h4><div class=\"card-content\"><form action=\"/login\" method=\"post\"><div class=\"form-group input-field cpf\"><i class=\"material-icons prefix\">account_circle</i><label for=\"cpf\">CPF:</label><input type=\"text\" required autocomplete=\"username\" id=\"cpf\" name=\"cpf\"" +
    marko_attr("value", data.id) +
    " placeholder=\"Digite seu CPF.\" class=\"form-control tooltipped\" data-position=\"bottom\" data-tooltip=\"Somente números.\"></div><div class=\"form-group input-field pwd\"><i class=\"material-icons prefix\">lock</i><input type=\"password\" required autocomplete=\"current-password\" id=\"pwd\" name=\"pwd\"" +
    marko_attr("value", data.pwd) +
    " placeholder=\"Digite sua senha.\" class=\"form-control\"></div> <div class=\"form-group\"><a id=\"aModal\" href=\"#modal1\" class=\"waves-effect waves-light btn-ligaModal btn-small red lighten-3\"><i class=\"material-icons left\">error</i>Esqueci a senha</a><button class=\"btn-small waves-effect waves-light concorda green right\" type=\"submit\" name=\"action\">Efetuar login <i class=\"material-icons left\">send</i></button></div></form></div></div></div></div></div></main><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"></div></div><footer class=\"page-footer rodape\"></footer><script src=\"/estatico/js/libs/jquery-3.4.1.js\"></script><script src=\"/estatico/js/libs/materialize.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script><script src=\"/estatico/js/base/navbar.js\"></script><script src=\"/estatico/js/base/login.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "50");

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
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
