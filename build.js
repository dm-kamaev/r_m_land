#!/usr/local/bin/node

/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */

"use strict";

// ОПИСАНИЕ СКРИПТА

var CONF     = require('/r_m_land/config.js').settings();
var fs       = require('fs');
var asc      = require(CONF.my_modules   + 'asc.js');
var wf       = require(CONF.my_modules   + 'wf.js');
var files    = require(CONF.my_modules   + 'files.js');
var fn       = require(CONF.my_modules   + 'fn.js');
var template = require(CONF.my_modules   + 'template.js');
var uglifyjs = require(CONF.node_modules + 'uglify-js');

var uncss    = require('uncss'); // локально установлен

var html_advantages = require(CONF.oft_modules  + 'html_advantages.js');

var CONTEXT = require('/r_m_land/my/context.js').add_set_get({});






// ---------------------------------------------------------------------------------------------------

asc.series_move_data([
  (cbm) => { build_html(CONTEXT, cbm);},
  (cbm) => { build_js(CONTEXT, cbm);},
  (cbm) => { build_all(CONTEXT, cbm); },
  (cbm, data) => { wf.write_file(CONF.main_path+'index.html', data, cbm); },
  ],function(err, result) {
    console.log('\n\n async BUILD.JS series dine: ', err || result);
    set_watch();
});


function rebuilding (type_build) {
  var do_that = [];
  if (type_build === 'html') {
    do_that.push((cbm) => { build_html(CONTEXT, cbm); });
  }
  if (type_build === 'js') {
    do_that.push((cbm) => { build_js(CONTEXT, cbm); });
  }
  do_that.push((cbm) => { build_all(CONTEXT, cbm); });
  do_that.push((cbm, data) => { wf.write_file(CONF.main_path+'index.html', data, cbm); });
  asc.series_move_data(do_that, function(err, result) {
      console.log('\n\n async REBUILD => BUILD.JS series dine: ', err || result);
  });
}

// ---------------------------------------------------------------------------------------------------


function build_js (CONTEXT, cb_main) {
  files.get_list_files(CONF.path_js, function(err, res) {
    var list_filename = fn.map_value(res, function(file_name) { return file_name; });
    var read = function(path_file, cb) {
      wf.read_file(path_file, function(err, res) {
        var hash = {};
        if (CONF.min_js === 'on') {
          res = uglifyjs.minify(res, {
            fromString: true, // указываем, что берем данные из строки, а не из файла
            mangle: true,
            compress: {
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              // drop_console: true
            }
          }).code;
        }
        if (!err) hash[path_file.replace(/.+\/(.+js)$/, '$1')] = res;
        cb(err || null, hash);
      });
    };
    asc.ar_series(read, list_filename, function(err, result) {
      CONTEXT['js'] =  result;
      cb_main(err || null, 'build_js');
    });
  });
}


function build_html (CONTEXT, cb_main) {
  files.get_list_files(CONF.path_html, function(err, res) {
    var list_filename = fn.map_value(res, function(file_name) { return file_name; });
    var read = function(path_file, cb) {
      wf.read_file(path_file, function(err, res) {
        var hash = {};
        if (!err) hash[path_file.replace(/.+\/(.+html)$/, '$1')] = res;
        cb(err || null, hash);
      });
    };
    asc.ar_series(read, list_filename, function(err, result) {
      CONTEXT['html'] =  result;
      cb_main(err || null, 'build_html');
    });
  });
}


function build_all (CONTEXT, cb_main) {
  var params = {};
  fn.foreach_value(CONTEXT.get('html'), function(file) {
    fn.foreach_value(Object.keys(file), function(key) { params[key] = file[key]; });
  });
  fn.foreach_value(CONTEXT.get('js'), function(file) {
    fn.foreach_value(Object.keys(file), function(key) { params[key] = file[key]; });
  });
  template.do(params, { file: CONF.main_path+'site.html' }, function(err, res) {
    cb_main(err || null, res, 'build_all');
  });
}


function set_watch () {
  set_watch_html();
  set_watch_js();
}

function set_watch_html () {
  var path = CONF.path_html;
  fs.watch(path, function(event, filename) {
    // console.log('event is: ' + event);
    console.log('html is: ' + event);
    rebuilding('html');
  });
}


function set_watch_js () {
  var path = CONF.path_js;
  fs.watch(path, function(event, filename) {
    // console.log('event is: ' + event);
    console.log('js is: ' + event);
    rebuilding('js');
  });
}

// доделать
function remove_extra_css (html_file, cb_main) {
  var files = ['test.html'],
    options = {
      // ignore       : ['#added_at_runtime', /test\-[0-9]+/],
      media: ['(min-width: 700px) handheld and (orientation: landscape)'],
      // media        : ['all'],
      // csspath      : '../public/css/',
      csspath: './css/',
      // raw          : 'h1 { color: green }',
      // stylesheets  : ['lib/bootstrap/dist/css/bootstrap.css', 'src/public/css/main.css'],
      stylesheets: ['bootstrap.css', 'my_style.css', 'style_it.css', 'style_mixdesig.css', 'style_ui_web.css'],
      ignoreSheets: [/fonts.googleapis/],
      // timeout      : 2000,
      // htmlroot     : 'public',
      // report       : false,
      // uncssrc      : '.uncssrc'
    };
  uncss(str, options, function(error, output) {
    console.log('Uncss = ', error || output);
    cb_main(err||null, output)
    // global.process.exit();
  });
}
