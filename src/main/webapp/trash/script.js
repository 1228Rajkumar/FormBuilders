let user;
let formName;
let formsCount = 0;
const createformbtn = document.getElementById("new");

const cancelbtn = document.getElementById("cancel");
const savebtn = document.getElementById("save");

const formname = document.getElementById("formname");

const popup = document.getElementById("popupcontainer");

let nameoftheform;

function showPopUp() {
    popup.style.display = "flex";
    formname.focus();
}

function hidePopUp() {
    popup.style.display = "none";
    formname.value = '';
}

function toStoreName(event) {
    event.preventDefault();
    document.querySelector(".warnings").style.opacity = "0";
    nameoftheform = formname.value;
    let formData = new FormData();
    formData.append("user", user);
    formData.append("form", nameoftheform);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../CheckFormExistInTrash");
    xhr.send(formData);
    xhr.onload = () => {
        if (xhr.status == 200) {
            if (xhr.responseText.trim() == "false") {
                localStorage.setItem("formName", nameoftheform);
                window.location = "../chooseMode";
                formname.value = '';
                popup.style.display = "none";
            } else {
                document.querySelector(".warnings").style.opacity = "1";
            }
        }
    }

}


cancelbtn.addEventListener("click", hidePopUp);

document.querySelector('#popupForm').addEventListener("submit", toStoreName);


window.onload = () => {
    let xhr = new XMLHttpRequest();
    user = localStorage.getItem("user");
    if (user == null) {
        console.log("hell");
        xhr.open("GET", "../error/error.html", true);
        xhr.onload = () => {
            document.body.innerHTML = xhr.responseText;
        }
        xhr.send(null);
    } else {
        let formDat = new FormData();
        formDat.append("user", user);
        xhr.open("POST", "../GetHeadingInTrash");		
        xhr.send(formDat);
        xhr.onload = () => {
            if (xhr.status == 200) {
                for (const table of JSON.parse(xhr.responseText)) {
                    let form = document.createElement("div");
                    form.id = table["name"];
                    form.classList.add("form");
                    let name = document.createElement("h1");
                    name.classList.add("name");
                    name.textContent = table["name"];
                    form.append(name);

                    let datePara = document.createElement("p");
                    datePara.textContent = "Created on "
                    let date = document.createElement("span");
                    date.classList.add("date");
                    date.textContent = table["date"];
                    datePara.append(date);
                    form.append(datePara);

                    let numPara = document.createElement("p");
                    let num = document.createElement("strong");
                    num.classList.add("num");
                    num.innerText = table["num"];
                    numPara.append(num);
                    paraSpan = document.createElement("span");
                    paraSpan.textContent = " Submissions";
                    numPara.append(paraSpan);
                    form.append(numPara);

                    let buttons = document.createElement("div");
                    let share = document.createElement("i");
                    share.classList.add("bi");
                    share.setAttribute("id","share")
                    share.classList.add("bi-arrow-counterclockwise");
                    share.setAttribute("onclick", "toRetrive('"+table["name"]+"')");
                    //share.classList.add("share");

                    let trash = document.createElement("i");
                    trash.classList.add("bi");
                    trash.classList.add("bi-trash3");
                    trash.classList.add("trash");
                    trash.setAttribute("formName", table["name"]);
                    buttons.append(share, trash);
                    form.append(buttons);

                    document.getElementById("nothing").style.display = "none";
                    document.getElementById("forms").append(form);

                    formsCount++;
                }

                

                document.querySelectorAll(".trash").forEach(e => {
                    e.onclick = () => {
                        document.querySelector(".delete").style.display = "flex";
                        formName = e.getAttribute("formName");
                    }
                })
            }
        }
    }
}

/*to retrive from trash*/
const retrive = document.querySelectorAll("share");
function toRetrive(formName){
	event.preventDefault();
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("user", user);
    formData.append("formName", formName);
    xhr.open("POST", "../Retrive", true);
    xhr.send(formData);
    xhr.onload = () => {
        document.getElementById(formName).remove();
        formsCount--;
        if (formsCount == 0) {
            document.getElementById("nothing").style.display = "flex";
        }
        document.querySelector(".delete").style.display = "none";
    }
}
retrive.forEach(ele => {
	ele.onclick = (event) => {
	
}


})




document.getElementById("copy").onclick = () => {
    navigator.clipboard.writeText(document.getElementById("copy").getAttribute("link"));
    document.querySelector(".popup1>div>span").style.display = "block";
    setTimeout(() => {
        document.querySelector(".popup1>div>span").style.display = "none";
    }, 500);
}

document.getElementById("close").onclick = () => {
    let parent = document.getElementById("qrcode");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    document.querySelector(".popup1").style.display = "none";
}

document.getElementById("cancelDelete").onclick = () => {
    document.querySelector(".delete").style.display = "none";
}

document.getElementById("sureDelete").onclick = () => {
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    
    formData.append("user",user);
    formData.append("formName",formName);
    xhr.open("POST", "../DeleteFormInTrash", true);
    xhr.send(formData);
    console.log(user+" = "+formName);
    xhr.onload = () => {
        document.getElementById(formName).remove();
        formsCount--;
        if (formsCount == 0) {
            document.getElementById("nothing").style.display = "flex";
        }
        document.querySelector(".delete").style.display = "none";
    }
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


