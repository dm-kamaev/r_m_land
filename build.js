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

var metrica  = require(CONF.my_modules   + 'metrica.js');

var uncss    = require('uncss'); // локально установлен

var html_advantages = require(CONF.oft_modules  + 'html_advantages.js');

var CONTEXT = require('/r_m_land/my/context.js').add_set_get({});
CONTEXT.set('params', {});





// ---------------------------------------------------------------------------------------------------

asc.series_move_data([
  (cbm) => { build_html(CONTEXT, cbm);},
  (cbm) => { build_css(CONTEXT, cbm);},
  (cbm) => { build_js(CONTEXT, cbm); },
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
  if (type_build === 'css') {
    do_that.push((cbm) => { build_css(CONTEXT, cbm);});
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
        var hash = CONTEXT.get('params');
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
      // CONTEXT['js'] =  result;
      cb_main(err || null, 'build_js');
    });
  });
}


function build_html (CONTEXT, cb_main) {
  files.get_list_files(CONF.path_html, function(err, res) {
    var list_filename = fn.map_value(res, function(file_name) { return file_name; });
    var read = function(path_file, cb) {
      wf.read_file(path_file, function(err, res) {
        var hash = CONTEXT.get('params');
        if (!err) hash[path_file.replace(/.+\/(.+html)$/, '$1')] = res;
        cb(err || null, hash);
      });
    };
    asc.ar_series(read, list_filename, function(err, result) {
      // CONTEXT['html'] =  result;
      cb_main(err || null, 'build_html');
    });
  });
}


function build_css (CONTEXT, cb_main) {
  var params    = CONTEXT.get('params');
  var css_files = [
    '/r_m_land/css/style_ui_web.css',
    '/r_m_land/css/style_mixdesig.css',
    '/r_m_land/css/style_it.css',
    '/r_m_land/css/bootstrap.css',
    '/r_m_land/css/my_style.css',
    '/r_m_land/css/media_queries.css',
  ], css_bundle = '/r_m_land/css/bundle.css';
  var css_hash  = {};
  asc.series([
    (cbm) => { wf.write_file(css_bundle, '', cbm); },
    (cbm) => {
      var read = function(path, cb) {
        wf.read_file(path, function(err, from_file) {
          // var fname = path.replace(/.+\/(.+css)$/, '$1');
          // if (!err) { params[fname] = res; }
          if (!err) {
            if (!params.bundle_css) { params.bundle_css = '';}
            params.bundle_css += from_file;
            wf.add_file(css_bundle, from_file, function(error, res) {
              // if (!error) {}
              cb(error || null, null);
            });
          } else {
            cb(err);
          }
        });
      };
      asc.ar_series(read, css_files, function(err, res) {
        cbm(err || null, null);
      });
    }
    ],function(err, res) {
        // console.log(params);
       cb_main(err || null, 'build_css');
  });
}


function build_all (CONTEXT, cb_main) {
  var params = CONTEXT.get('params');
  params['metrica.js'] = metrica.get();

  template.do(CONTEXT.get('params'), { file: CONF.main_path+'site.html' }, function(err, res) {
    // res = res.replace(/\<style\>(.+)\<\/style\>/, '<style>$1'+params.bundle_css+'</style>');
    // console.log(res);
    // res = res.replace(/<style>(.+)<\/style>/m, '<style>$1__TEST__.{}</style>');
    cb_main(err || null, res, 'build_all');
  });
}


function set_watch () {
  set_watch_html();
  set_watch_js();
  set_watch_css();
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


function set_watch_css () {
  var path = CONF.path_css;
  fs.watch(path, function(event, filename) {
    if (filename !== 'bundle.css') {
      // console.log('event is: ' + event);
      console.log('css is: ' + event);
      rebuilding('css');
    }
  });
}
// доделать
// function remove_extra_css (html_file, cb_main) {
//   var files = ['test.html'],
//     options = {
//       // ignore       : ['#added_at_runtime', /test\-[0-9]+/],
//       media: ['(min-width: 700px) handheld and (orientation: landscape)'],
//       // media        : ['all'],
//       // csspath      : '../public/css/',
//       csspath: './css/',
//       // raw          : 'h1 { color: green }',
//       // stylesheets  : ['lib/bootstrap/dist/css/bootstrap.css', 'src/public/css/main.css'],
//       stylesheets: ['bootstrap.css', 'my_style.css', 'style_it.css', 'style_mixdesig.css', 'style_ui_web.css'],
//       ignoreSheets: [/fonts.googleapis/],
//       // timeout      : 2000,
//       // htmlroot     : 'public',
//       // report       : false,
//       // uncssrc      : '.uncssrc'
//     };
//   uncss(str, options, function(error, output) {
//     console.log('Uncss = ', error || output);
//     cb_main(err||null, output)
//     // global.process.exit();
//   });
// }
