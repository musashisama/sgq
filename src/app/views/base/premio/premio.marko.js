// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/premio/premio.marko",
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
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
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

  app_navbar_tag({}, out, __component, "5");

  out.w("<div class=\"container\"><div class=\"row\"><div id=\"dataCons\"" +
    marko_attr("data-cons", "" + data.cons) +
    "></div><div id=\"dataServ\"" +
    marko_attr("data-serv", "" + data.serv) +
    "></div><div id=\"dataTerc\"" +
    marko_attr("data-terc", "" + data.terc) +
    "></div><h3 class=\"center-align titulo\">Prêmio de Mérito Funcional Ministro Leopoldo Bulhões</h3><br><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><br><br><div class=\"row valign-wrapper\"><div class=\"form-group input-field selectCons col s5\"><select required name=\"selectCons\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$0 = 0;

  marko_forEach(data.cons, function(cons) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.cons) +
      ">" +
      marko_escapeXml(cons) +
      "</option>");
  });

  out.w("</select><label for=\"selectCons\">Conselheiro</label></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnSelCons\"><i class=\"material-icons green-text text-lighten-1\">send</i></a></div><div class=\"card hoverable green lighten-1 col s5\"><div class=\"card-content white-text\"><span class=\"card-title\">Conselheiro</span><h5 class=\"white-text\"><strong><span id=\"nomeCons\"></span></strong></h5></div></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnCancelCons\"><i class=\"material-icons red-text\">cancel</i></a></div></div><div class=\"row valign-wrapper\"><div class=\"form-group input-field selectServ col s5\"><select required name=\"selectServ\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$1 = 0;

  marko_forEach(data.serv, function(serv) {
    var $keyScope$1 = "[" + (($for$1++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.serv) +
      ">" +
      marko_escapeXml(serv) +
      "</option>");
  });

  out.w("</select><label for=\"selectServ\">Servidor</label></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnSelServ\"><i class=\"material-icons orange-text text-darken-1\">send</i></a></div><div class=\"card hoverable orange darken-1 col s5\"><div class=\"card-content white-text\"><span class=\"card-title\">Servidor</span><h5 class=\"white-text\"><strong><span id=\"nomeServ\"></span></strong></h5></div></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnCancelServ\"><i class=\"material-icons red-text\">cancel</i></a></div></div><div class=\"row valign-wrapper\"><div class=\"form-group input-field selectTerc col s5\"><select required name=\"selectTerc\"><option class=\"form-group\" value=\"\" disabled selected>Clique para selecionar</option>");

  var $for$2 = 0;

  marko_forEach(data.terc, function(terc) {
    var $keyScope$2 = "[" + (($for$2++) + "]");

    out.w("<option class=\"form-group\"" +
      marko_attr("value", data.terc) +
      ">" +
      marko_escapeXml(terc) +
      "</option>");
  });

  out.w("</select><label for=\"selectTerc\">Terceirizado</label></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnSelTerc\"><i class=\"material-icons light-blue-text text-darken-3\">send</i></a></div><div class=\"card hoverable light-blue darken-3 col s5\"><div class=\"card-content white-text\"><span class=\"card-title\">Terceirizado</span><h5 class=\"white-text\"><strong><span id=\"nomeTerc\"></span></strong></h5></div></div><div class=\"col s1\"><a class=\"white btn-floating waves-effect waves-light btnCancelTerc\"><i class=\"material-icons red-text\">cancel</i></a></div></div></div><div class=\"row center-align\"><a class=\"waves-effect waves-light green btn-large\"><i class=\"material-icons right\">check</i>VOTAR</a></div></div></main>");

  app_footer_tag({}, out, __component, "74");

  app_scripts_js_tag({}, out, __component, "75");

  out.w("<script src=\"/estatico/js/base/premio.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "77");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/base/premio/premio.marko",
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
