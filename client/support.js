/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */


// ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ

var support = (function () {
  "use strict";
  var exports = {};

  exports.validate_phone = function (phone) { return (phone && /[\d+\-()\+]{4,20}/.test(phone)) ? phone : false; }

  exports.xss_escape = function (str) {
    var lt = /</g,
        gt = />/g,
        ap = /'/g,
        ic = /"/g;
    str = str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
    return str;
  }

  return exports;
}());


