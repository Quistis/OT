const SCALE_STEP = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_MIN_VALUE = 25;

const scaleControlInput = document.querySelector('.scale__control--value');
const defaultImg = document.querySelector('.img-upload__preview img');


const scalePicture = (factor = 1) => {
  let scaleControlInputValue = parseInt(scaleControlInput.value, 10) + (SCALE_STEP * factor);

  if (scaleControlInputValue < SCALE_MIN_VALUE) {
    scaleControlInputValue = SCALE_MIN_VALUE;
  }

  if (scaleControlInputValue > SCALE_MAX_VALUE) {
    scaleControlInputValue = SCALE_MAX_VALUE;
  }

  scaleControlInput.value = `${scaleControlInputValue}%`;
  defaultImg.style.transform = `scale(${scaleControlInputValue / 100})`;
};

const onMinusButtonClick = () => {
  scalePicture(-1);
};

const onPlusButtonClick = () => {
  scalePicture();
};

export {onMinusButtonClick, onPlusButtonClick};
