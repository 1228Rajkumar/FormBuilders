const resendbtn = document.getElementById("resendbtn");
const Verifybtn = document.getElementById("verifybtn");
window.onload = () => {
    document.getElementById("email").textContent = sessionStorage.getItem("email");
    /* sctime = Number(sessionStorage.getItem("sctime"));
    shtime = Number(sessionStorage.getItem("shtime")); */
    breaktime = setInterval(time, 600);
    document.getElementById("x1").focus();
}
document.querySelectorAll(".verification-code input[type=text]").forEach(function (e) {
    e.onkeyup = (event) => {
        if (e.value != "") {
            let x = Number(e.id[1]);
            if (x < 5) {
                document.getElementById("x" + (x + 1)).focus();
            }
        }
    }
    e.onkeydown = function (f) {
        if ("1234567890".includes(f.key) || f.key == "Backspace") {
            let x = Number(e.id[1]);
            if (this.id[1] != "1" && f.key == "Backspace" && this.value == "") {
                document.getElementById("x" + (x - 1)).focus();
            }
        } else {
            f.preventDefault();
        }
    }
})
const warn = document.getElementById("warn");

Verifybtn.addEventListener("click", validate);
function validate(event) {
    event.preventDefault();
    let otp = "";
    document.querySelectorAll(".verification-code input[type=text]").forEach(function (e) {
        otp += e.value;
    })
    if (otp.length == 5) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../OtpChecker", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("getotp=" + otp);
        resendbtn.backgroundColor = "#ccc";
        resendbtn.disabled = true;
        xhr.onload = function () {
            if (xhr.responseText.trim() == "true") {
                if (this.status == 200) {
                    localStorage.setItem("user", localStorage.getItem("Dummyuser"));
                    localStorage.removeItem("Dummyuser")
                    window.location = "../home";
                }
            } else {
                warn.textContent = "Invalid OTP!";
                warn.style.display = "block";
            }

        }
    } else if (otp == "") {
        warn.textContent = "Please Enter OTP!";
        warn.style.display = "block";
    } else {
        warn.textContent = "Invalid OTP!";
        warn.style.display = "block";
    }
}
resendbtn.onclick = resendOtp;

function resendOtp() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../ResendOtp", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onload = function () {
        if (this.status == 200) {
            Verifybtn.style.backgroundColor = "#4d84e2";
            Verifybtn.disabled = false;
            breaktime = setInterval(time, 1000);
            resendbtn.style.backgroundColor = "#ccc";
            resendbtn.disabled = true;
        }
    }
}

const MINIUTE = document.querySelector('#min');
const SECONDS = document.querySelector('#sec');


let sctime = 30;
let shtime = 1;
function time() {
    MINIUTE.innerText = "0" + shtime;
    sctime--;
    if (sctime < 10) {
        SECONDS.innerText = "0" + sctime;
    } else {
        SECONDS.innerText = sctime;
    }
    if (sctime == 0) {
        shtime--;
        sctime = 60;
    }
    if (shtime == -1) {
        clearInterval(breaktime);
        Verifybtn.style.backgroundColor = "#ccc";
        Verifybtn.disabled = true;
        resendbtn.disabled = false;
        resendbtn.style.backgroundColor = "#4d84e2";
        resendbtn.classList.add('active_resend');
        MINIUTE.innerText = "00";
        sctime = 30;
        shtime = 1;
    }
}