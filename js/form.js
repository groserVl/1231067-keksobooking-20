'use strict';

(function () {

  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;
  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;
  var MIN_LENGTH_TEXT = 30;
  var MAX_LENGTH_TEXT = 100;

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var titleAdForm = adForm.querySelector('#title');
  var capacityForm = adForm.querySelector('#capacity');
  var roomNumberForm = adForm.querySelector('#room_number');
  var typeForm = adForm.querySelector('#type');
  var pricesForm = adForm.querySelector('#price');
  var adFormTimein = document.querySelector('#timein');
  var adFormTimeout = document.querySelector('#timeout');
  var inputAddressForm = adForm.querySelector('#address');
  var timeEntryAndExit = adForm.querySelector('.ad-form__element--time');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorButton = errorTemplate.querySelector('.error__button');

  // Минимальная цена типов жилья
  var minPricesOfTypes = {
    bungalo: 0,
    house: 5000,
    flat: 1000,
    palace: 10000,
  };

  // Функция подключения обработчиков
  var addFormListeners = function () {
    adForm.addEventListener('submit', onAdFormSubmit);
    titleAdForm.addEventListener('input', onTitleFormInput);
    roomNumberForm.addEventListener('change', onCapacityFormChange);
    typeForm.addEventListener('change', onTypeFormChange);
    timeEntryAndExit.addEventListener('change', onFormElementTimeChange);
    adFormReset.addEventListener('click', onAdFormReset);
  };

  // Функция отключение обработчиков
  var removeFormListeners = function () {
    adForm.removeEventListener('submit', onAdFormSubmit);
    titleAdForm.removeEventListener('input', onTitleFormInput);
    roomNumberForm.removeEventListener('change', onCapacityFormChange);
    typeForm.removeEventListener('change', onTypeFormChange);
    timeEntryAndExit.removeEventListener('change', onFormElementTimeChange);
    adFormReset.removeEventListener('click', onAdFormReset);
  };

  // Заполнение поле адреса в форме
  var getAddressForm = function (mapPinX, mapPinY) {
    var x;
    var y;
    if ((map.classList.contains('map--faded'))) {
      x = parseInt(mapPinX, 10) + PIN_WIDTH / 2;
      y = parseInt(mapPinY, 10) + PIN_WIDTH / 2;
    } else {
      x = parseInt(mapPinX, 10) + PIN_WIDTH / 2;
      y = parseInt(mapPinY, 10) + PIN_HEIGHT;
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
    } else if (evt.target.value.length < MIN_LENGTH_TEXT) {
      visualizeInvalidTitle(evt);
      evt.target.setCustomValidity('Нужно еще ' + (MIN_LENGTH_TEXT - evt.target.value.length) + ' символов');
    } else if (evt.target.value.length > MAX_LENGTH_TEXT) {
      visualizeInvalidTitle(evt);
      evt.target.setCustomValidity('Удалите ' + (evt.target.value.length - MAX_LENGTH_TEXT) + ' символов');
    } else {
      evt.target.setCustomValidity('');
      evt.target.style.border = 'none';
    }
  };

  var onTypeFormChange = function () {
    setMinPricesOfTypes();
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

  // Функция убирает пины с карты
  var removePins = function () {
    var pinsAds = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsAds.forEach(function (item) {
      item.remove();
    });
  };

  // Функция сброса и диактивирующая страницу
  var resetAdForm = function () {
    window.page.deactivatePage();
    window.card.closePopup();
    window.load.resetImages();
    removePins();
    adForm.reset();
    pricesForm.min = pricesForm.placeholder = minPricesOfTypes[typeForm.value];
    inputAddressForm.value = getAddressForm(MAP_PIN_X, MAP_PIN_Y);
    mapPinMain.style.left = MAP_PIN_X + 'px';
    mapPinMain.style.top = MAP_PIN_Y + 'px';

    mapPinMain.addEventListener('mousedown', window.page.onMapPinMousedown);
    mapPinMain.addEventListener('keydown', window.page.onMapPinKeyEnter);
  };

  // Функция коллбэк успешной отправки формы
  var onSuccessSend = function () {
    main.appendChild(successTemplate);
    resetAdForm();

    document.addEventListener('keydown', onEscSuccessKeydown);
    successTemplate.addEventListener('click', onSuccessClick);
  };

  var onAdFormReset = function () {
    resetAdForm();
  };

  // Функция коллбэк ошибочной отправки формы
  var onErrorSend = function () {
    main.appendChild(errorTemplate);
    errorButton.focus();

    document.addEventListener('keydown', onEscKeydown);
    errorTemplate.addEventListener('click', onErrorClick);
    errorButton.addEventListener('click', onErrorButtonClick);
  };

  //  Функция закрытия окна успешной отправки формы
  var closeSuccessTemplate = function () {
    successTemplate.remove();

    document.removeEventListener('keydown', onEscSuccessKeydown);
    successTemplate.removeEventListener('click', onSuccessClick);
  };

  // Функция закрытия окна ошибки
  var closeErrorTemplate = function () {
    errorTemplate.remove();

    document.removeEventListener('keydown', onEscKeydown);
    errorTemplate.removeEventListener('click', onErrorClick);
  };

  // Фунции обработчики зыкрытия окна успешной отправки формы
  var onEscSuccessKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closeSuccessTemplate();
    }
  };

  var onSuccessClick = function () {
    if (successTemplate) {
      closeSuccessTemplate();
    }
  };

  // Фунции обработчики зыкрытия окна ошибки
  var onEscKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closeErrorTemplate();
    }
  };

  var onErrorClick = function () {
    if (errorTemplate) {
      closeErrorTemplate();
    }
  };

  var onErrorButtonClick = function () {
    closeErrorTemplate();
  };

  // Функция отправляющая форму объявления
  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onSuccessSend, onErrorSend);
  };

  window.form = {
    getAddressForm: getAddressForm,
    disableCapacityElements: disableCapacityElements,
    addFormListeners: addFormListeners,
    removeFormListeners: removeFormListeners,
    onErrorSend: onErrorSend,
    resetAdForm: resetAdForm,
    removePins: removePins
  };

})();
