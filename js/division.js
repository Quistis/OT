import { createALertElement } from './alertFunctions.js';

const addButtons = document.querySelectorAll('.add-division__btn');
const groupForms = document.querySelectorAll('.group-form');
const saveButtons = document.querySelectorAll('.save-info__btn');
const delButtons = document.querySelectorAll('.del-btn');
const editDivivisionButtons = document.querySelectorAll('.edit-division__btn');
const divisionInput = document.querySelector('.division-name');
const divisionForm = document.querySelector('.division-form');
const divisionFormClose = document.querySelector('.division-close');
const addDivisionBtn = document.querySelector('.add-division-btn');
const delDivisionBtn = document.querySelector('.del-division-button');
const footer = document.querySelector('.modal-footer');


for (const btn of addButtons) {
    btn.addEventListener('click', () => {
        const collapse = document.querySelector(`#collapse-${btn.dataset.divisionId}`);
        const table = collapse.querySelector('tbody');
        const tableRowsLength = table.getElementsByTagName('td').length;
        const new_row_text = `<tr> <th class='group-number' scope='row'> ${tableRowsLength + 1} </th><td> <input name='0' autocomplete='off' type='text' class='form-control edit-period' value='' aria-describedby='basic-addon1' required></td></tr>`;
        table.insertAdjacentHTML("beforeend", new_row_text);
    });
};

for (const btn of delButtons) {
  btn.addEventListener('click', () => {

      fetch(
        `/subdivisions/del/${btn.dataset.subdivisionId}`,
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
            const divisions_list = document.querySelector('.disivion-list');
            divisions_list.insertAdjacentHTML('afterbegin', createALertElement(data.detail));
          }
          else {
            const row = document.querySelector(`[data-subdivision-id="${btn.dataset.subdivisionId}"]`); 
            row.parentElement.parentElement.remove();
          }

        });
      
      });
  });
};

for (const form of groupForms) {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const divisionId = evt.target.id.match(/\d+/)[0];

        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let inputdata = {division_id:divisionId, subdivisions: object}; 
        fetch(
            `/subdivisions/update_subdivisions`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(inputdata)
            },
          )
          .then((response) => {

            response.json()
            .then((data) => {
              if (response.status === 400) {
                const divisions_list = document.querySelector('.disivion-list');
                divisions_list.insertAdjacentHTML('afterbegin', createALertElement(data.detail));
              }

            });
          
          });
          
    });
};

for (const btn of editDivivisionButtons) {
  btn.addEventListener('click', () => {
    const title = document.getElementById(`title-${btn.dataset.divisionId}`);
    divisionForm.dataset.divisionId = btn.dataset.divisionId;
    divisionInput.value = title.textContent;
  });
};

divisionForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const formData = new FormData(evt.target);
  const divisionId = divisionForm.dataset.divisionId;
  let object = {};
  formData.forEach((value, key) => object[key] = value);

  if (divisionId === '0') {
    fetch(
      `/divisions/add`,
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
        if (response.status === 400) {
          const footer = document.querySelector('.modal-footer');
          footer.insertAdjacentHTML('afterbegin', createALertElement(data.detail));
        }
        else {
          divisionFormClose.click();
          // const title = document.getElementById(`title-${divisionId}`);
          // title.textContent = data.name;
          console.log('pchel');
          const list = document.querySelector('.disivion-list');
          list.insertAdjacentHTML('afterbegin', createDivisionElemet(data.id, data.name));
  
        };

      });
    
    });
    
  }
  else {
    fetch(
        `/divisions/update/${divisionId}`,
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
          if (response.status === 400) {
            footer.insertAdjacentHTML('afterbegin', createALertElement(data.detail));
          }
          else {
            divisionFormClose.click();
            const title = document.getElementById(`title-${divisionId}`);
            title.textContent = data.name;
          };
  
        });
      
      });
    
  };
});

addDivisionBtn.addEventListener('click', () => {
  divisionForm.dataset.divisionId = '0';
});

delDivisionBtn.addEventListener('click', () => {
  const divisionId = divisionForm.dataset.divisionId;

  fetch(
    `/divisions/delete/${divisionId}`,
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
        footer.insertAdjacentHTML('afterbegin', createALertElement(data.detail));
      }
      else {
        divisionFormClose.click();
        const title = document.getElementById(`title-${divisionId}`);
        console.log(title.parentElement.parentElement.parentElement)
        title.parentElement.parentElement.parentElement.remove();
      };

    });
  
  });
});

function createDivisionElemet(divisionId, divisionName) {
  return (`
    <li class="disivion-list__card disivion-card card mb-3">
    <form class="group-form" id="division-id-${divisionId}">
    <div class="disivion-card__header card-header d-flex justify-content-start align-items-center">
    
    <h5 id="title-${divisionId}" class="card-header__name text-center d-block">${divisionName}</h5>

    <a class="arrow-down" data-bs-toggle="collapse" href="#collapse-${divisionId}" role="button" aria-expanded="false" aria-controls="collapseExample"></a>

    <a class="add-division__btn me-2" data-division-id="${divisionId}" type="button" >
        <img src="/static/img/icon-plus.svg" width="28px" height="28px" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Добавить группу">
    </a>

    <button class="save-info__btn me-2" type="submit">
        <img src="/static/img/icon-save.png" width="25px" height="25px" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Сохранить">
    </button>

    <a class="edit-division__btn" data-division-id="${divisionId}" type="button" data-bs-toggle="modal" data-bs-target="#division-edit">
      <img src="/static/img/icon-edit.png" width="32px" height="32px" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Редактировать сотрудника">
    </a>

    </div>
    <div class="collapse" id="collapse-${divisionId}">

        <table class="table table-hover">
            <thead>
                <tr>
                <th class="group-number" scope="col-1">#</th>
                <th class="group-name" scope="col"> Наименование групп, отделов и т.д. </th> 
                <th class="edit-col" scope="col"></th> 
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
  </form>
  </li>
  `);
};