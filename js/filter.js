'use strict';

(function () {
  var HOUSING_PRICE_LOW = 10000;
  var HOUSING_PRICE_TOP = 50000;

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFeatures = document.querySelectorAll('.map__checkbox');


  //  Функция фильтрации типов жилья
  var filterHousingType = function (arr) {

    if (housingType.value !== 'any') {
      arr = arr.filter(function (item) {
        return item.offer.type === housingType.value;
      });
    }
    return arr;
  };

  //  Функция фильтрации цен на жильё
  var filterHousingPrice = function (arr) {
    if (housingPrice.value !== 'any') {
      switch (housingPrice.value) {
        case 'low':
          arr = arr.filter(function (item) {
            return item.offer.price < HOUSING_PRICE_LOW;
          });
          break;
        case 'middle':
          arr = arr.filter(function (item) {
            return item.offer.price <= HOUSING_PRICE_TOP && item.offer.price >= HOUSING_PRICE_LOW;
          });
          break;
        case 'high':
          arr = arr.filter(function (item) {
            return item.offer.price > HOUSING_PRICE_TOP;
          });
          break;
      }
    }
    return arr;
  };

  //  Функция фильтрации количество комнат
  var filterHousingRooms = function (arr) {

    if (housingRooms.value !== 'any') {
      arr = arr.filter(function (item) {
        return item.offer.rooms === parseInt(housingRooms.value, 10);
      });
    }
    return arr;
  };

  //  Функция фильтрации количество гостей
  var filterHousingGuests = function (arr) {
    if (housingGuests.value !== 'any') {
      arr = arr.filter(function (item) {
        return item.offer.guests === parseInt(housingGuests.value, 10);
      });
    }
    return arr;
  };

  // Функция фильтрации преимуществ

  var filterFeatures = function (arr) {
    var arrayFeatures = [];
    mapFeatures.forEach(function (item) {
      if (item.checked) {
        arrayFeatures.push(item);
      }
    });

    arr = arr.filter(function (item) {
      return arrayFeatures.every(function (feature) {
        return item.offer.features.includes(feature.value);
      });
    });
    return arr;
  };

  // Функция запускающая процесс фильтрации
  var filterMapAds = function (arrayAds) {
    var filterData = arrayAds;

    filterData = filterHousingType(filterData);
    filterData = filterHousingPrice(filterData);
    filterData = filterHousingRooms(filterData);
    filterData = filterHousingGuests(filterData);
    filterData = filterFeatures(filterData);

    window.form.removePins();
    window.card.closePopup();
    window.pin.renderAds(filterData);
  };

  window.filter = {
    filterMapAds: filterMapAds
  };

})();
