import { getEmployeesData } from './api.js';
import { renderEmployees } from './renderEmployeeList.js';

let employees = [];

const onSuccess = (data) => {
  employees = data.slice();
  renderEmployees(employees);
};

getEmployeesData(onSuccess);
