'use strict';

(function () {
  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;

  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElement = document.querySelectorAll('.ad-form__element');
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');
  var inputAddressForm = adForm.querySelector('#address');

  // Функция неактивного состояния страницы
  var deactivePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adFormHeader.setAttribute('disabled', '');
    mapFeatures.setAttribute('disabled', '');
    for (var i = 0; i < adFormElement.length; i++) {
      adFormElement[i].setAttribute('disabled', '');
    }
    for (i = 0; i < mapFilter.length; i++) {
      mapFilter[i].setAttribute('disabled', '');
    }
    inputAddressForm.value = window.form.getAddressForm(MAP_PIN_X, MAP_PIN_Y);
    window.form.removeListener();
    mapFilters.removeEventListener('change', window.pin.onMapFiltersChange);
  };

  // Функция активного состояния страницы
  var activePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormHeader.removeAttribute('disabled', '');
    mapFeatures.removeAttribute('disabled', '');
    for (var i = 0; i < adFormElement.length; i++) {
      adFormElement[i].removeAttribute('disabled', '');
    }
    for (i = 0; i < mapFilter.length; i++) {
      mapFilter[i].removeAttribute('disabled', '');
    }
    window.backend.load(window.pin.onSuccessLoad, window.pin.onErrorLoad);
    inputAddressForm.value = window.form.getAddressForm(MAP_PIN_X, MAP_PIN_Y);
    window.form.disableCapacityElements();
    window.form.plugListenerForm();
    mapFilters.addEventListener('change', window.pin.onMapFiltersChange);
    mapPinMain.removeEventListener('mousedown', onMapPinMousedown);
    mapPinMain.removeEventListener('keydown', onMapPinKeyEnter);
  };

  // Функции - обработчик
  var onMapPinMousedown = function (evt) {
    if (evt.button === 0) {
      activePage();
    }
  };

  var onMapPinKeyEnter = function (evt) {
    if (evt.key === 'Enter') {
      activePage();
    }
  };

  // Регистрация обработчиков
  mapPinMain.addEventListener('mousedown', onMapPinMousedown);
  mapPinMain.addEventListener('keydown', onMapPinKeyEnter);

  deactivePage();

  window.page = {
    deactivePage: deactivePage,
    onMapPinMousedown: onMapPinMousedown,
    onMapPinKeyEnter: onMapPinKeyEnter,
  };

})();
