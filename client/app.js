/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */


// СТАРТОВЫЙ СКРИПТ

(function () {
  "use strict";
  var slider = new Slider(getByID('slider')).carousel(2000);

  // при клике на пункт меню плавно скроллим к выбранному разделу
  click_on_item_menu.init();

  form_feedback_advantages.render();
  form_feedback_advantages.set_handlers();

  form_feedback_footer.render();
  form_feedback_footer.set_handlers();

  insert_contact_data.init();
}());


