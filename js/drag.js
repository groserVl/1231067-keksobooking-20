'use strict';

(function () {

  var PIN_WIDTH = 62;
  var HIGHEST_Y = 630;
  var LOWEST_Y = 130;
  var PIN_HEIGHT = 84;

  var mapPinMain = document.querySelector('.map__pin--main');
  var offsetWidth = document.querySelector('.map').offsetWidth;
  var inputAddressForm = document.querySelector('#address');

  var onMapPinMousedown = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMapPinMousemove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY

        };

        if (mapPinMain.offsetLeft - shift.x <= offsetWidth - PIN_WIDTH / 2 && mapPinMain.offsetLeft - shift.x >= -PIN_WIDTH / 2) {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }

        if (mapPinMain.offsetTop - shift.y < HIGHEST_Y - PIN_HEIGHT && mapPinMain.offsetTop - shift.y > LOWEST_Y - PIN_HEIGHT) {

          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }
        inputAddressForm.value = window.form.getAddressForm(mapPinMain.style.left, mapPinMain.style.top);
      };

      var onMapPinMouseup = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMapPinMousemove);
        document.removeEventListener('mouseup', onMapPinMouseup);
      };

      document.addEventListener('mousemove', onMapPinMousemove);
      document.addEventListener('mouseup', onMapPinMouseup);
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMousedown);

})();
