import { createExamination } from './renderEmployeeList.js';
import { createALertElement, createSuccesElement } from './alertFunctions.js';

const addExamForm = document.querySelector('.add-exam-form');
const closeButtonAdd = addExamForm.querySelector(".close-button");

const editEmployeeForm = document.querySelector('.edit-employee-form');
const closeButtonEdit = editEmployeeForm.querySelector(".close-button");

function addExam(evt) {
  
  evt.preventDefault();
  const formData = new FormData(evt.target);
  let employee_id = addExamForm.dataset.employeeId;
  let exam_id = addExamForm.dataset.examId;

  let object = {};
  formData.forEach((value, key) => object[key] = value);
  if (exam_id === '0') {
    fetch(
      `/exams/add?employee_id=${employee_id}`,
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

        
        closeButtonAdd.click();
        
        if (tableBody == null) {
          const examinationsTableTemplate = document.querySelector('#examinations-table')
          .content
          .querySelector('.employee-examaminations');
          const examinationsTableContainer = examinationsTableTemplate.cloneNode(true);
          const cardBody = collapse.querySelector('.card-body');
          cardBody.append(examinationsTableContainer);
          const tableBody = collapse.querySelector('tbody');

          const row = createExamination(data, 0, employee_id);
          
          tableBody.append(row);
        }
        else {
          const rows = tableBody.querySelectorAll("tr");
          const row = createExamination(data, rows.length, employee_id);
          tableBody.append(row);
        };
      });
  } else {
    fetch(
      `/exams/update?exam_id=${exam_id}`,
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
        closeButtonAdd.click();

        const examRow = document.querySelector(`.exam-id-${exam_id}`);

        const exam = examRow.querySelector('.exam-name');
        const protocol = examRow.querySelector('.exam-ptotocol');
        const date = examRow.querySelector('.exam-date');
        const nextDate = examRow.querySelector('.exam-next-date');
        const place = examRow.querySelector('.exam-place');
        const notation = examRow.querySelector('.exam-notation');

        exam.textContent = data.exam_type.name;
        protocol.textContent = data.protocol;
        date.textContent = data.date;
        nextDate.textContent = data.next_date;
        place.textContent = data.place;
        notation.textContent = data.notation;
      
      });
  };
}

function editEmployee(evt) {
  
  evt.preventDefault();

  const formData = new FormData(evt.target);
  let employeeId = editEmployeeForm.dataset.employeeId;

  let object = {};
  formData.forEach((value, key) => {
    if (value.length > 0) {
      object[key] = value;
    }
  });
  
  if (employeeId === '0') {
    fetch(
      `/employees/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      },
    )
    .then((response) => {

      response.json()
      .then((data) => {
        if (response.status === 200) {
          if (data.code == 1) {
            const footer = editEmployeeForm.querySelector('.modal-footer');
            const errorText = `<span>${data.detail}</span>`
            footer.insertAdjacentHTML("afterbegin", errorText);
          }
          else {
            closeButtonEdit.click();
          };
        } else {
          console.log('error');
            const filterContainer = document.querySelector('.filter-container');
            filterContainer.insertAdjacentHTML('afterbegin', createALertElement(data.detail));
            
        }
        });
    });
    
    
  } else {
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
    .then((response) => {
      response.json()
      .then((data) => {
        if (response.status === 200) {
        
          closeButtonEdit.click();
        
        const collapse = document.getElementById(`${employeeId}`);

        const fio = document.querySelector(`#employee-name-${employeeId}`);
        const position =  collapse.querySelector('.employee-position');
        const subdivision = collapse.querySelector('.employee-subdivision');
        const certificate = collapse.querySelector('.employee-certificate');
        const division = collapse.querySelector('.employee-division');

        fio.textContent = data.fio;
        position.textContent = `Должность: ${data.position}`;
        subdivision.textContent = `Группа, отдел: ${data.subdivision}`;
        certificate.textContent = `Номер удостоверения: ${data.certificate}`;
        division.textContent =  `Подразделение: ${data.division}`;

        } else {
          const filterContainer = editEmployeeForm.querySelector('.modal-footer');
          filterContainer.insertAdjacentHTML('afterbegin', createALertElement(data.detail));  
        };

        });
    });
  }
  //   .then((response) => response.json())
  //   .then((data) => {
  //       closeButtonEdit.click();
        
  //       const collapse = document.getElementById(`${employeeId}`);

  //       const fio = document.querySelector(`#employee-name-${employeeId}`);
  //       const position =  collapse.querySelector('.employee-position');
  //       const subdivision = collapse.querySelector('.employee-subdivision');
  //       const certificate = collapse.querySelector('.employee-certificate');
  //       const division = collapse.querySelector('.employee-division');

  //       fio.textContent = data.fio;
  //       position.textContent = `Должность: ${data.position}`
  //       subdivision.textContent = `Группа, отдел: ${data.subdivision}`
  //       certificate.textContent = `Номер удостоверения: ${data.certificate}`
  //       division.textContent =  `Подразделение: ${data.division}` 
  //     });
  // }

};

function delExam(evt) {
  let exam_id = addExamForm.dataset.examId;
  let employee_id = addExamForm.dataset.employeeId;

  fetch(
    `/exams/del?exam_id=${exam_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    },
  )
  .then( () => {
    closeButtonAdd.click();
    const examRow = document.querySelector(`.exam-id-${exam_id}`);
    examRow.remove();

    const collapse = document.getElementById(`${employee_id}`);
    const tableBody = collapse.querySelector('tbody');
    const rows = tableBody.querySelectorAll("tr");
    for (let i=0; i <= rows.length; i++) {
      rows[i].querySelector('.exam-number').textContent = i + 1;
    };

  });
};

function importFile(event) {
  const form = event.currentTarget;
  const importForm = document.querySelector('.import-form');
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
        // setTimeout(() => {
        //   const element = document.querySelector('.error-alert');
        //   element.remove();
        // }, "10000");
      };
    })
  });

  event.preventDefault();
};

function delEmployee(evt) {
  evt.preventDefault();
  console.log('del');
  const editEmployeeForm = document.querySelector('.edit-employee-form');
  let employeeId = editEmployeeForm.dataset.employeeId;

  fetch(
    `/employees/del/${employeeId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    },
  )
  .then( () => {
    closeButtonEdit.click();
    const collapse = document.getElementById(`${employeeId}`);
    collapse.parentElement.remove();

  });
};

export { addExam, editEmployee, delExam, importFile, delEmployee };