import { createExamination } from './renderEmployeeList.js';

function addExam(evt) {
  
  evt.preventDefault();
  const addExamForm = document.querySelector('.add-exam-form');
  const formData = new FormData(evt.target);
  let employee_id = addExamForm.dataset.employeeId;

  let object = {};
  formData.forEach((value, key) => object[key] = value);
    fetch(
      `/exams/add/?employee_id=${employee_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      },
    )
    .then((response) => response.json())
    .then((data) => {
        const collapse = document.getElementById(`${employee_id}`);
        const tableBody = collapse.querySelector('tbody');

        const closeButton = addExamForm.querySelector(".close-button");
        closeButton.click();
        
        if (tableBody == null) {
          const examinationsTableTemplate = document.querySelector('#examinations-table')
          .content
          .querySelector('.employee-examaminations');
          const examinationsTableContainer = examinationsTableTemplate.cloneNode(true);
          const cardBody = collapse.querySelector('.card-body');
          cardBody.append(examinationsTableContainer);
          const tableBody = collapse.querySelector('tbody');

          const row = createExamination(data, 0);
          
          tableBody.append(row);
        }
        else {
          const rows = tableBody.querySelectorAll("tr");
          const row = createExamination(data, rows.length);
          tableBody.append(row);
        };
      });
}

function editEmployee(evt) {
  
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const editEmployeeForm = document.querySelector('.edit-employee-form');
  let employeeId = editEmployeeForm.dataset.employeeId;

  let object = {};
  formData.forEach((value, key) => {
    if (value.length > 0) {
      object[key] = value;
    }
  });
  console.log(object);
  

  fetch(
    `/employees/update/${employeeId}/`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    },
  )
  .then((response) => response.json())
  .then((data) => {
      const closeButton = editEmployeeForm.querySelector(".close-button");
      closeButton.click();
      
      const collapse = document.getElementById(`${employeeId}`);

      const fio = document.querySelector(`#employee-name-${employeeId}`);
      const position =  collapse.querySelector('.employee-position');
      const subdivision = collapse.querySelector('.employee-subdivision');
      const certificate = collapse.querySelector('.employee-certificate');
      const division = collapse.querySelector('.employee-division');

      fio.textContent = data.fio;
      position.textContent = `Должность: ${data.position}`
      subdivision.textContent = `Группа, отдел: ${data.subdivision}`
      certificate.textContent = `Номер удостоверения: ${data.certificate}`
      division.textContent =  `Подразделение: ${data.division}` 
    });

}

export {addExam, editEmployee};