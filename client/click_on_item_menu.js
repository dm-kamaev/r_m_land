/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */


// ПРИ КЛИКЕ НА ПУНКТ МЕНЮ ПЛАВНО СКРОЛЛИМ К ВЫБРАННОМУ РАЗДЕЛУ

var  click_on_item_menu = (function () {
  "use strict";
  var exports = {};

  exports.init = function() {
    var ids = ['imenu_item_1', 'imenu_item_2', 'imenu_item_3', 'imenu_item_4', 'imenu_item_5'];
    for (var i = 0, l = ids.length; i < l; i++) {
      var id = ids[i];
      getByID(id).onclick = function(e) {
        if (smartBrowser) {
          e.preventDefault();
          var t = e && e.target || e.srcElement;
          var m = getByID(t.id).href.match(/#(.+)$/);
          if (m && m[1]) { scrollTo(m[1], 1000); }
        }
      };
    }
  };

  return exports;
}());


