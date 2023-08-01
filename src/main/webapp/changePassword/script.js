const oldInputReg = document.querySelector('#oldpwd');
const oldLabelReg = document.querySelector('#oldpwd-lab');

const newInputReg = document.querySelector('#newpwd');
const newLabelReg = document.querySelector('#newpwd-lab');

const new2InputReg = document.querySelector('#new2pwd');
const new2LabelReg = document.querySelector('#new2pwd-lab');

oldInputReg.addEventListener('click', () => {
    if (oldInputReg.value == "") {
        oldLabelReg.classList.add('active1');
    }
    if (newInputReg.value == "") {
        newLabelReg.classList.remove('active1');
    }
    if (new2InputReg.value == "") {
        new2LabelReg.classList.remove('active1');
    }
});

newInputReg.addEventListener('click', () => {
    if (oldInputReg.value == "") {
        oldLabelReg.classList.remove('active1');
    }
    if (newInputReg.value == "") {
        newLabelReg.classList.add('active1');
    }
    if (new2InputReg.value == "") {
        new2LabelReg.classList.remove('active1');
    }
});

new2InputReg.addEventListener('click', () => {
    if (oldInputReg.value == "") {
        oldLabelReg.classList.remove('active1');
    }
    if (newInputReg.value == "") {
        newLabelReg.classList.remove('active1');
    }
    if (new2InputReg.value == "") {
        new2LabelReg.classList.add('active1');
    }
});

oldInputReg.addEventListener('focus', () => {
    if (oldInputReg.value == "") {
        oldLabelReg.classList.add('active1');
    }
    if (newInputReg.value == "") {
        newLabelReg.classList.remove('active1');
    }
    if (new2InputReg.value == "") {
        new2LabelReg.classList.remove('active1');
    }
});

newInputReg.addEventListener('focus', () => {
    if (oldInputReg.value == "") {
        oldLabelReg.classList.remove('active1');
    }
    if (newInputReg.value == "") {
        newLabelReg.classList.add('active1');
    }
    if (new2InputReg.value == "") {
        new2LabelReg.classList.remove('active1');
    }
});

new2InputReg.addEventListener('focus', () => {
    if (oldInputReg.value == "") {
        oldLabelReg.classList.remove('active1');
    }
    if (newInputReg.value == "") {
        newLabelReg.classList.remove('active1');
    }
    if (new2InputReg.value == "") {
        new2LabelReg.classList.add('active1');
    }
});

window.onload = () => {
    if (!localStorage.getItem("user")) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "../error/error.html", true);
        xhr.onload = () => {
            document.body.innerHTML = xhr.responseText;
        }
        xhr.send(null);
    }
}

document.querySelector("form").onsubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("user", localStorage.getItem("user"));
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../CheckOldPwd");
    xhr.send(formData);
    xhr.onload = () => {
        if (xhr.responseText.trim() == oldInputReg.value) {
            if (newInputReg.value == new2InputReg.value) {
                let formData1 = new FormData();
                formData1.append("user", localStorage.getItem("user"));
                formData1.append("new", newInputReg.value);
                let xhr1 = new XMLHttpRequest();
                xhr1.open("POST", "../ChangePwd");
                xhr1.send(formData1);
                xhr1.onload = () => {
                    oldInputReg.value = "";
                    newInputReg.value = "";
                    new2InputReg.value = "";
                    document.querySelector(".success").style.opacity = "1";
                }
            } else {
                document.querySelector(".warnings").textContent = "New Password Mismatch!";
                document.querySelector(".warnings").style.opacity = "1";
            }
        } else {
            document.querySelector(".warnings").textContent = "Wrong Old Password!";
            document.querySelector(".warnings").style.opacity = "1";
        }
    }
}

document.querySelector(".success").ontransitionend = () => {
    document.querySelector(".success").style.opacity = "0";
}

document.querySelectorAll(".year").forEach(e => e.textContent = new Date().getFullYear());
document.querySelector(".logout1").onclick = () => {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
    document.querySelectorAll(".main").forEach(a => a.classList.remove("rel"));
    document.querySelector(".logout").style.display = "flex";
}
document.getElementById("cancelOut").onclick = () => {
    document.querySelector(".logout").style.display = "none";
    window.onscroll = () => { };
}
document.getElementById("sureOut").onclick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("form");
    localStorage.removeItem("formName");
    window.location = "../signin";
}

window.addEventListener("storage",()=>{location.reload()});

const inputField3 = document.getElementById("newpwd");

inputField3.addEventListener("input", function() {
  const inputValue = inputField3.value.trim();
  
  console.log("hello");
  
   var pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-={}[\]\\|:;"'<>,.?/])[a-zA-Z0-9!@#$%^&*()_+\-={}[\]\\|:;"'<>,.?/]{8,}$/;

  if (pattern.test(inputValue)) {
    inputField3.setCustomValidity("");
  } else {
    inputField3.setCustomValidity("Password isn't strong enough.");
  }
});

const inputField4 = document.getElementById("new2pwd");

inputField4.addEventListener("input", function() {
  const inputValue = inputField4.value.trim();
  
  
  
   var pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-={}[\]\\|:;"'<>,.?/])[a-zA-Z0-9!@#$%^&*()_+\-={}[\]\\|:;"'<>,.?/]{8,}$/;

  if (pattern.test(inputValue)) {
    inputField4.setCustomValidity("");
  } else {
    inputField4.setCustomValidity("Password isn't strong enough.");
  }
});
