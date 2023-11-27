//import { renderEmployees } from './renderEmployeeList.js';
import { getNavPillsData } from './api.js';

//const ACTIVE_CLASS = 'active';

const filtersList = document.querySelector('.nav-pills');

const createFilterItem = (filterPill) => {
  const filterItem = document.createElement('li');
  filterItem.classList.add('nav-item');

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

  filtersList.append(filterFragment);
};

getNavPillsData(renderFilterPills);

const onFiltersListClick = (evt) => {
  evt.preventDefault();
};

filtersList.addEventListener('click', onFiltersListClick);
