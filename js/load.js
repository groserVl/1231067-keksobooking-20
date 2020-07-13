'use strict';

(function () {
  var WIDTH_PHOTO_PREVIEW = 70;
  var HEIGHT_PHOTO_PREVIEW = 70;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarForm = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesForm = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');
  var matches;

  // Функция фильтрующая имена файлов по их расширению
  var filterNameFiles = function (file) {
    var fileName = file.name.toLowerCase();

    matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    return matches;
  };


  // Функция меняющая аваторку на новую
  var onAvatorChange = function () {
    var file = avatarForm.files[0];

    filterNameFiles(file);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  // Функция загружающая фотографии жилища
  var onImagesChange = function () {
    var file = imagesForm.files[0];

    filterNameFiles(file);
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photoElement = document.createElement('img');
        photoElement.width = WIDTH_PHOTO_PREVIEW;
        photoElement.height = HEIGHT_PHOTO_PREVIEW;
        photoElement.alt = 'Фото жилища';
        photoElement.src = reader.result;
        photoPreview.appendChild(photoElement);
      });

      reader.readAsDataURL(file);
    }
  };

  var loadImagesListener = function () {
    avatarForm.addEventListener('change', onAvatorChange);
    imagesForm.addEventListener('change', onImagesChange);
  };

  var removeImagesListener = function () {
    avatarForm.removeEventListener('change', onAvatorChange);
    imagesForm.removeEventListener('change', onImagesChange);
  };

  window.load = {
    loadImagesListener: loadImagesListener,
    removeImagesListener: removeImagesListener
  };

})();
