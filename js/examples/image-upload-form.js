import { isEscapeKey } from './util.js';
import {onMinusButtonClick, onPlusButtonClick} from './scale-photo.js';
import {getErrorMessage, validateHashtags} from './hastags-validation.js';
import {sliderField, image} from './apply-effects.js';
import {onSuccess, onFail} from './status-messages.js';
import {uploadData} from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const COMMENT_FIELD_ERROR = 'Длина комментария больше 140 символов';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditForm = imgUploadForm.querySelector('.img-upload__overlay');
const imgEditHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const imgEditCommentArea = imgUploadForm.querySelector('.text__description');
const imgEditCloseButton = imgUploadForm.querySelector('.img-upload__cancel');
const imgEditSubmitButton = imgUploadForm.querySelector('.img-upload__submit');
const minusButton = imgUploadForm.querySelector('.scale__control--smaller');
const plusButton = imgUploadForm.querySelector('.scale__control--bigger');
const imgPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsPreview = imgUploadForm.querySelectorAll('.effects__preview');

const pristine = new Pristine(imgUploadForm , {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const resetForm = () => {
  imgUploadForm.reset();
  pristine.reset();

  imgUploadInput.value = '';
  imgEditHashtagsInput.value = '';
  imgEditCommentArea.value = '';
  imgEditSubmitButton.disabled = false;

  sliderField.classList.add('hidden');
  image.style.transform = 'scale(1)';
  image.style.filter = 'none';
};

const onEscKeydown = (evt) => {

  if (isEscapeKey(evt) &&
  !evt.target.classList.contains('text__hashtags') &&
  !evt.target.classList.contains('text__description') &&
  document.querySelector('.error') === null) {
    evt.preventDefault();

    closeImgEditModal();
  }
};

const onImgEditCloseButtonClick = () => {
  closeImgEditModal();
};

function closeImgEditModal () {
  imgEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetForm();

  imgEditCloseButton.removeEventListener('click', onImgEditCloseButtonClick);
  document.removeEventListener('keydown', onEscKeydown);
}

const openImgEditModal = () => {
  imgEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const onImgUploadButtonChange = () => {
  openImgEditModal();

  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);

    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${imgPreview.src})`;
    });
  }

  imgEditCloseButton.addEventListener('click', onImgEditCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};

imgUploadInput.addEventListener('change', onImgUploadButtonChange);

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

pristine.addValidator(imgEditHashtagsInput, validateHashtags, getErrorMessage);

const validateCommentMessage = (value) => value.length <= 140;

pristine.addValidator(imgEditCommentArea, validateCommentMessage, COMMENT_FIELD_ERROR);

const ohHashtagInput = () => {
  imgEditSubmitButton.disabled = !pristine.validate();
};

imgEditHashtagsInput.addEventListener('input', ohHashtagInput);

const blockSubmitButton = () => {
  imgEditSubmitButton.disabled = true;
};

const unblockSubmitButton = () => {
  imgEditSubmitButton.disabled = false;
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if(isValid) {
    const formData = new FormData(evt.target);
    blockSubmitButton();

    uploadData(onSuccess, onFail, 'POST', formData);
  }
});

export {closeImgEditModal, unblockSubmitButton};
