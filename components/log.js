function validation() {
  let user = document.getElementById("userName").value;
  let pass = document.getElementById("passWord").value;
  let err = document.getElementById("error_msg");

  if (user == "" && pass == "") {
    err.innerHTML = "Please enter username and password";
  } else if (user == "") {
    err.innerHTML = "Please Enter Username";
  } else if (pass == "") {
    err.innerHTML = "Please Enter Password";
  } else {
    sessionStorage.setItem("username", user);
    window.location = "search.html";
  }
}


