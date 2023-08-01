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

const logging = document.getElementById("login");
const emailInput = document.querySelector('#email');
const passInput = document.querySelector('#password');
const wrong = document.getElementById("warn");
logging.addEventListener("submit", logIn);

function logIn(event) {
    event.preventDefault();
    if (emailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        let formData = new FormData();
        formData.append("mail", emailInput.value);
        formData.append("pass", passInput.value);
        let validate = new XMLHttpRequest();
        validate.open("POST", "../Login");
        validate.send(formData);
        validate.onload = () => {
            if (validate.responseText.trim() == "true") {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "../GetId?mailId=" + emailInput.value);
                xhr.send();
                xhr.onload = () => {
                    console.log(xhr.responseText);
                    localStorage.setItem("user", xhr.responseText.trim());
                    window.location = "../home";
                }
            }
            else {
                wrong.textContent = "Invalid Email or Password!";
                wrong.style.display = "block";
            }
        }
    } else {
        wrong.textContent = "Invalid Email!";
        wrong.style.display = "block";
    }
}