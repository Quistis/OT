import { renderEmployees } from '/static/js/renderEmployeeList.js';
import { getEmployeesData, getNavPillsData } from '/static/js/api.js';

// import { renderEmployees } from './renderEmployeeList.js';
// import { getEmployeesData, getNavPillsData } from './api.js';

//const ACTIVE_CLASS = 'active';

const filtersList = document.querySelector('.nav-pills');

const createFilterItem = (filterPill) => {
  const filterItem = document.createElement('li');
  filterItem.classList.add('nav-item');
  filterItem.classList.add('filter-item');

  const filterBtn = document.createElement('button');
  filterBtn.classList.add('nav-link');
  filterBtn.textContent = filterPill.name;
  filterBtn.id = `filter-${filterPill.id}`;

  filterItem.append(filterBtn);

  return filterItem;
};

const renderFilterPills = (filters) => {
  const filterFragment = document.createDocumentFragment();

  filters.forEach((filter) => {
    filterFragment.append(createFilterItem(filter));
  });
  const filterContainer = document.querySelector('.right-place');
  const addButtonText = "<button class='btn btn-primary d-flex flex-row-reverse mb-3' data-bs-toggle='modal' data-bs-target='#staticBackdrop1' id='addEmployee' aria-current='page'>Добавить сотрудника</button>"
  

  filtersList.append(filterFragment);
  filterContainer.insertAdjacentHTML('beforeend', addButtonText);
  const addEmployeeButton = filterContainer.querySelector('#addEmployee');
  
  addEmployeeButton.addEventListener('click', () => {

    const editEmployeeForm = document.querySelector('.edit-employee-form');
    editEmployeeForm.dataset.employeeId = '0';
  
  });
  
  
};

getNavPillsData(renderFilterPills);

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onDataSuccess = (data) => {
  const employeeList = document.querySelector('.employee-list');
  employeeList.innerHTML = '';

  renderEmployees(data);
  
};

const sendRequest = (onSuccess, url) => {
  fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const onFiltersListClick = (evt) => {
  if (isButton(evt)) {
    const targetId = evt.target.id.replace('filter-', '');

    const selectedButton = filtersList.querySelector('.active');

    selectedButton.classList.remove('active');
    evt.target.classList.add('active');

    if (targetId === 'everyone') {
      getEmployeesData(onDataSuccess);
      filterSubdisionList(null);
      return;
    }

    const url = `/employees/get_all_with_exams?division=${targetId}`;

    sendRequest(onDataSuccess, url);

    filterSubdisionList(targetId);

  }
};

filtersList.addEventListener('click', onFiltersListClick);

function filterSubdisionList(divisionId) {
  const subdivisionList = document.querySelector('.subdivision-input');
  
  fetch(
    `/subdivisions/${divisionId !== null ? '?division_id=' + divisionId : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    },
  )
  .then((response) => {
    let check = true;
    response.json()
    .then((data) => {
      if (response.status === 200) {
        for (let sub of subdivisionList.options){
          check = true;
          for (const new_sub of data){
            if (parseInt(sub.value, 10) === parseInt(new_sub.id, 10)) {
              check = false;
              break;
            }
          };
          if (check) {
            sub.hidden = true;
          }
          else {
            sub.hidden = false;
          }
          
        };
      } else {
        const filterContainer = document.querySelector('.filter-container');
        filterContainer.insertAdjacentHTML('afterbegin', createALertElement(data.detail));        
      };
    });
  });
};