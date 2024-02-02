function createALertElement(details) {
    return (`
      <div class="error-alert alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Ошибка!</strong> ${details}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `);
};
  
function createSuccesElement() {
    return (`
      <div class="succes-alert alert alert-success alert-dismissible fade show" role="alert">
        <strong>Импорт успешно произведен!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `);
};

export {createSuccesElement, createALertElement};