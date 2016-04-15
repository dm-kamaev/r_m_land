#!/usr/local/bin/node

/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */
/*jshint expr: true */
/*jshint esnext: true */

"use strict";

// ОПИСАНИЕ СКРИПТА

// var CONF  = require('/r_m/nodejs/config.js').settings();
// var fs    = require('fs');
// var async = require(CONF.node_modules + 'async');
// var wf    = require(CONF.my_modules   + 'wf.js');
// var db    = require(CONF.my_modules   + 'usedb.js');
// var tr    = require(CONF.my_modules   + 'transform_data_from_file_or_base.js');

// var Articles = require (c.oft_modules + 'Articles.js');

// var CONTEXT = {};
// CONTEXT     = require('/r_m/nodejs/my/context.js')
//               .add_set_get(CONTEXT);

exports.get = function html () {
  // var ar = [
  //   {
  //     img: '/r_m_land/img/red theme/High technology2.png',
  //     h3: 'Передовые технологии',
  //     text: ''
  //   },
  //   {},
  //   {},
  //   {},
  // ];

  return `
    <!-- advantages -->
    <div style=margin-top:100px>
      <div class=advantages_item11>
        <div style="border:1px solid red;display:inline-block;width:35%;vertical-align:top;text-align:center;">
          <img style=width:70%;border-radius:50px; src="/r_m_land/img/red theme/High technology2.png">
        </div>
        <div style="border:1px solid red;display:inline-block;width:63%;vertical-align:top;">
          <h3 class=advantages_title>Передовые технологии</h3>
          <p class=advantages_text>
            Наши технологические решения основаны на web-программировании, что обеспечивает удобный доступ (достаточно всего лишь открыть браузер) и приятный, дружественный интерфейс. При этом вы можете заказать:
             - офлайн-приложение для ограниченного круга пользователей;
            - приложение с доступом в интернет, собирающее и обрабатывающее важную для вас информацию, позволяющее взаимодействовать с клиентами и контрагентами.
          </p>
        </div>
      </div>
    </div>
    <div style=margin-top:100px>
      <div style="margin:0 auto;padding:50px 5% 50px 5%;background:#F4F4F4">
        <div style="border:1px solid red;display:inline-block;width:35%;vertical-align:top;text-align:center;">
          <img style=width:70%;border-radius:50px; src="/r_m_land/img/red theme/IT developers.png">
        </div>
        <div style="border:1px solid red;display:inline-block;width:63%;vertical-align:top;">
          <h3 class=advantages_title>Профессиональная команда разработчиков</h3>
          <p class=advantages_text>
           Наши программисты обладают большим опытом работы с высоконагруженными системами, большими базами данных и сложными алгоритмами, являются специалистами высокого класса по разработке клиентской и серверной части web-ресурсов.
          </p>
        </div>
      </div>
    </div>
    <div style=margin-top:100px>
      <div style="margin:0 auto;padding:50px 5% 50px 5%;background:#F4F4F4">
        <div style="border:1px solid red;display:inline-block;width:35%;vertical-align:top;text-align:center;">
          <img style=width:70%;border-radius:50px; src="/r_m_land/img/red theme/experts.png">
        </div>
        <div style="border:1px solid red;display:inline-block;width:63%;vertical-align:top;">
          <h3 class=advantages_title>Наличие профильных экспертов</h3>
          <p class=advantages_text>
           В нашей команде есть эксперты по управленческому учету и контролю затрат на предприятии,  бухгалтерскому учету и отчетности, банковской деятельности,  финансовому анализу и др.
          </p>
        </div>
      </div>
    </div>
    <div style=margin-top:100px>
      <div style="margin:0 auto;padding:50px 5% 50px 5%;background:#F4F4F4">
        <div style="border:1px solid red;display:inline-block;width:35%;vertical-align:top;text-align:center;">
          <img style=width:70%;border-radius:50px; src="/r_m_land/img/red theme/individual approach.png">
        </div>
        <div style="border:1px solid red;display:inline-block;width:63%;vertical-align:top;">
          <h3 class=advantages_title>Индивидуальный подход</h3>
          <p class=advantages_text>
            Мы умеем слушать наших клиентов и находим оптимальные IT-решения, учитывающие существующую IT-инфраструктуру компании и логику затрагиваемых бизнес-процессов.
          </p>
        </div>
      </div>
    </div>
    <div style=margin-top:100px>
      <div style="margin:0 auto;padding:50px 5% 50px 5%;background:#F4F4F4">
        <div style="border:1px solid red;display:inline-block;width:35%;vertical-align:top;text-align:center;">
          <img style=width:70%;border-radius:50px; src="/r_m_land/img/red theme/openess.jpg">
        </div>
        <div style="border:1px solid red;display:inline-block;width:63%;vertical-align:top;">
          <h3 class=advantages_title>Открытость</h3>
          <p class=advantages_text>
             Нам интересно работать с разными по размеру и профилю компаниями. Мы заинтересованы в долгосрочном сотрудничестве и, соответственно, в развитии вашего бизнеса. Именно поэтому мы предлагаем вам оптимальные цены на наши услуги.
          </p>
        </div>
      </div>
    </div>
    <div style=margin-top:100px>
      <div style="margin:0 auto;padding:50px 5% 50px 5%;background:#F4F4F4">
        <div style="border:1px solid red;display:inline-block;width:35%;vertical-align:top;text-align:center;">
          <img style="width:70%;" src="/r_m_land/img/red theme/support_2_grey.jpg">
        </div>
        <div style="border:1px solid red;display:inline-block;width:63%;vertical-align:top;">
          <h3 class=advantages_title>Поддержка</h3>
          <p class=advantages_text>
             Мы гарантируем качество наших продуктов и предоставляем бесплатную техническую поддержку в течение года после начала эксплуатации готового продукта.
          </p>
        </div>
      </div>
    </div>
    <!-- advantages -->
  `;
};

