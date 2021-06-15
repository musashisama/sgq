// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/components/app-scripts-css.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<head><meta charset=\"utf-8\"><script async src=\"https://www.googletagmanager.com/gtag/js?id=G-60H1PVS2DT\"></script><script>\r\n  window.dataLayer = window.dataLayer || [];\r\n  function gtag(){dataLayer.push(arguments);}\r\n  gtag('js', new Date());\r\n\r\n  gtag('config', 'G-60H1PVS2DT');\r\n</script><link rel=\"stylesheet\" href=\"/estatico/css/libs/nouislider.min.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/normalize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/materialize.css\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/fontawesome/css/all.min.css\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"><link href=\"https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&amp;display=swap\" rel=\"stylesheet\"><link href=\"https://fonts.googleapis.com/css2?family=Lato:wght@400;900&amp;display=swap\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"/estatico/css/libs/tabulator_materialize.min.css\"><link rel=\"stylesheet\" href=\"/estatico/css/main.css\"><title>Sistema de Gestão Integrada</title></head>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/components/app-scripts-css.marko"
  };
