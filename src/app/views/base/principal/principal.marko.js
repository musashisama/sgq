// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/base/principal/principal.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/google-fonts.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Sistema Integrado de Gestão</title></head><body>");

  component_globals_tag({}, out);

  out.w("<header class=\"container-header cabecalho\"></header><main class=\"conteudoPrincipal\"><div class=\"container\"><div class=\"row\">");

  if (data.msg) {
    out.w("<div id=\"toastsucesso\" class=\"ctoastsucesso\"></div><div id=\"msg\" class=\"controle\">" +
      marko_escapeXml(data.msg) +
      "</div>");
  }

  out.w("<div class=\"col s6 offset-s3 center-align\"><br><br><br><br><ul class=\"collapsible popout\"><li><div class=\"collapsible-header\"><i class=\"material-icons\">account_balance</i>Gestão do Julgamento</div><div class=\"collapsible-body\"><ul class=\"collection\"><li class=\"collection-item avatar\"><i class=\"material-icons circle green\">add</i><a href=\"/julgamento/restrito/carregacsv\"><span class=\"title\">Enviar relatório do e-Processo</span></a><a href=\"/julgamento/restrito/carregacsv\" class=\"secondary-content\"><i class=\"material-icons\">lock</i></a></li><li class=\"collection-item avatar\"><i class=\"material-icons circle blue\">insert_chart</i><a href=\"/julgamento/restrito/diagnostico-carga\"><span class=\"title\">Diagnóstico de Estoque dos Conselheiros</span></a><a href=\"/julgamento/restrito/diagnostico-carga\" class=\"secondary-content\"><i class=\"material-icons\">lock</i></a></li><li class=\"collection-item avatar\"><i class=\"material-icons circle red\">list</i><a href=\"#\"><span class=\"title\">Diagnóstico do Acervo do CARF</span></a><a href=\"#\" class=\"secondary-content\"><i class=\"material-icons\">lock</i></a></li></ul></div></li><li><div class=\"collapsible-header\"><i class=\"material-icons\">trending_down</i>Gestão de Riscos</div><div class=\"collapsible-body\"><span>Em construção.</span></div></li><li><div class=\"collapsible-header\"><i class=\"material-icons\">check_circle</i>Gestão da Qualidade</div><div class=\"collapsible-body\"><ul class=\"collection\"><li class=\"collection-item avatar\"><i class=\"material-icons circle green\">add</i><a href=\"/form\"><span class=\"title\">Cadastrar nova Não Conformidade</span></a><a href=\"/form\" class=\"secondary-content\"><i class=\"material-icons\">lock_open</i></a></li><li class=\"collection-item avatar\"><i class=\"material-icons circle blue\">insert_chart</i><a href=\"http://10.202.24.111:3005/public/dashboard/9e707956-2b3a-4f87-bbef-254e6ea90c8d\"><span class=\"title\">Ir para o Dashboard</span></a><a href=\"http://10.202.24.111:3005/public/dashboard/9e707956-2b3a-4f87-bbef-254e6ea90c8d\" class=\"secondary-content\"><i class=\"material-icons\">lock_open</i></a></li><li class=\"collection-item avatar\"><i class=\"material-icons circle red\">list</i><a href=\"/listagem\"><span class=\"title\">Listar Tipos de Não Conformidades</span></a><a href=\"/listagem\" class=\"secondary-content\"><i class=\"material-icons\">lock_open</i></a></li><li class=\"collection-item avatar\"><i class=\"material-icons circle purple\">format_list_numbered</i><a href=\"/gestao/listaregistronc \"><span class=\"title\">Listar Todos os Registros de Não Conformidades</span></a><a href=\"/gestao/listaregistronc \" class=\"secondary-content\"><i class=\"material-icons\">lock</i></a></li><li class=\"collection-item avatar\"><i class=\"material-icons circle black\">format_list_bulleted</i><a href=\" /gestao/cadastranc\"><span class=\"title\">Cadastrar Novo Tipo de Não Conformidade</span></a><a href=\" /gestao/cadastranc\" class=\"secondary-content\"><i class=\"material-icons\">lock</i></a></li><li class=\"collection-item avatar\"><i class=\"material-icons circle grey\">edit</i><a href=\"/gestao/lista\"><span class=\"title\">Listar/Editar Tipos de Não Conformidades</span></a><a href=\"/gestao/lista\" class=\"secondary-content\"><i class=\"material-icons\">lock</i></a></li></ul></div></li><li><div class=\"collapsible-header\"><i class=\"material-icons\">people</i>Gestão de Pessoas</div><div class=\"collapsible-body\"><ul class=\"collection\"><li class=\"collection-item avatar\"><i class=\"material-icons circle green\">face</i><a href=\"/pessoal/restrito/pessoas\"><span class=\"title\">Relação de Pessoal do CARF</span></a><a href=\"/pessoal/restrito/pessoas\" class=\"secondary-content\"><i class=\"material-icons\">lock</i></a></li></ul> </div></li></ul></div></div></div></main><footer class=\"page-footer rodape\"></footer><script src=\"/estatico/js/libs/jquery-3.4.1.js\"></script><script src=\"/estatico/js/libs/materialize.js\"></script><script src=\"/estatico/js/scprincipal.js\"></script><script src=\"/estatico/js/loadtemplate.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "106");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/base/principal/principal.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
