/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */


// ФОРМУ ОБРАТНОЙ СВЯЗИ

var form_feedback = (function () {
  "use strict";
  var exports = {};

  var COUNT = 0;

  // всталяем форму обратной связи по клику на пункт advantages
  exports.init = function() {
    var key = 'services_';
    var l   = 8; // кол-во элементов
    for (var i = 1; i <= l; i++) {
      var id = key+i;
      (function (loopback_id) {
        getByID(id).onclick = function(e) {
          var subject = getByID(loopback_id+'_title').textContent;
          getByID('we_do').style.display = 'none';
          if (!COUNT) {
            getByID('servicesContent').insertAdjacentHTML('beforeBegin', form_feedback.get_html()); COUNT = 1;
          } else {
            getByID('servicesContent').style.display = 'block';
          }
          getByID('feedback_textarea').value   = subject+':';
        };
      }(id));
    }
  };


  exports.get_html = function () {
    var html = '';
    // <!-- <p style="float:right">X</p> -->
    html += '<div class="col-md-8 contact-right">';
      html += '<form action=#>';
        html += '<p><span class=order_call_text_for_input>Телефон:</span></p>';
        html += '<input style="color:#000;font-size:170%;background-color:#fff;border:2px solid#999;" type="text" placeholder="Введите телефон..." required>';
        html += '<input style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Заказать звонок">';
      html += '</form>';
    html += '</div>';

    html += '<div style=margin-top:20px; class="col-md-7 contact-right">';
      html += '<form action=#>';
        html += '<div class=form_feedback_column style="margin-right:2%">';
          html += '<p><span class=order_call_text_for_input>Имя:</span></p>';
          html += '<input class=form_feedback_text type="text" placeholder="Имя..." required>';
        html += '</div>';
        html += '<div class=form_feedback_column>';
          html += '<p><span class=order_call_text_for_input>E-mail:</span></p>';
          html += '<input class=form_feedback_text type="text" placeholder="E-mail..." required>';
        html += '</div>';
        html += '<textarea class=form_feedback_textarea placeholder="Сообщение..." required></textarea>';
        html += '<input style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Написать письмо">';
      html += '</form>';
    html += '</div>';
    // html += '<div class="col-md-8 contact-right">';
    //   html += '<form action=#>'; // /action=aj&who=order_call'
    //     html += '<input style="color:#000;font-size:170%;background-color:#fff;border:2px solid#999;" type="text" placeholder="Введите телефон" required>';
    //     html += '<input style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Заказать звонок">';
    //   html += '</form>';
    // html += '</div>';
    // // <div class="col-md-6" style="margin:20px 5%;width:40%;border-top:1px solid #39C9DA"></div>*/
    // html += '<div class="col-md-6 contact-right">';
    //   html += '<form action=#>'; // /action=aj&who=send_mail
    //     html += '<input style="color:#000;font-size:170%;background-color:#fff;border:2px solid#999;" type="text" placeholder="Имя..." required>';
    //     html += '<input style="color:#000;font-size:170%;background-color:#fff;border:2px solid#999;" type="text" placeholder="E-Mail..." required>';
    //     html += '<textarea id=feedback_textarea style="height:400px;color:#000;font-size:170%;background-color:#fff;border:2px solid#999;" class="text" placeholder="Сообщение..." required></textarea>';
    //     html += '<input style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Написать письмо">';
    //   html += '</form>';
    // html += '</div>';
    // html += '<div class="clearfix"></div>';

    return html;
  };

  return exports;
}());


