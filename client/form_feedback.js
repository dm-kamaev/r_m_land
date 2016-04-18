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

  exports.get_html = function () {
    var html = '';
    var style_cross = '"float:right;margin-right:10%;font-size:250%;font-weight:400;cursor:pointer;"';
    html += '<p id=cross style='+style_cross+'>X</p>';
    html += '<div style="float:none;margin:0 auto;" class="col-md-8 contact-right">';
    // html += '<div class="col-md-8 contact-right">'; // для footer
      html += '<form action=#>';
        html += '<p><span class=order_call_text_for_input>Телефон:</span></p>';
        html += '<input style="color:#000;font-size:170%;background-color:#fff;border:2px solid#999;" type="text" placeholder="Введите телефон..." required>';
        html += '<input style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Заказать звонок">';
      html += '</form>';
    html += '</div>';

    html += '<div style="float:none;margin:0 auto;margin-top:20px;" class="col-md-8 contact-right">';
    // html += '<div style="margin-top:20px;" class="col-md-8 contact-right">'; // для footer
      html += '<form action=#>';
        html += '<div class=form_feedback_column style="margin-right:2%">';
          html += '<p><span class=order_call_text_for_input>Имя:</span></p>';
          html += '<input class=form_feedback_text type="text" placeholder="Имя..." required>';
        html += '</div>';
        html += '<div class=form_feedback_column>';
          html += '<p><span class=order_call_text_for_input>E-mail:</span></p>';
          html += '<input class=form_feedback_text type="text" placeholder="E-mail..." required>';
        html += '</div>';
        html += '<textarea id=form_feedback_textarea class=form_feedback_textarea placeholder="Сообщение..." required></textarea>';
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

  var proccesing_services_content = function(id) {
    var m = id.match(/^(services_content_\d+)/);
    if (m && m[1]) {
      var subject = getByID(m[1]+'_1').textContent || '';
      getByID('form_feedback_textarea').value = subject+':';
      // opacity должен быть 1 равен
      fadeInOut(getByID('services'),'Out','none', 50, function() {
        fadeInOut(getByID('form_feedback_service'), 'In', 'block', 50);
      });
    }
  };

  // var TREE = {
  //   services_content: {}
  // };
  // всталяем форму обратной связи по клику на пункт advantages
  exports.init = function() {
    var html = '';
    html += '<div id=form_feedback_service style="opacity:0" class="contact-us">';
      html += '<div class="container">';
        html += exports.get_html();
      html += '</div>';
    html += '</div>';
    getByID('services').insertAdjacentHTML('beforeBegin', html);
    getByID('form_feedback_service').style.display = 'none';
    getByID('cross').onclick = function() {
      fadeInOut(getByID('form_feedback_service'),'Out','none', 50, function() {
        fadeInOut(getByID('services'), 'In', 'block', 50);
      });
    };
  };


  exports.set_handlers = function() {
    getByID('services_content').onclick = function(e) {
      var t = e && e.target || e.srcElement, m;
      console.log(t);
      while(t && !t.id){t=t.parentNode;}
      if (t.id) { proccesing_services_content(t.id); }
    };
  };

  return exports;
}());


