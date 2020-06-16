'use strict';

// Константы
var NUMBER_ADS = 8;
var HIGHEST_Y = 630;
var LOWEST_Y = 130;
var LOWEST_X = 0;
var PRICE_MAX = 10000;
var PRICE_MIN = 500;
var TYPE_BUILDING = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MAX = 5;
var GUESTS_MIN = 1;
var CHEKING_TIME = ['12: 00', '13: 00', '14: 00'];
var CHEKOUT_TIME = ['12: 00', '13: 00', '14: 00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_X = 570;
var MAP_PIN_Y = 375;
var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;

var offsetWidth = document.querySelector('.map__pins').offsetWidth;
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Временное скрытие класса
// document.querySelector('.map').classList.remove('map--faded');

// Функция округления и генерации случайных чисел в диапазоне
var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * Math.floor(max - min + 1));
};

// Функция вычисления случайной длинны массива
var getRandomLength = function (arr) {
  var randomLength = arr.slice(getRandomNumber(0, arr.length - 1));
  return randomLength;
};

// Функция создания массива объявлений
var creatMockAds = function (lengthArray) {
  var mockAds = [];
  for (var i = 0; i < lengthArray; i++) {
    mockAds.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': 'Заголовок предложения',
            'address': getRandomNumber(LOWEST_X, offsetWidth) + ', ' + getRandomNumber(LOWEST_Y, HIGHEST_Y),
            'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
            'type': TYPE_BUILDING[getRandomNumber(0, 3)],
            'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
            'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
            'checkin': CHEKING_TIME[getRandomNumber(0, 2)],
            'checkout': CHEKOUT_TIME[getRandomNumber(0, 2)],
            'features': getRandomLength(FEATURES),
            'description': 'Описание',
            'photos': getRandomLength(PHOTOS)
          },
          'location': {
            'x': getRandomNumber(LOWEST_X, offsetWidth),
            'y': getRandomNumber(LOWEST_Y, HIGHEST_Y)
          }
        }
    );
  }
  return mockAds;
};

// Создаём дом элементы и переносим данные из массива
var renderPins = function (pin) {
  var pins = pinTemplate.cloneNode(true);
  pins.style.left = pin.location.x + 'px';
  pins.style.top = pin.location.y + 'px';
  pins.querySelector('img').src = pin.author.avatar;
  pins.querySelector('img').alt = pin.offer.title;
  return pins;
};

var renderAds = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPins(arr[i]));
  }
  mapPins.appendChild(fragment);
};

// renderAds(creatMockAds(NUMBER_ADS));
// ---------------------------------------------
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// var filtersContainer = document.querySelector('.map__filters-container');
// // Объект(словарь) перевод на русский язык
// var translationTypes = {
//   flat: 'Квартира',
//   bungalo: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец'
// };
// var cardElement = cardTemplate.cloneNode(true);
// filtersContainer.before(cardElement);

// // Функция скрывающая определённый блок
// var getHidden = function (selector) {
//   cardElement.querySelector(selector).setAttribute('hidden', 'true');
//   return cardElement;
// };

// //  Функция создающая варианты слов с различными окончаниями
// var getNumberRooms = function (i) {
//   var a;
//   if (i === 1) {
//     a = ' комната для';
//   } else if (i > 1 && i <= 4) {
//     a = ' комнаты для';
//   } else {
//     a = ' комнат для';
//   }
//   return a;
// };

// // Функция создающая заново список удобств в арендованных объектах
// var getFeatures = function (content, features) {
//   content.innerHTML = '';
//   for (var i = 0; i < features.length; i++) {
//     var itemFeatures = document.createElement('li');
//     itemFeatures.classList.add('popup__feature', 'popup__feature--' + features[i]);

//     content.appendChild(itemFeatures);
//   }
// };

// // Функция создающая заново список фотографий
// var getPhotos = function (content, photos) {
//   content.innerHTML = '';
//   for (var i = 0; i < photos.length; i++) {
//     var itemPhotos = document.createElement('img');
//     itemPhotos.classList.add('popup__photo');
//     itemPhotos.src = photos[i];
//     itemPhotos.width = 45;
//     itemPhotos.height = 40;
//     itemPhotos.alt = 'Фотография жилья';
//     content.appendChild(itemPhotos);
//   }
// };

// // Функция создающая картачку объявления
// var renderCards = function (arr) {
//   var numberGuests = arr.offer.guests === 1 ? ' гостя' : ' гостей';

//   if (arr.offer.title) {
//     cardElement.querySelector('.popup__title').textContent = arr.offer.title;
//   } else {
//     getHidden('.popup__title');
//   }

//   if (arr.offer.address) {
//     cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
//   } else {
//     getHidden('.popup__text--address');
//   }

//   if (arr.offer.price) {
//     cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + ' ₽/ночь';
//   } else {
//     getHidden('.popup__text--price');
//   }

//   if (arr.offer.type) {
//     cardElement.querySelector('.popup__type').textContent = translationTypes[arr.offer.type];
//   } else {
//     getHidden('.popup__type');
//   }

//   if (arr.offer.rooms || arr.offer.guests) {
//     cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + getNumberRooms(arr.offer.rooms) + ' ' + arr.offer.guests + numberGuests;
//   } else {
//     getHidden('.popup__text--capacity');
//   }

//   if (arr.offer.checkin && arr.offer.checkout) {
//     cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
//   } else {
//     getHidden('.popup__text--time');
//   }

//   if (arr.offer.features) {
//     getFeatures(cardElement.querySelector('.popup__features'), arr.offer.features);
//   } else {
//     getHidden('.popup__features');
//   }

//   if (arr.offer.description) {
//     cardElement.querySelector('.popup__description').textContent = arr.offer.description;
//   } else {
//     getHidden('.popup__description');
//   }

//   if (arr.offer.photos) {
//     getPhotos(cardElement.querySelector('.popup__photos'), arr.offer.photos);
//   } else {
//     getHidden('.popup__photo');
//   }

//   cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
// };

// renderCards(creatMockAds(NUMBER_ADS)[0]);

// ----------------------------------------------------
var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilter = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var inputAddressForm = adForm.querySelector('#address');
var capacityForm = adForm.querySelector('#capacity');
var roomNumberForm = adForm.querySelector('#room_number');

// Отключение элементов формы
var disabledElementsForms = function () {
  adFormHeader.setAttribute('disabled', '');
  mapFeatures.setAttribute('disabled', '');
  for (var i = 0; i < adFormElement.length; i++) {
    adFormElement[i].setAttribute('disabled', '');
  }
  for (i = 0; i < mapFilter.length; i++) {
    mapFilter[i].setAttribute('disabled', '');
  }
};
disabledElementsForms();

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
inputAddressForm.value = getAddressForm();

// Функция отменяющая неактивное состояния страницы и
// ввод адреса в поле инпута формы
var getActivePage = function () {
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
  inputAddressForm.value = getAddressForm();
  compareCapacityRooms();
  renderAds(creatMockAds(NUMBER_ADS));
  mapPinMain.removeEventListener('mousedown', onMapPinMousedown);
  mapPinMain.removeEventListener('keydown', onMapPinKeyEnter);
};

// Функции - обработчик
var onMapPinMousedown = function (evt) {
  if (evt.button === 0) {
    getActivePage();
  }
};

var onMapPinKeyEnter = function (evt) {
  if (evt.key === 'Enter') {
    getActivePage();
  }
};

// Регистрация обработчиков
mapPinMain.addEventListener('mousedown', onMapPinMousedown);

mapPinMain.addEventListener('keydown', onMapPinKeyEnter);

// Валидация соответствия комнат и гостей
// Функция сравнения гостей и комнат
var compareCapacityRooms = function () {
  var numberRooms = roomNumberForm.value;
  var numberCapacity = capacityForm.value;
  var visualizeInvalid = function () {

    capacityForm.setCustomValidity('Невозможно выбрать этот вариант!!! Выберите другой');
    capacityForm.style.border = '5px solid tomato';
  };

  if (numberRooms === '100' && numberCapacity !== '0') {
    visualizeInvalid();
    capacityForm.reportValidity();

  } else if (numberRooms < numberCapacity) {
    visualizeInvalid();
    capacityForm.reportValidity();

  } else if (numberCapacity === '0' && numberRooms !== '100') {
    visualizeInvalid();
    capacityForm.reportValidity();

  } else {
    capacityForm.setCustomValidity('');
    capacityForm.style.border = 'none';
  }
};

// Функция обработчик
var onCapacityFormChange = function () {
  compareCapacityRooms();
};

// Регистрация обработчика
capacityForm.addEventListener('change', onCapacityFormChange);

roomNumberForm.addEventListener('change', onCapacityFormChange);

