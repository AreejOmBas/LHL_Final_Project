const vega = require('vega');

let view = new vega.View(vega.parse(spec), {renderer: 'none'});