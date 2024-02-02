import { createALertElement } from './alertFunctions.js';

const addButtons = document.querySelectorAll('.add-division__btn');
const groupForms = document.querySelectorAll('.group-form');
const saveButtons = document.querySelectorAll('.save-info__btn');
const delButtons = document.querySelectorAll('.del-btn');



for (const btn of addButtons) {
    btn.addEventListener('click', () => {
        const collapse = document.querySelector(`#collapse-${btn.dataset.divisionId}`);
        const table = collapse.querySelector('tbody');
        const tableRowsLength = table.getElementsByTagName('td').length;
        const new_row_text = `<tr> <th class='group-number' scope='row'> ${tableRowsLength + 1} </th><td> <input name='0' autocomplete='off' type='text' class='form-control edit-period' value='' aria-describedby='basic-addon1' required></td></tr>`;
        table.insertAdjacentHTML("beforeend", new_row_text);
    });
}

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