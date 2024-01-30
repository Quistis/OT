const addButtons = document.querySelectorAll('.add-division__btn');
const groupForms = document.querySelectorAll('.group-form');
const saveButtons = document.querySelectorAll('.save-info__btn');
const delButtons = document.querySelectorAll('.del-btn');



for (const btn of addButtons) {
    btn.addEventListener('click', () => {
        const collapse = document.querySelector(`#collapse-${btn.dataset.divisionId}`);
        const table = collapse.querySelector('tbody');
        const tableRowsLength = table.getElementsByTagName('td').length;
        new_row_text = `<tr> <th class='group-number' scope='row'> ${tableRowsLength + 1} </th><td> <input name='0' autocomplete='off' type='text' class='form-control edit-period' value='' aria-describedby='basic-addon1' required></td></tr>`;
        table.insertAdjacentHTML("beforeend", new_row_text);
    });
}

for (const btn of delButtons) {
  btn.addEventListener('click', () => {
      console.log(btn.dataset.subdivisionId);

      fetch(
        `/subdivisions/del/${btn.dataset.subdivisionId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        },
      )
      .then((response) => 
      {
        console.log(response.status);
        response.json()
        .then((data) => {
            console.log(data);
        })
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
        inputdata = {division_id:divisionId, subdivisions: object}; 
        console.log(inputdata);
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
          .then((response) => response.json())
          .then((data) => {
             
            })
          .catch((err) => {
            console.log(err);
          });
    });
};