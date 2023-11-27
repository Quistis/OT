const Urls = {
  employeeData: '/employees/get_all_with_exams/',
  navPillsData: '/divisions/',
};

const sendRequest = (onSuccess, onFail, route, method, body = null) => {
  fetch(
    Urls[route],
    {
      method: method,
      body: body,
    },
  )
    .then((responce) => responce.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const getEmployeesData = (onSuccess, onFail, route = 'employeeData', method = 'GET') => sendRequest(onSuccess, onFail, route, method);
const getNavPillsData = (onSuccess, onFail, route = 'navPillsData', method = 'GET') => sendRequest(onSuccess, onFail, route, method);

export {getEmployeesData, getNavPillsData};
