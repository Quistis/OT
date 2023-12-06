const editForm = document.querySelector('.exam-type-form');
const editName = editForm.querySelector('.edit-name');
const editPeriod = editForm.querySelector('.edit-period');
const editDescription = editForm.querySelector('.edit-description');

const editButtons = document.querySelectorAll('.edit-exam-type-btn');

const onEditBtnClick = (btn) => {
  //console.log(btn.dataset.examId);
  const examRow = document.querySelector(`#exam-id-${btn.dataset.examId}`);

  const examName = examRow.querySelector('.exam-type-name').textContent;
  const examPeriod = examRow.querySelector('.exam-type-period').textContent;
  const examDescription = examRow.querySelector('.exam-type-description').textContent;
  //console.log(editName);
  editName.value = examName;
  editPeriod.value = examPeriod;
  editDescription.textContent = examDescription;
};

for (const btn of editButtons) {
  btn.addEventListener('click', onEditBtnClick);
}

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  console.log(formData);


  // fetch(
  //   '/auth/jwt/login',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     body: new URLSearchParams({
  //     'username': formData.get("username"),
  //     'password': formData.get("password")
  //   })
  //   },
  // )
  // .then((response) => {

  //   if (!response.ok) {
  //     loginError.style.display = 'block';
  //     setTimeout(() => {
  //       loginError.style.display = 'none';
  //     }, 2000);
  //     return 0;
  //   };
  //   location.href = '/';
  // })
  // .then((data) => {
  //     console.log(data);
  //     // if (data.detail === 'LOGIN_BAD_CREDENTIALS') {
  //     //   alert('ERROR');
  //     // };

  //   })
  // .catch((err) => {
  //   console.log(err);
  // });
});
