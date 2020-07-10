'use strict';

(function () {

  var MAX_NUMBER_ADS = 5;

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

  var arrayAds = [];
  var render = function (arr) {
    var fragment = document.createDocumentFragment();
    var length = arr.length < MAX_NUMBER_ADS ? arr.length : MAX_NUMBER_ADS;
    for (var i = 0; i < length; i++) {
      fragment.appendChild(renderPins(arr[i]));
    }
    mapPins.appendChild(fragment);
    return mapPins;
  };

  var onSuccessLoad = function (data) {
    arrayAds = data;
    render(arrayAds);
  };

  var onMapFiltersChange = function () {
    window.filter.filterMapAds(arrayAds);
  };

  // Функция коллбэк ошибка загрузки
  var onErrorLoad = function () {
    window.form.onErrorSend();
    window.form.resetAdForm();
  };

  window.pin = {
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad,
    render: render,
    onMapFiltersChange: onMapFiltersChange
  };

})();
