/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */


// ФОРМУ ОБРАТНОЙ СВЯЗИ ДЛЯ FOOTER
// TODO: Грязный код

var form_feedback_footer = (function () {
  "use strict";
  var exports = {};

  var main     = get_id(),
      main_1   = main+'_1', main_1_1 = main_1+'_1', main_1_2 = main_1+'_2';
  var main_2   = main+'_2', main_2_1 = main_2+'_1';
  var TREE = {
    formFeedback: { id: main_1 },
      formFeedback_orderCall: {
        id    : main_1_1,
        view  : html_order_call,
        events: submit_order_call,
      },
        formFeedback_orderCall_phone:  { id: main_1_1+'_1', },
        formFeedback_orderCall_button: { id: main_1_1+'_2', },
      formFeedback_sendEmail : {
        id    : main_1_2,
        view  : html_send_email,
        events: submit_send_email,
      },
        formFeedback_sendEmail_name    : { id: main_1_2+'_1'},
        formFeedback_sendEmail_email   : { id: main_1_2+'_2'},
        formFeedback_sendEmail_message : { id: main_1_2+'_3'},
        formFeedback_sendEmail_button  : { id: main_1_2+'_4'},
    after_submit: { id: main_2},
      after_submit_goToForm: {
        id:     main_2_1,
        events: go_to_form,
      },
  };
  console.log(TREE);
  function html_order_call () {
    var html = '';
    html += '<div id='+TREE.formFeedback_orderCall.id+' class="col-md-8 contact-right">';
      html += '<form action=#>';
        html += '<p><span class=order_call_text_for_input>Телефон:</span></p>';
        html += '<input id='+TREE.formFeedback_orderCall_phone.id+' class="form_feedback_text form_feedback_column_input form_feedback_column_inputText_orderCall" type=text placeholder="Введите телефон..." required>';
        html += '<p style=display:inline-block><span id='+TREE.formFeedback_orderCall_phone.id+'_1 style="display:none;color:red;font-size:120%;\'Lato\', sans-serif">* Введите номер телефона</span></p>';
        html += '<input id='+TREE.formFeedback_orderCall_button.id+' style=margin-left:auto;margin-right:auto;font-size:170%; class=form_feedback_column_inputSubmit type=submit value="Заказать звонок">';
      html += '</form>';
    html += '</div>';
    return html;
  }

  function html_send_email () {
    var html = '';
    html += '<div id='+TREE.formFeedback_sendEmail.id+' style=margin-top:20px; class="col-md-7 contact-right">';
      html += '<form action=#>';
        html += '<div class=form_feedback_column style="margin-right:2%">';
          html += '<p><span class=order_call_text_for_input>Имя:</span></p>';
          html += '<input id='+TREE.formFeedback_sendEmail_name.id+' class="form_feedback_text form_feedback_column_input form_feedback_column_inputText_sendEmail" type=text placeholder="Имя..." required>';
          html += '<p style=display:inline-block><span id='+TREE.formFeedback_sendEmail_name.id+'_1 style="display:none;color:red;font-size:120%;\'Lato\', sans-serif">* Введите имя</span></p>';
        html += '</div>';
        html += '<div class=form_feedback_column>';
          html += '<p><span class=order_call_text_for_input>E-mail:</span></p>';
          html += '<input id='+TREE.formFeedback_sendEmail_email.id+' class="form_feedback_text form_feedback_column_input form_feedback_column_inputText_sendEmail" type=text placeholder="E-mail..." required>';
          html += '<p style=display:inline-block><span id='+TREE.formFeedback_sendEmail_email.id+'_1 style="display:none;color:red;font-size:120%;\'Lato\', sans-serif">* Введите e-mail</span></p>';
        html += '</div>';
        html += '<textarea id='+TREE.formFeedback_sendEmail_message.id+' class=form_feedback_textarea placeholder="Сообщение..." required></textarea>';
        html += '<p style=display:inline-block;width:100%><span id='+TREE.formFeedback_sendEmail_message.id+'_1 style="display:none;color:red;font-size:120%;\'Lato\', sans-serif">* Введите сообщение</span></p>';
        html += '<input id='+TREE.formFeedback_sendEmail_button.id+' style=margin-left:auto;margin-right:auto;font-size:170%; class=form_feedback_column_inputSubmit type=submit value="Написать письмо">';
      html += '</form>';
    html += '</div>';
    return html;
  }


  // отрисовываем форму в footer
  exports.render = function() {
    getByID('contact_us_info').insertAdjacentHTML('afterEnd',
      '<div id='+TREE.formFeedback.id+'>'+
        TREE.formFeedback_orderCall.view()+
        TREE.formFeedback_sendEmail.view()+
      '</div>'+
      '<div id='+TREE.after_submit.id+'></div>'
    );
  };



  // TODO: Доделать
  function send_email (e, id) {
    e.preventDefault();
    var name    = getByID(id+'_1').value || '',
        email   = getByID(id+'_2').value || '',
        message = getByID(id+'_3').value || '';

    var turn_off_error_text = function() {
      getByID(TREE.formFeedback_sendEmail_name.id).style.borderColor  = '#999';
      getByID(TREE.formFeedback_sendEmail_name.id+'_1').style.display = 'none';
      getByID(TREE.formFeedback_sendEmail_email.id).style.borderColor  = '#999';
      getByID(TREE.formFeedback_sendEmail_email.id+'_1').style.display = 'none';
      getByID(TREE.formFeedback_sendEmail_message.id).style.borderColor  = '#999';
      getByID(TREE.formFeedback_sendEmail_message.id+'_1').style.display = 'none';
    };

    var turn_on_error_text = function() {
      turn_off_error_text();
      if (!name) {
        getByID(TREE.formFeedback_sendEmail_name.id).style.borderColor  = 'red';
        getByID(TREE.formFeedback_sendEmail_name.id+'_1').style.display = 'inline';
      }
      if (!email) {
        getByID(TREE.formFeedback_sendEmail_email.id).style.borderColor  = 'red';
        getByID(TREE.formFeedback_sendEmail_email.id+'_1').style.display = 'inline';
      }
      if (!message) {
        getByID(TREE.formFeedback_sendEmail_message.id).style.borderColor  = 'red';
        getByID(TREE.formFeedback_sendEmail_message.id+'_1').style.display = 'inline';
      }
    };

    if (name && email && message) {
      turn_off_error_text();
      var query = '/?action=aj&who=send_email&send=land&name='+encodeURIComponent(support.xss_escape(name))+'&email='+encodeURIComponent(support.xss_escape(email))+'&message='+encodeURIComponent(support.xss_escape(message));
      _R(query, null, function(Xhr) {
        // console.log(Xhr.responseText);
        var answer = JSON.parse(Xhr.responseText);
        getByID(TREE.formFeedback.id).style.display = 'none';
        if (answer.status === 'Ok') {
          // console.log(html_show_right_answer('письмо', html_text_connection_send_email(name, email, message)));
          getByID(TREE.after_submit.id).innerHTML = html_show_right_answer('письмо', html_text_connection_send_email(name, email, message));
        } else if (answer.status === 'Error') {
          // console.log(html_show_wrong_answer());
          getByID(TREE.after_submit.id).innerHTML = html_show_wrong_answer();
        }
        TREE.after_submit_goToForm.events();
      });
      // log(query);
    } else {
      turn_on_error_text();
    }

  }


  function send_order_call (e, id) {
    e.preventDefault();
    var phone = support.validate_phone(getByID(id+'_1').value);
    if (phone) {
      getByID(TREE.formFeedback_orderCall_phone.id).style.borderColor  = '#999';
      getByID(TREE.formFeedback_orderCall_phone.id+'_1').style.display = 'none';
      var query = "/?action=aj&who=order_call&send=land&phone="+phone;
      _R(query, null, function(Xhr) { // console.log(Xhr.responseText);
        var answer = JSON.parse(Xhr.responseText);
        getByID(TREE.formFeedback.id).style.display = 'none';
        if (answer.status === 'Ok') {
          getByID(TREE.after_submit.id).innerHTML = html_show_right_answer('заказ звонка', html_text_connection_order_call(phone));
        } else if (answer.status === 'Error') {
          getByID(TREE.after_submit.id).innerHTML = html_show_wrong_answer();
        }
        TREE.after_submit_goToForm.events();
      });
    } else {
      getByID(TREE.formFeedback_orderCall_phone.id).style.borderColor  = 'red';
      getByID(TREE.formFeedback_orderCall_phone.id+'_1').style.display = 'inline';
    }
  }


  exports.set_handlers = function() {
    TREE.formFeedback_orderCall.events(TREE.formFeedback_orderCall.id);
    TREE.formFeedback_sendEmail.events(TREE.formFeedback_sendEmail.id);
  };


  function submit_order_call (id) {
    getByID(id).onclick = function(e) {
      var t = e && e.target || e.srcElement;
      if (t.type === 'submit') { send_order_call(e, id); }
    };
  }

  function submit_send_email (id) {
    getByID(id).onclick = function(e) {
      var t = e && e.target || e.srcElement;
      if (t.type === 'submit') { send_email(e, id); }
    };
  }

  // по клику на ссылку 'Вернуться к форме' отрисовать форму заново
  function go_to_form () {
    getByID(TREE.after_submit_goToForm.id).onclick = function (e) {
      e.preventDefault();
      getByID(TREE.formFeedback.id).style.display = 'block';
      getByID(TREE.after_submit.id).innerHTML = '';
    };
  }


  function html_show_right_answer (type_order, text_connection) {
    return '<div class=col-md-7 style=text-align:center;font-size:170%;font-family:\'Lato\', sans-serif;>'+
              'Спасибо за '+type_order+'.<br>'+
              'C вами свяжутся в ближайшее время. <br>'+text_connection+'.<br>'+
              '<a style=text-decoration:none; id='+TREE.after_submit_goToForm.id+' href=#>Вернуться к форме</a>'+
              '<p><img src=/land/img/tick.png alt="Заказ письма или звонка прошел успешно"/></p>'+
            '</div>';
  }

  function html_show_wrong_answer () {
    return '<div class=col-md-7 style=text-align:center;font-size:170%;font-family:\'Lato\', sans-serif;>'+
              'Произошла ошибка! Попробуйте еще раз ввести данные.<br>'+
              '<a style=text-decoration:none; id='+TREE.after_submit_goToForm.id+' href=#>Вернуться к форме</a>'+
              '<p><img src=/land/img/cross.png style=margin-top:20px;width:152px;height:152px; alt="Заказ письма или звонка прошел успешно"/></p>'+
            '</div>';
  }

  function html_text_connection_send_email (name, email, message) {
    return 'Имя: '+name+' Email: '+email+' Сообщение: '+message;
  }

  function html_text_connection_order_call (phone) {
    return 'Телефон: '+phone;
  }

  return exports;
}());


