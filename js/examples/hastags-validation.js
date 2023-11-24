const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

let errorMessage = '';
const getErrorMessage = () => errorMessage;

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtags = (hashtags) => {
  const hashtagsString = hashtags.toLowerCase().trim();
  const splitHashtags = hashtagsString.split(/\s+/);

  if (!hashtagsString) {
    return true;
  }

  if (splitHashtags.length === 0) {
    return true;
  }

  const rules = [
    {
      check: splitHashtags.some((hashtag) => hashtag.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: splitHashtags.some((hashtag) => hashtag[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: splitHashtags.some((hashtag, index, array) => array.includes(hashtag, index + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: splitHashtags.some((hashtag) => hashtag.length > MAX_SYMBOLS),
      error: `Длинна хэш-тега не должна превышать ${MAX_SYMBOLS} символов, включая решетку`
    },
    {
      check: splitHashtags.length > MAX_HASHTAGS,
      error: `К фото нельзя добавлять более ${MAX_HASHTAGS} хэш-тегов`
    },
    {
      check: splitHashtags.some((hashtag) => !regexp.test(hashtag)),
      error: 'Хэш-тег содержит запрещенные символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export {getErrorMessage, validateHashtags};
