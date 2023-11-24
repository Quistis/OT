const createEmployee = (employee) => {
  //Контейнер для карточки
  const employeeElement = document.createElement('div');
  employeeElement.classList.add('card', 'mb-3');

  //Заголовок карточки(ФИО)
  const employeeHeader = document.createElement('div');
  employeeHeader.classList.add('card-header');
  employeeHeader.textContent = `${employee.fio}`;
  employeeElement.append(employeeHeader);

  const employeeCardBody = document.createElement('div');
  employeeCardBody.classList.add('col-4', 'd-flex', 'flex-column', 'justify-content-center', 'p-4');
  employeeElement.append(employeeCardBody);

  const employeePosition = document.createElement('p');
  employeePosition.classList.add('card-text', 'position');
  employeePosition.textContent = `${employee.position}`;
  employeeCardBody.append(employeePosition);

  const boldPositionName = document.createElement('b');
  boldPositionName.textContent = 'Должность: ';
  employeePosition.prepend(boldPositionName);

  const employeeSubdivision = document.createElement('p');
  employeeSubdivision.classList.add('card-text', 'subdivision');
  employeeSubdivision.textContent = employee.subdivision_id;
  employeeCardBody.append(employeeSubdivision);

  const boldSubdivisionName = document.createElement('b');
  boldSubdivisionName.textContent = 'Подразделение: ';
  employeeSubdivision.prepend(boldSubdivisionName);

  const employeeCertificate = document.createElement('p');
  employeeCertificate.classList.add('card-text', 'certificate');
  employeeCertificate.textContent = employee.id;
  employeeCardBody.append(employeeCertificate);

  const boldCertificateNumber = document.createElement('b');
  boldCertificateNumber.textContent = 'Подразделение: ';
  employeeCertificate.prepend(boldCertificateNumber);

  return employeeElement;
};

export {createEmployee};
