let visible = false;
document.getElementById("togglePassword").onclick = () => {
    if (visible) {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("togglePassword").setAttribute("class", "far fa-eye");
        visible = false;
    } else {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("togglePassword").setAttribute("class", "far fa-eye-slash");
        visible = true;
    }
}

const signup = document.querySelector("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const warn = document.getElementById("warn");
const gif = document.getElementById("loading");

signup.addEventListener("submit", SignUp);
//Signup pageverification
function SignUp(event) {
    event.preventDefault();
    if (email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../Signup", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("Smail=" + email.value + "&Spass=" + password.value + "&user=" + username.value);
        gif.style.display = "flex";
        xhr.onload = function () {
            if (xhr.responseText.trim() == "not.p") {
                localStorage.setItem("Dummyuser", email.value);
                gif.style.display = "none";
                warn.style.display = "none";
                sessionStorage.setItem("email", email.value);
                window.location = "../verification";
                
            }
            else if (xhr.responseText.trim() == "present") {
                gif.style.display = "none";
                warn.textContent = "Account Exists Already!";
                warn.style.display = "block";
            }
        }
    } else {
        warn.textContent = "Invalid Email!";
        warn.style.display = "block";
    }
}
const inputField2 = document.getElementById("password");

inputField2.addEventListener("input", function() {
  const inputValue = inputField2.value.trim();
  
  console.log("hello");
  
   var pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-={}[\]\\|:;"'<>,.?/])[a-zA-Z0-9!@#$%^&*()_+\-={}[\]\\|:;"'<>,.?/]{8,}$/;

  if (pattern.test(inputValue)) {
    inputField2.setCustomValidity("");
  } else {
    inputField2.setCustomValidity("Password must be atleast 8 characters.");
  }
});