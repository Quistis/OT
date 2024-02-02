// import { getEmployeesData } from '/static/js/api.js';
// import { renderEmployees } from '/static/js/renderEmployeeList.js';
// import '/static/js/filters.js';

import { getEmployeesData } from './api.js';
import { renderEmployees } from './renderEmployeeList.js';
import { addExam, editEmployee, delExam, importFile, delEmployee} from './events.js';
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
delButton.addEventListener('click', delExam);

const importForm = document.querySelector('.import-form');
importForm.addEventListener('submit', importFile);

const delEmployeeButton = document.querySelector('.del-employee-button');
delEmployeeButton.addEventListener('click', delEmployee);