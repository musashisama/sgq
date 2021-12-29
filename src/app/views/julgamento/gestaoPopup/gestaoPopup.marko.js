// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/gestaoPopup/gestaoPopup.marko",
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

  out.w("<link rel=\"stylesheet\" href=\"/estatico/css/libs/quill.snow.css\"><main class=\"conteudoPrincipal\">");

  app_navbar_tag({
      id: "slide-out",
      class: "sidenav"
    }, out, __component, "6");

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Gestão de Itens do Popup SGI</h3><br><div class=\"row\"><h5 class=\"\">Título</h5><br><div id=\"tituloPopup\" class=\"col s12\"><p id=\"tituloPP\"></p><br></div></div><div class=\"row\"><h5 class=\"\">Conteúdo</h5><br><div id=\"conteudoPopup\" class=\"col s12\"><p id=\"conteudoPP\"></p><br></div></div><div id=\"rowArquivo\" class=\"row\"><h5 class=\"\">Anexos</h5><div class=\"row\"><div class=\"file-field left ctoastsucesso input-field form-group col s6\"><div class=\"btn\"><span>Arquivo</span><input type=\"file\" name=\"filetoupload\" id=\"file\" accept=\".pdf\" onchange=\"handleFile(this.files[0], 'POST')\" required></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\"></div><div class=\"hidden progress\"><div class=\"determinate\"></div></div></div></div><div class=\"row valign-wrapper\"><div id=\"mostraArq\" class=\"col s6\"><ul class=\"collection arqsUp\"></ul></div><div id=\"enviaArq\" class=\"col s6 valign-wrapper\"></div></div></div><div class=\"row\"><div class=\"col s1 offset-s11\"><a id=\"aModal\" class=\"btn-floating btn-insere waves-effect waves-light red\" title=\"Clique para enviar\"" +
    marko_attr("href", "#modal1") +
    "><i class=\"material-icons\">send</i></a></div></div><div id=\"dataPopups\"" +
    marko_attr("data-popup", "" + data.popup) +
    "></div></div></main>");

  app_footer_tag({}, out, __component, "42");

  app_modal_tag({}, out, __component, "43");

  app_scripts_js_tag({}, out, __component, "44");

  out.w("<script src=\"/estatico/js/libs/quill.min.js\"></script><script src=\"/estatico/js/julgamento/cojul/gestaoPopup/gestaoPopup.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "47");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/gestaoPopup/gestaoPopup.marko",
    tags: [
      "../../components/app-scripts-css.marko",
      "marko/src/core-tags/components/component-globals-tag",
      "../../components/app-header.marko",
      "../../components/app-navbar.marko",
      "../../components/app-footer.marko",
      "../../components/app-modal.marko",
      "../../components/app-scripts-js.marko",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
