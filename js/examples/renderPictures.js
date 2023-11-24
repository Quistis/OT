import {openPicture} from './big-pictures.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const clearPictures = () => {
  const picturesOnPage = picturesContainer.querySelectorAll('.picture');

  if (picturesOnPage) {
    picturesOnPage.forEach((picture) => picture.remove());
  }
};

const renderPicture = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
};

const renderPictures = (photos) => {

  photos.forEach((item) => {
    const thumbnail = renderPicture(item);
    picturesFragment.append(thumbnail);

    const onThumbnailClick = (evt) => {
      evt.preventDefault();

      openPicture(item);
    };

    thumbnail.addEventListener('click', onThumbnailClick);
  });

  clearPictures();
  picturesContainer.append(picturesFragment);
};

export {renderPictures};
