const employeeList = document.querySelector('.employee-list');

const employeeCardTemplate = document.querySelector('#employee-card')
  .content
  .querySelector('.employee-card');

const examinationsTableTemplate = document.querySelector('#examinations-table')
  .content
  .querySelector('.employee-examaminations');

const createExamination = (exam, index, employee_id) => {
  const examElement = document.createElement('tr');
  examElement.classList.add(`exam-id-${exam.id}`)

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

  let new_row_text = `<td> <a class="edit-exam-btn" type="button" data-exam-id="${exam.id}" data-employee-id="${employee_id}" data-bs-toggle="modal" data-bs-target="#addBackdrop"><img src="/static/img/icon-edit.png" width="32px" height="32px" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Редактировать"></a> </td>`;
  examElement.insertAdjacentHTML("beforeend", new_row_text);

  const editButton = examElement.querySelector('.edit-exam-btn');
  editButton.addEventListener('click', () => {

    const title = document.querySelector('.add-exam-title');
    title.textContent = 'Редактирование экзамена';

    const editExamForm = document.querySelector('.add-exam-form');
    let examId = editButton.dataset.examId;
    let employeeId = editButton.dataset.employeeId;
    editExamForm.dataset.examId = examId;
    editExamForm.dataset.employeeId = employeeId;

    const examInput = editExamForm.querySelector('#examSelect');
    const protocolInput =  editExamForm.querySelector('.protocol-input');
    const dateInput = editExamForm.querySelector('.date-input');
    const nextDateInput = editExamForm.querySelector('.next-date-input');
    const placeInput = editExamForm.querySelector('.place-input');
    const notationInput = editExamForm.querySelector('.text-input');

    const employeeCard = document.getElementById(employeeId);
    const examRow = employeeCard.querySelector(`.exam-id-${examId}`);

    const exam = examRow.querySelector('.exam-name').textContent;
    const protocol = examRow.querySelector('.exam-ptotocol').textContent;
    const date = examRow.querySelector('.exam-date').textContent;
    const nextDate = examRow.querySelector('.exam-next-date').textContent;
    const place = examRow.querySelector('.exam-place').textContent;
    const notation = examRow.querySelector('.exam-notation').textContent;

    protocolInput.value = protocol;
    dateInput.value = date;
    nextDateInput.value = nextDate;
    notationInput.textContent = notation;

    for (const examItem of examInput.options){
      if (examItem.textContent == exam) {
        examItem.selected = true;
      }
    };

    for (const placeItem of placeInput.options){
      if (placeItem.textContent == place) {
        placeItem.selected = true;
      }
    };
  
  });

  return examElement;
};

const createEmployeeCard = (employee) => {
  const employeeCard = employeeCardTemplate.cloneNode(true);

  const examinationsTableContainer = examinationsTableTemplate.cloneNode(true);

  const employeeName = employeeCard.querySelector('.card-header__name');
  employeeName.textContent = employee.fio;
  employeeName.id = `employee-name-${employee.id}`;

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
      examsFragment.append(createExamination(exam, index, employee.id));
    });

    tableBody.append(examsFragment);
  }

  let addButton = employeeCard.querySelector('.add-exam__btn');

  addButton.setAttribute('data-employee-id', employee.id);
  
  addButton.addEventListener('click', () => {

    const title = document.querySelector('.add-exam-title');
    title.textContent = 'Добавление экзамена';

    const addExamForm = document.querySelector('.add-exam-form');
    addExamForm.dataset.employeeId = addButton.dataset.employeeId;
    addExamForm.dataset.examId = 0;
  
  });

  let editButton = employeeCard.querySelector('.edit-employee-info__btn');

  editButton.setAttribute('data-employee-id', employee.id);
  
  editButton.addEventListener('click', () => {

    const editEmployeeForm = document.querySelector('.edit-employee-form');
    editEmployeeForm.dataset.employeeId = editButton.dataset.employeeId;

    const fioInput = editEmployeeForm.querySelector('.fio-input');
    const positionInput =  editEmployeeForm.querySelector('.position-input');
    const subdivisionInput = editEmployeeForm.querySelector('.subdivision-input');
    const certificateInput = editEmployeeForm.querySelector('.certificate-input');
    let employeeId = editEmployeeForm.dataset.employeeId;

    const collapse = document.getElementById(`${employeeId}`);

    const fio = document.querySelector(`#employee-name-${employeeId}`).textContent;
    const position =  collapse.querySelector('.employee-position').textContent.replace('Должность: ', '');
    const subdivision = collapse.querySelector('.employee-subdivision').textContent.replace('Группа, отдел: ', '');
    const certificate = collapse.querySelector('.employee-certificate').textContent.replace('Номер удостоверения: ', '');
    fioInput.value = fio;
    certificateInput.value = certificate;
    for (const pos of positionInput.options){
      if (pos.textContent == position) {
        pos.selected = true;
      }
    };
    for (const sub of subdivisionInput.options){
      if (sub.textContent == subdivision) {
        sub.selected = true;
      }
    };
  
  });

  return employeeCard;
};

const renderEmployees = (data) => {
  data.forEach((element) => {
    employeeList.append(createEmployeeCard(element));
  });
};

export {renderEmployees, createExamination};
