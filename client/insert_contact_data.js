/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */


// ВСТАВКА КОНТАКТНЫХ ДАННЫХ

var insert_contact_data = (function () {
  "use strict";
  var exports = {};

  exports.init = function() {
    /*info@risk-monitoring.ru*/
    getByID('email').innerHTML = '\u0069\u006e\u0066\u006f\u0040\u0072\u0069\u0073\u006b\u002d\u006d\u006f\u006e\u0069\u0074\u006f\u0072\u0069\u006e\u0067\u002e\u0072\u0075';
    /*'+7(906)-095-92-31<br>+7(926)-623-95-40';*/
    getByID('phone').innerHTML = '\u002b\u0037\u0028\u0039\u0030\u0036\u0029\u002d\u0030\u0039\u0035\u002d\u0039\u0032\u002d\u0033\u0031\u003c\u0062\u0072\u003e\u002b\u0037\u0028\u0039\u0032\u0036\u0029\u002d\u0036\u0032\u0033\u002d\u0039\u0035\u002d\u0034\u0030';
  };
  return exports;
}());


