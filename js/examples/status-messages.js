import { isEscapeKey } from './util.js';
import { closeImgEditModal, unblockSubmitButton } from './image-upload-form.js';

const DATA_ERROR_SHOWN_TIME = 5000;

const dataErrorMessage = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const closeMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    closeMessage();

    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onMouseButtonClick);

    document.querySelector('.img-upload__submit').blur();
  }
};

function onMouseButtonClick (evt) {
  if (!evt.target.classList.contains('error__inner') &&
      !evt.target.classList.contains('error__title') &&
      !evt.target.classList.contains('success__inner') &&
      !evt.target.classList.contains('success__title')) {
    closeMessage();

    document.removeEventListener('click', onMouseButtonClick);
    document.removeEventListener('keydown', onEscKeydown);
  }
}

const showStatusMessage = (messageType) => {
  const fragment = document.createDocumentFragment();

  fragment.append(messageType);
  document.body.append(fragment);

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onMouseButtonClick);
};

const onSuccess = () => {
  showStatusMessage(successMessage);
  unblockSubmitButton();
  closeImgEditModal();
};

const onFail = () => {
  showStatusMessage(errorMessage);
  unblockSubmitButton();
};

const showDataErrorMessage = () => {
  const fragment = document.createDocumentFragment();

  fragment.append(dataErrorMessage);
  document.body.append(fragment);

  setTimeout(() => {
    dataErrorMessage.remove();
  }, DATA_ERROR_SHOWN_TIME);
};

export {showDataErrorMessage, onSuccess, onFail};
