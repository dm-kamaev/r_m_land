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

  function get_html_order_call () {
    var html = '';
    var id = get_main_id();
    html += '<div id='+id+' class="col-md-8 contact-right">';
      html += '<form action=#>';
        html += '<p><span class=order_call_text_for_input>Телефон:</span></p>';
        html += '<input id='+id+'_1 style="color:#000;font-size:170%;background-color:#fff;border:2px solid#999;" type="text" placeholder="Введите телефон..." required>';
        html += '<input id='+id+'_2 style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Заказать звонок">';
      html += '</form>';
    html += '</div>';
    return html;
  }

  function get_html_send_email () {
    var html = '';
    var id = get_main_id();
    html += '<div id='+id+' style=margin-top:20px; class="col-md-7 contact-right">';
      html += '<form action=#>';
        html += '<div class=form_feedback_column style="margin-right:2%">';
          html += '<p><span class=order_call_text_for_input>Имя:</span></p>';
          html += '<input id='+id+'_1 class=form_feedback_text type="text" placeholder="Имя..." required>';
        html += '</div>';
        html += '<div class=form_feedback_column>';
          html += '<p><span class=order_call_text_for_input>E-mail:</span></p>';
          html += '<input id='+id+'_2 class=form_feedback_text type="text" placeholder="E-mail..." required>';
        html += '</div>';
        html += '<textarea id='+id+'_3 class=form_feedback_textarea placeholder="Сообщение..." required></textarea>';
        html += '<input id='+id+'_4 style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Написать письмо">';
      html += '</form>';
    html += '</div>';
    return html;
  }


  // отрисовываем форму в footer
  exports.render_footer = function() {
    getByID('contact_us_info').insertAdjacentHTML('afterEnd',
      get_html_order_call()+get_html_send_email()
    );
  };

  function validate_phone (phone) { return (phone && /[\d+\-()\+]{4,20}/.test(phone)) ? phone : false; }

  function xss_escape (str) {
    var lt = /</g,
        gt = />/g,
        ap = /'/g,
        ic = /"/g;
    str = str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
    return str;
  }

  // TODO: Доделать
  function send_email (e, id) {
    e.preventDefault();
    var name    = getByID(id+'_1').value || '';
    var email   = getByID(id+'_2').value || '';
    var message = getByID(id+'_3').value || '';
    if (name && email && message) {
      var query = '/?action=aj&who=send_email&send=land&name='+encodeURIComponent(xss_escape(name))+'&email='+encodeURIComponent(xss_escape(email))+'&message='+encodeURIComponent(xss_escape(message));
      _R(query, null, function(Xhr) {
        // console.log(Xhr.responseText);
        var answer = JSON.parse(Xhr.responseText);
        if (answer.status === 'Ok') {
          console.log(html_show_right_answer());
        } else if (answer.status === 'Error') {
          console.log(html_show_wrong_answer());
        }
      });
      log(query);
    }
  }

  // TODO: Доделать
  function send_order_call (e, id) {
    e.preventDefault();
    var phone = validate_phone(getByID(id+'_1').value);
    if (phone) {
      var query = "/?action=aj&who=order_call&send=land&phone="+phone;
      // _R(query, null, function(Xhr) { console.log(Xhr.responseText);});
      log(query);
    }
  }

  // по клику на пункт advantages будем показывать форму обратной связи
  exports.set_handlers_footer = function() {
    var prefix_id_1 = 'main_3';
    getByID(prefix_id_1+'_2').onclick = function(e) {
      send_order_call(e, prefix_id_1);
    };
    var prefix_id_2 = 'main_4';
    getByID(prefix_id_2+'_4').onclick = function(e) {
      send_email(e, prefix_id_2);
    };
  };

// -----------------------------------------------------------------

  function get_html_advantages () {
    var html = '';
    var id = get_main_id();
    var style_cross = '"float:right;margin-right:10%;font-size:250%;font-weight:400;cursor:pointer;"';
    html += '<p id=cross style='+style_cross+'>X</p>';
    html += '<div id='+id+' style="float:none;margin:0 auto;" class="col-md-8 contact-right">';
      html += '<form action=#>';
        html += '<p><span class=order_call_text_for_input>Телефон:</span></p>';
        html += '<input id='+id+'_1 style="color:#000;font-size:170%;background-color:#fff;border:2px solid#999;" type="text" placeholder="Введите телефон..." required>';
        html += '<input id='+id+'_2 style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Заказать звонок">';
      html += '</form>';
    html += '</div>';

    id = get_main_id();
    html += '<div style="float:none;margin:0 auto;margin-top:20px;" class="col-md-8 contact-right">';
      html += '<form action=#>';
        html += '<div id='+id+' class=form_feedback_column style="margin-right:2%">';
          html += '<p><span class=order_call_text_for_input>Имя:</span></p>';
          html += '<input id='+id+'_1 class=form_feedback_text type="text" placeholder="Имя..." required>';
        html += '</div>';
        html += '<div class=form_feedback_column>';
          html += '<p><span class=order_call_text_for_input>E-mail:</span></p>';
          html += '<input id='+id+'_2 class=form_feedback_text type="text" placeholder="E-mail..." required>';
        html += '</div>';
        html += '<textarea id='+id+'_3 class=form_feedback_textarea placeholder="Сообщение..." required></textarea>';
        html += '<input id='+id+'_4 style=margin-left:auto;margin-right:auto;font-size:170%; type="submit" value="Написать письмо">';
      html += '</form>';
    html += '</div>';
    return html;
  }

  // показываем форму
  var proccesing_services_content = function(id) {
    var m = id.match(/^(services_content_\d+)/);
    if (m && m[1]) {
      var subject = getByID(m[1]+'_1').textContent || '';
      getByID('main_2_3').value = subject+':';
      // opacity должен быть 1 равен
      fadeInOut(getByID('services'),'Out','none', 50, function() {
        fadeInOut(getByID('form_feedback_service'), 'In', 'block', 50);
      });
    }
  };

  // var TREE = {
  //   services_content: {}
  // };

  // вставляем форму обратной связи перед advantages и скрываем ее
  exports.render_advantages = function() {
    var html = '';
    html += '<div id=form_feedback_service style="opacity:0" class="contact-us">';
      html += '<div class="container">';
        html += get_html_advantages();
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


  // по клику на пункт advantages будем показывать форму обратной связи
  exports.set_handlers_advantages = function() {
    getByID('services_content').onclick = function(e) {
      var t = e && e.target || e.srcElement, m;
      while(t && !t.id){t=t.parentNode;}
      if (t.id) { proccesing_services_content(t.id); }
    };
    var prefix_id_1 = 'main_1';
    getByID(prefix_id_1+'_2').onclick = function(e) {
      send_order_call(e, prefix_id_1);
    };
    var prefix_id_2 = 'main_2';
    getByID(prefix_id_2+'_4').onclick = function(e) {
      send_email(e, prefix_id_2);
    };
  };

  return exports;
}());


