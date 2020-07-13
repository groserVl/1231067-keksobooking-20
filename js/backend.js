'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  var setupXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = setupXHR(onSuccess, onError);

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = setupXHR(onSuccess, onError);

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
