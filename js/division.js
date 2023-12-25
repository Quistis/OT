const addButtons = document.querySelectorAll('.add-division__btn');
for (const btn of addButtons) {
    btn.addEventListener('click', () => {
        const collapse = document.querySelector(`#collapse-${btn.dataset.divisionId}`);
        const table = collapse.querySelector('tbody');
        const tableRowsLength = table.getElementsByTagName('td').length;
        new_row_text = `<tr> <th class='group-number' scope='row'> ${tableRowsLength + 1} </th><td> <input name='input-group' autocomplete='off' type='text' class='form-control edit-period' value='' aria-describedby='basic-addon1' required></td></tr>`;
        table.insertAdjacentHTML("beforeend", new_row_text);
    });
  }