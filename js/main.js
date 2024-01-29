// import { getEmployeesData } from '/static/js/api.js';
// import { renderEmployees } from '/static/js/renderEmployeeList.js';
// import '/static/js/filters.js';

import { getEmployeesData } from './api.js';
import { renderEmployees } from './renderEmployeeList.js';
import { addExam, editEmployee, delExam } from './add-exam.js';
import './filters.js';

let employees = [];

const onSuccess = (data) => {
  employees = data.slice();
  renderEmployees(employees);
};

getEmployeesData(onSuccess);

const addExamForm = document.querySelector('.add-exam-form');
addExamForm.addEventListener('submit', addExam);

const editEmployeeForm = document.querySelector('.edit-employee-form');
editEmployeeForm.addEventListener('submit', editEmployee);

const delButton = document.querySelector('.del-exam-button')
delButton.addEventListener('click', delExam)

const importForm = document.querySelector('.import-form');
importForm.addEventListener('submit', importFile);

function importFile(event) {
  const form = event.currentTarget;
  const url = new URL(importForm.action);
  const formData = new FormData(form);
  const fetchOptions = {
    method: form.method,
    body: formData,
  };
  fetch(url, fetchOptions)
  .then((response) => {
    response.json().then(data => {
      const filterContainer = document.querySelector('.filter-container');
      if (response.status === 200) {
        filterContainer.insertAdjacentHTML('afterend', createSuccesElement());
        console.log(response);
        setTimeout(() => {
          const element = document.querySelector('.succes-alert');
          element.remove();
        }, "3000");
      }
      else {
        filterContainer.insertAdjacentHTML('afterend', createALertElement(data.detail));
        setTimeout(() => {
          const element = document.querySelector('.error-alert');
          element.remove();
        }, "10000");
      };
    })
  });

  event.preventDefault();
}

function createALertElement(details) {
  return (`
    <div class="error-alert alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Ошибка импорта!</strong> ${details}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `);
}

function createSuccesElement() {
  return (`
    <div class="succes-alert alert alert-success alert-dismissible fade show" role="alert">
      <strong>Импорт успешно произведен!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `);
}