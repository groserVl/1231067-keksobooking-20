'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var renderPins = function (pin) {
    var pins = pinTemplate.cloneNode(true);
    pins.style.left = pin.location.x + 'px';
    pins.style.top = pin.location.y + 'px';
    pins.querySelector('img').src = pin.author.avatar;
    pins.querySelector('img').alt = pin.offer.title;
    pins.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.closePopupCard();
      window.card.renderCards(pin);
      document.addEventListener('keydown', window.card.onPopupCloseKeydown);
    });
    return pins;
  };

  // Функция коллбэк успешной загрузки
  var onSuccessLoad = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPins(arr[i]));
    }
    mapPins.appendChild(fragment);
    return mapPins;
  };

  // Функция коллбэк ошибка загрузки
  var onErrorLoad = function (errorMessage) {
    var nodeElemetn = document.createElement('div');
    nodeElemetn.classList.add('error-load-message');
    nodeElemetn.style = 'z-index: 100; margin: 0 auto; padding: 10px 0; color: #fff; text-align: center; background-color: tomato;';
    nodeElemetn.style.position = 'fixed';
    nodeElemetn.style.width = '100%';
    nodeElemetn.style.left = 0;
    nodeElemetn.style.right = 0;
    nodeElemetn.style.fontSize = '40px';

    nodeElemetn.textContent = errorMessage;
    document.body.insertAdjacentElement('beforebegin', nodeElemetn);
  };

  window.pin = {
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad
  };

})();
