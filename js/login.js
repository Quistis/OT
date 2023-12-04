const loginForm = document.querySelector(".login__form");
console.log(loginForm);

loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  
    const formData = new FormData(evt.target);
    console.log(formData);


    

    fetch(
      '/auth/jwt/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
        'username': formData.get("username"),
        'password': formData.get("password")
      })
      },
    )
    .then((response) => {
      
      if (!response.ok) {
        alert('ERROR');
      };
      return response.json();
    } )
    .then((data) => {
        console.log(data);
        // if (data.detail === 'LOGIN_BAD_CREDENTIALS') {
        //   alert('ERROR');
        // };
        
      })
    .catch((err) => {
      console.log(err);
    });


    // uploadData(onSuccess, onFail, 'POST', formData);

  });