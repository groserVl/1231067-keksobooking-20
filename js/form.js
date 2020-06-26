'use strict';

(function () {

  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var titleAdForm = adForm.querySelector('#title');
  var capacityForm = adForm.querySelector('#capacity');
  var roomNumberForm = adForm.querySelector('#room_number');
  var typeForm = adForm.querySelector('#type');
  var pricesForm = adForm.querySelector('#price');
  var adFormTimein = document.querySelector('#timein');
  var adFormTimeout = document.querySelector('#timeout');
  var timeEntryAndExit = adForm.querySelector('.ad-form__element--time');

  // Минимальная цена типов жилья
  var minPricesOfTypes = {
    bungalo: 0,
    house: 5000,
    flat: 1000,
    palace: 10000,
  };

  // Функция подключения обработчиков для валидации формы
  var plugListener = function () {
    adForm.addEventListener('submit', onAdFormSubmit);
    titleAdForm.addEventListener('input', onTitleFormInput);
    capacityForm.addEventListener('change', onCapacityFormChange);
    roomNumberForm.addEventListener('change', onCapacityFormChange);
    typeForm.addEventListener('change', onTypeFormChange);
    timeEntryAndExit.addEventListener('change', onFormElementTimeChange);
  };

  // Заполнение поле адреса в форме
  var getAddressForm = function () {
    var x;
    var y;
    if ((map.classList.contains('map--faded'))) {
      x = MAP_PIN_X + PIN_WIDTH / 2;
      y = MAP_PIN_Y + PIN_WIDTH / 2;
    } else {
      x = MAP_PIN_X + PIN_WIDTH / 2;
      y = MAP_PIN_Y + PIN_HEIGHT;
    }
    var locationXY = x + ' ' + y;

    return locationXY;
  };

  // Валидация соответствия комнат и гостей
  // Функция установки диактивации элементов выбора кол-ва гостей в форме
  var disableCapacityElements = function () {
    for (var i = 0; i < capacityForm.children.length; i++) {
      capacityForm.children[i].disabled = true;
    }
    capacityForm.children[2].disabled = false;
    capacityForm.children[2].selected = true;
  };
  // Функция сравнения гостей и комнат
  var onCapacityFormChange = function () {
    for (var i = 0; i < capacityForm.length; i++) {
      switch (roomNumberForm.value) {
        case '1':
          capacityForm.children[i].disabled = true;
          capacityForm.children[2].disabled = false;
          capacityForm.children[2].selected = true;
          break;
        case '2':
          capacityForm.children[i].disabled = true;
          capacityForm.children[1].disabled = false;
          capacityForm.children[2].disabled = false;
          capacityForm.children[2].selected = true;
          break;
        case '3':
          capacityForm.children[i].disabled = true;
          capacityForm.children[2].disabled = false;
          capacityForm.children[1].disabled = false;
          capacityForm.children[0].disabled = false;
          capacityForm.children[2].selected = true;
          break;
        case '100':
          capacityForm.children[i].disabled = true;
          capacityForm.children[3].disabled = false;
          capacityForm.children[3].selected = true;
          break;
      }
    }
  };

  // Валидация поля заголовка объявления
  var visualizeInvalidTitle = function (evt) {
    evt.target.style.border = '5px solid tomato';
    evt.target.reportValidity();
  };

  var onTitleFormInput = function (evt) {
    if (evt.target.value.length === 0) {
      visualizeInvalidTitle(evt);
      evt.target.setCustomValidity('Поле должно быть заполнено');
    } else if (evt.target.value.length < 30) {
      visualizeInvalidTitle(evt);
      evt.target.setCustomValidity('Нужно еще ' + (30 - evt.target.value.length) + ' символов');
    } else if (evt.target.value.length > 100) {
      visualizeInvalidTitle(evt);
      evt.target.setCustomValidity('Удалите ' + (evt.target.value.length - 100) + ' символов');
    } else {
      evt.target.setCustomValidity('');
      evt.target.style.border = 'none';
    }
  };

  var onTypeFormChange = function () {
    setMinPricesOfTypes();
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    adForm.submit();
  };

  // Функция установки минимальных цен
  var setMinPricesOfTypes = function () {
    pricesForm.min = pricesForm.placeholder = minPricesOfTypes[typeForm.value];
  };

  //  Функция валидации времени заезда и выезда
  var onFormElementTimeChange = function (evt) {
    if (evt.target.name === 'timein') {
      adFormTimeout.value = adFormTimein.value;
    } else {
      adFormTimein.value = adFormTimeout.value;
    }
  };

  window.form = {
    getAddressForm: getAddressForm,
    disableCapacityElements: disableCapacityElements,
    plugListener: plugListener
  };

})();
