const DEFAULT_EFFECT_LEVEL = 100;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;
const MAX_GRAYSCALE = 1;
const MAX_SEPIA = 1;
const MIN_BRIGHTNESS = 1;

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
  STEP_DECIMAL: 0.1,
};

const imgUploadForm = document.querySelector('.img-upload__form');
const effectsList = imgUploadForm.querySelector('.effects__list');
const sliderField = imgUploadForm.querySelector('.img-upload__effect-level');
const image = imgUploadForm.querySelector('.img-upload__preview img');
const sliderElement = imgUploadForm.querySelector('.effect-level__slider');
const effectLevel = imgUploadForm.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: DEFAULT_EFFECT_LEVEL,
  step: Slider.STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderField.classList.add('hidden');

const applyEffect = (effect, filter, options, unit = '') => {
  sliderField.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions(options);

  sliderElement.noUiSlider.on('update', () => {
    effectLevel.value = sliderElement.noUiSlider.get();
    image.style.filter = `${filter}(${effectLevel.value}${unit})`;
  });
};

const effectsMap = {
  'effect-none': {
    action: () => {
      sliderField.classList.add('hidden');
      image.style.filter = 'none';
    }
  },
  'effect-chrome': {
    action: () => {
      applyEffect('chrome', 'grayscale', {
        range: { min: Slider.MIN, max: MAX_GRAYSCALE },
        step: Slider.STEP_DECIMAL,
        start: MAX_GRAYSCALE
      });
    }
  },
  'effect-sepia': {
    action: () => {
      applyEffect('sepia', 'sepia', {
        range: { min: Slider.MIN, max: MAX_SEPIA },
        step: Slider.STEP_DECIMAL,
        start: MAX_SEPIA
      });
    }
  },
  'effect-marvin': {
    action: () => {
      applyEffect('marvin', 'invert', {
        range: { min: Slider.MIN, max: Slider.MAX },
        step: Slider.STEP,
        start: DEFAULT_EFFECT_LEVEL
      }, '%');
    }
  },
  'effect-phobos': {
    action: () => {
      applyEffect('phobos', 'blur', {
        range: { min: Slider.MIN, max: MAX_BLUR_VALUE },
        step: Slider.STEP_DECIMAL,
        start: MAX_BLUR_VALUE
      }, 'px');
    }
  },
  'effect-heat': {
    action: () => {
      applyEffect('heat', 'brightness', {
        range: { min: MIN_BRIGHTNESS, max: MAX_BRIGHTNESS },
        step: Slider.STEP_DECIMAL,
        start: MAX_BRIGHTNESS
      });
    }
  }
};

const onEffectsListClick = (evt) => {
  const effectId = evt.target.id;
  const effect = effectsMap[effectId];

  if (effect) {
    effect.action();
  }
};

effectsList.addEventListener('click', onEffectsListClick);

export {sliderField, image};
