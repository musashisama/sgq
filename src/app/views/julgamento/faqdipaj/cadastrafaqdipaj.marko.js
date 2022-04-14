// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/julgamento/faqdipaj/cadastrafaqdipaj.marko",
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

  out.w("<link rel=\"stylesheet\" href=\"/estatico/css/libs/quill.snow.css\"><main class=\"conteudoPrincipal\">");

  app_navbar_tag({
      id: "slide-out",
      class: "sidenav"
    }, out, __component, "6");

  out.w("<div class=\"container\"><h3 class=\"center-align titulo\">Cadastro de Perguntas & Respostas - DIPAJ/COJUL</h3><br><div class=\"row\"><h5 class=\"\">Pergunta</h5><br><div id=\"editorPergunta\" class=\"col s12\"><p id=\"perguntaFAQ\"></p><br></div></div><div class=\"row\"><h5 class=\"\">Resposta</h5><br><div id=\"editorResposta\" class=\"col s12\"><p id=\"respostaFAQ\"></p><br></div></div><div class=\"row\"><div class=\"input-field col s4\"><select required name=\"secaoFAQ\" id=\"secaoFAQ\"><option value=\"\" disabled selected>Escolha uma opção:</option><option value=\"prod\">Meta de Produtividade</option><option value=\"regap\">REGAP</option><option value=\"reinp\">REINP</option><option value=\"rejul\">REJUL</option><option value=\"sorteio\">Sorteio</option><option value=\"notificaoes\">Notificações</option><option value=\"sessaovirtual\">Sessões Virtuais</option></select><label>Qual a seção do FAQ?</label></div></div><div id=\"rowArquivo\" class=\"row\"><h5 class=\"\">Anexos</h5><div class=\"row\"><div class=\"file-field left ctoastsucesso input-field form-group col s6\"><div class=\"btn\"><span>Arquivo</span><input type=\"file\" name=\"filetoupload\" id=\"file\" accept=\".pdf\" onchange=\"handleFile(this.files[0], 'POST')\" required></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\" type=\"text\"></div><div class=\"hidden progress\"><div class=\"determinate\"></div></div></div></div><div class=\"row valign-wrapper\"><div id=\"mostraArq\" class=\"col s6\"><ul class=\"collection arqsUp\"></ul></div><div id=\"enviaArq\" class=\"col s6 valign-wrapper\"></div></div></div><div class=\"row\"><div class=\"col s1 offset-s11\"><a id=\"aModal\" class=\"btn-floating btn-insere waves-effect waves-light red\" title=\"Clique para enviar\"" +
    marko_attr("href", "#modal1") +
    "><i class=\"material-icons\">send</i></a></div></div><div id=\"dataFAQ\"" +
    marko_attr("data-faq", "" + data.faq) +
    "></div></div></main>");

  app_footer_tag({}, out, __component, "54");

  out.w("<div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4 class=\"hModal\">Modal Header</h4><p class=\"pModal\"></p></div><div class=\"modal-footer\"><a href=\"#!\" class=\"modal-close waves-effect waves-red btn-flat cancela\">Cancela</a><button class=\"btn waves-effect waves-light concorda\" type=\"submit\" name=\"action\">Confirma <i class=\"material-icons right\">send</i></button></div></div>");

  app_scripts_js_tag({}, out, __component, "63");

  out.w("<script src=\"/estatico/js/libs/quill.min.js\"></script><script src=\"/estatico/js/julgamento/cadastrafaq.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "66");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/julgamento/faqdipaj/cadastrafaqdipaj.marko",
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
