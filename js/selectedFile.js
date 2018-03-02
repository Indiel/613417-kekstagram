'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFile = document.querySelector('#upload-file');
  var imagePreview = document.querySelector('.effect-image-preview');

  window.selectFile = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

})();
