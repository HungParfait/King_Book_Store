function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
      console.log('User signed out.');
  });
}


function onSuccess(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login/google-oauth');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if(xhr.status === 200) {
      signOut()
      window.location.href = '/home';
    } else {
      signOut()
      window.location.href = '/login/email';
    }
    return;
  };
  xhr.send('idtoken=' + id_token);
}

function onFailure(error) {
  console.log(error);
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/login/google-oauth');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if(xhr.status === 200) {
      signOut()
      window.location.href = '/home';
    } else {
      signOut()
      window.location.href = '/home/email';
    }
  };
  xhr.send('idtoken=' + id_token);
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 40,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}