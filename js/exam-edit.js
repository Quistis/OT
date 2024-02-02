import { createALertElement } from "./alertFunctions.js";

const editForm = document.querySelector('.exam-type-form');
const editName = editForm.querySelector('.edit-name');
const editPeriod = editForm.querySelector('.edit-period');
const editDescription = editForm.querySelector('.edit-description');
const addExamType = document.querySelector('.add-exam-type-btn');
const editButtons = document.querySelectorAll('.edit-exam-type-btn')
const closeButton = editForm.querySelector(".close-button");
const delButtons = document.querySelectorAll('.del-exam-type-btn');

for (const btn of editButtons) {
  btn.addEventListener('click', () => {
    const examRow = document.querySelector(`#exam-id-${btn.dataset.examId}`);

    editForm.dataset.examId = btn.dataset.examId;

    const examName = examRow.querySelector('.exam-type-name').textContent;
    const examPeriod = examRow.querySelector('.exam-type-period').textContent;
    const examDescription = examRow.querySelector('.exam-type-description').textContent;

    editName.value = examName;
    editPeriod.value = examPeriod;
    editDescription.value = examDescription;

  });
};

for (const btn of delButtons) {
  btn.addEventListener('click', () => {
    console.log(btn.dataset.examId);
    const examRow = document.querySelector(`#exam-id-${btn.dataset.examId}`);
    const title = document.querySelector('.exam-type-title');
    fetch(
      `/exam_types/delete/${btn.dataset.examId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      },
    )
    .then((response) => {

      response.json()
      .then((data) => {
        if (response.status === 400) {
          title.insertAdjacentHTML('afterend', createALertElement(data.detail));
        }
        else {
          examRow.remove();
        }

      });
    
    });

  });
};

addExamType.addEventListener('click', () => {

  editForm.dataset.examId = '0';
  editName.value = null;
  editPeriod.value = null;
  editDescription.value = null;

});

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const formData = new FormData(evt.target);

  let object = {};
  formData.forEach((value, key) => object[key] = value);
  if (editForm.dataset.examId === '0') {
    fetch(
      `/exam_types/add`,
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
        location = "/exam-types"
      })
    .catch((err) => {
      console.log(err);
    });
  } else {
    fetch(
      `/exam_types/update/${editForm.dataset.examId}`,
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
        console.log(data);
  
        const examRow = document.querySelector(`#exam-id-${data.id}`);
  
        const examName = examRow.querySelector('.exam-type-name');
        const examPeriod = examRow.querySelector('.exam-type-period');
        const examDescription = examRow.querySelector('.exam-type-description');
  
        examName.textContent = object.name;
        examPeriod.textContent = object.period;
        examDescription.textContent  = object.description;
  
        closeButton.click();
      });
  }
});
