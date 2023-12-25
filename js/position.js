const editForm = document.querySelector('.position-form');
const editName = editForm.querySelector('.edit-name');
const addPosition = document.querySelector('.add-position-btn');
const editButtons = document.querySelectorAll('.edit-position-btn')
const closeButton = editForm.querySelector(".close-button");

for (const btn of editButtons) {
  btn.addEventListener('click', () => {
    const positionRow = document.querySelector(`#position-id-${btn.dataset.positionId}`);

    editForm.dataset.positionId = btn.dataset.positionId;

    const positionName = positionRow.querySelector('.position-name').textContent;

    editName.value = positionName;
  });
}

addPosition.addEventListener('click', () => {
  
  editForm.dataset.positionId = '0';
  editName.value = null;

});

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const formData = new FormData(evt.target);

  let object = {};
  formData.forEach((value, key) => object[key] = value);
  if (editForm.dataset.positionId === '0') {
    fetch(
      `/position/add`,
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
        location = "/positions"
      });
  }
  else {
    fetch(
        `/position/update/${editForm.dataset.positionId}`,
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
          
          const positionRow = document.querySelector(`#position-id-${data.id}`);
    
          const positionName = positionRow.querySelector('.position-name');
    
          positionName.textContent = object.name;
    
          closeButton.click();
    
        });
    
  }
});
