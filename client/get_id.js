/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */


// СОЗДАЕМ ЗАМЫКАНИЕ, КОТОРОЕ БУДЕТ ОТДАВАТЬ НОМЕР ID ДЛЯ ГЛАВНЫХ ЭЛЕМЕНТОВ 'main_'+get_id()

var get_id = (function () {
  "use strict";
  var number_id = 1;
  return function() { return 'main_'+(number_id++); };
}());
