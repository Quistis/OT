import { getEmployeesData } from '/static/js/api.js';
import { renderEmployees } from '/static/js/renderEmployeeList.js';
import '/static/js/filters.js';

let employees = [];

const onSuccess = (data) => {
  employees = data.slice();
  renderEmployees(employees);
};

getEmployeesData(onSuccess);
