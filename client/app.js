/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */


// СТАРТОВЫЙ СКРИПТ

(function () {
  "use strict";
  var slider = new Slider(getByID('slider'));
  slider.carousel(2000);
  click_on_item_menu.init(); // при клике на пункт меню плавно скроллим к выбранному разделу
  form_feedback.init();
}());


