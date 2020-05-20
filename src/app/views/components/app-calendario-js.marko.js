// Compiled using marko@4.18.13 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/sgq$1.0.0/src/app/views/components/app-calendario-js.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<script src=\"/estatico/js/libs/moment.min.js\"></script><script src=\"/estatico/js/libs/calendario/moment-timezone/main.js\"></script><script src=\"/estatico/js/libs/calendario/main.min.js\"></script><script src=\"/estatico/js/libs/calendario/pt-br.js\"></script><script src=\"/estatico/js/libs/calendario/interaction/main.min.js\"></script><script src=\"/estatico/js/libs/calendario/list/main.min.js\"></script><script src=\"/estatico/js/libs/calendario/daygrid/main.min.js\"></script><script src=\"/estatico/js/libs/calendario/luxon/luxon.js\"></script><script src=\"/estatico/js/libs/calendario/rrule/main.min.js\"></script><script src=\"/estatico/js/libs/calendario/timegrid/main.min.js\"></script><script src=\"/estatico/js/julgamento/calendario.js\"></script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/sgq$1.0.0/src/app/views/components/app-calendario-js.marko"
  };
