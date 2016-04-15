#!/usr/local/bin/node

/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */

"use strict";

// ОПИСАНИЕ СКРИПТА

var CONF  = require('/r_m_land/config.js').settings();
var wf    = require(CONF.my_modules + 'wf.js');
// var fs    = require('fs');
// var async = require(CONF.node_modules + 'async');
// var db    = require(CONF.my_modules   + 'usedb.js');
// var tr    = require(CONF.my_modules   + 'transform_data_from_file_or_base.js');

// var Articles = require (c.oft_modules + 'Articles.js');

// var CONTEXT = {};
// CONTEXT     = require('/r_m/nodejs/my/context.js')
//               .add_set_get(CONTEXT);


// params –– {key: value}
// str_or_file –– 'Hello ${key}' or test.html where in 'Hello ${key}'
exports.do = function (params, str_or_file, cb) {
  if (typeof str_or_file === 'string') {
    return template_string(params, str_or_file);
  } else if (params instanceof Object) {
    wf.read_file(str_or_file.file, function(err, res) {
      if (err) {
        cb('Error: template file '+str_or_file.file+' => '+err, null)
      } else {
        cb(null, template_string(params, res));
      }
    });
  }
};
// console.log(exports.do({test: 'world'}, ' Hello ${test}'));



function template_string (options, str) {
  var keys = Object.keys(options);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key   = keys[i], value = options[key];
    var reg = new RegExp('\\${'+key+'}', 'ig');
    str = str.replace(reg, value || '');
  }
  return str;
}