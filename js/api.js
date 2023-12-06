// const Urls = {
//   employeeData: '/employees/get_all_with_exams/',
//   navPillsData: '/divisions/'
// };

const Urls = {
  employeeData: './response.json',
  navPillsData: './navPillsData.json',
};

const sendRequest = (onSuccess, route, method, body = null) => {
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
      console.log(err);
    });
};

const getEmployeesData = (onSuccess,/* onFail,*/ route = 'employeeData', method = 'GET') => sendRequest(onSuccess,/* onFail,*/ route, method);
const getNavPillsData = (onSuccess,/* onFail,*/ route = 'navPillsData', method = 'GET') => sendRequest(onSuccess,/* onFail,*/ route, method);

export {getEmployeesData, getNavPillsData};
