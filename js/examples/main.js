import {loadData} from './api.js';
import {renderPictures} from './renderPictures.js';
import {showDataErrorMessage} from './status-messages.js';
import './filters.js';

let photos = [];

const onSuccess = (data) => {

  photos = data.slice();

  renderPictures(photos);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

};

loadData(onSuccess, showDataErrorMessage);

export {photos};
