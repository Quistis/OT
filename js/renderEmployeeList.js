const employeeList = document.querySelector('.employee-list');

const employeeCardTemplate = document.querySelector('#employee-card')
  .content
  .querySelector('.employee-card');

const examinationsTableTemplate = document.querySelector('#examinations-table')
  .content
  .querySelector('.employee-examaminations');

const createExamination = (exam, index) => {
  const examElement = document.createElement('tr');

  const examNumber = document.createElement('th');
  examNumber.classList.add('exam-number');
  examNumber.scope = 'row';
  examNumber.textContent = index + 1;
  examElement.append(examNumber);

  const examName = document.createElement('td');
  examName.classList.add('exam-name');
  examName.textContent = exam.exam_name;
  examElement.append(examName);

  const examProtocol = document.createElement('td');
  examProtocol.classList.add('exam-ptotocol');
  examProtocol.textContent = exam.protocol;
  examElement.append(examProtocol);

  const examDate = document.createElement('td');
  examDate.classList.add('exam-date');
  examDate.textContent = exam.date;
  examElement.append(examDate);

  const examNextDate = document.createElement('td');
  examNextDate.classList.add('exam-next-date');
  examNextDate.textContent = exam.next_date;
  examElement.append(examNextDate);

  const examPlace = document.createElement('td');
  examPlace.classList.add('exam-place');
  examPlace.textContent = exam.place;
  examElement.append(examPlace);

  const examNotation = document.createElement('td');
  examNotation.classList.add('exam-notation');
  examNotation.textContent = exam.notation;
  examElement.append(examNotation);

  return examElement;
};

const createEmployeeCard = (employee) => {
  const employeeCard = employeeCardTemplate.cloneNode(true);

  const examinationsTableContainer = examinationsTableTemplate.cloneNode(true);

  const employeeName = employeeCard.querySelector('.card-header__name');
  employeeName.textContent = employee.fio;

  const openEmployeeInfoBtn = employeeCard.querySelector('.arrow-down');
  openEmployeeInfoBtn.href = `#${employee.id}`;

  const employeeInformationField = employeeCard.querySelector('.collapse');
  employeeInformationField.id = employee.id;

  const cardBody = employeeCard.querySelector('.card-body');
  cardBody.dataset.employeeCardId = employee.id;

  const employeePosition = employeeCard.querySelector('.employee-position');
  employeePosition.insertAdjacentHTML('afterbegin',`<b>Должность:</b> ${employee.position}`);

  const employeeDividison = employeeCard.querySelector('.employee-division');
  employeeDividison.insertAdjacentHTML('afterbegin',`<b>Подразделение:</b> ${employee.division}`);

  const employeeSubdivision = employeeCard.querySelector('.employee-subdivision');
  employeeSubdivision.insertAdjacentHTML('afterbegin',`<b>Группа, отдел:</b> ${employee.subdivision}`);

  const employeeCertificate = employeeCard.querySelector('.employee-certificate');
  employeeCertificate.insertAdjacentHTML('afterbegin', `<b>Номер удостоверения:</b> ${employee.certificate !== null ? employee.certificate : 'Не выдано'}`);

  const exams = employee.exams.slice();

  if (exams.length !== 0) {
    cardBody.append(examinationsTableContainer);

    const tableBody = examinationsTableContainer.querySelector('tbody');

    const examsFragment = document.createDocumentFragment();

    exams.forEach((exam, index) => {
      examsFragment.append(createExamination(exam, index));
    });

    tableBody.append(examsFragment);
  }

  let addButton = employeeCard.querySelector('.add-exam__btn');

  addButton.setAttribute('data-employee-id', employee.id);
  
  addButton.addEventListener('click', () => {

    const addExamForm = document.querySelector('.add-exam-form');
    addExamForm.dataset.employeeId = addButton.dataset.employeeId;
  
  });

  return employeeCard;
};

const renderEmployees = (data) => {
  data.forEach((element) => {
    employeeList.append(createEmployeeCard(element));
  });
};

export {renderEmployees, createExamination};
