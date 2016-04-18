#!/usr/local/bin/node

/*jshint sub: true*/
/*jshint loopfunc: true */
/*jshint newcap: false */
/*jshint multistr: true */

"use strict";

// Яндекс Метрика, Google Ananlytics, Rambler-top 100
var CONF = require('/r_m_land/config.js').settings();

exports.get = function () {
  var res = '';
  if (CONF.metrica === 'on') {
    res += yandex_metrica();
    res += google_analytics();
    res += rambler_top_100();
  }
  return res;
}


function yandex_metrica () {
  return '<!-- Yandex.Metrika counter --><script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter34060600 = new Ya.Metrika({ id:34060600, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="https://mc.yandex.ru/watch/34060600" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter -->';
}


function google_analytics () {
  return "<script> (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-71026691-1', 'auto');ga('send', 'pageview');</script>";
}

// TODO: Выбросить в будущем картинку
// style="display: none;"
function rambler_top_100 () {
  return '<div id="Rambler-counter" style="display:none;"><!-- Внимание! В этом div\'е не нельзя размещать пользовательский контент: он будет затерт! --><noscript><a href="http://top100.rambler.ru/navi/3149085/"><img style="display:none;" src="http://counter.rambler.ru/top100.cnt?3149085" alt="Rambler\'s Top100"/></a></noscript></div><!-- Код скрипта должен быть размещен строго ниже контейнера для логотипа (div c id="Rambler-counter") --><script type="text/javascript">var _top100q = _top100q || [];_top100q.push(["setAccount", "3149085"]);_top100q.push(["trackPageviewByLogo", document.getElementById("Rambler-counter")]);(function(){var pa = document.createElement("script");pa.type = "text/javascript";pa.async = true;pa.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//st.top100.ru/top100/top100.js";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(pa, s);})();</script>';
}
