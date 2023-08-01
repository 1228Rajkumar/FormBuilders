let object, user, form;
let order = "";
let warningsCount = 0;
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
	user=urlParams.get("user");
	form=urlParams.get("form");
	
    if (user == null || form == null) {
        document.getElementById("incorrect").classList.add("error404");
        document.getElementById("thanks").style.display = "none";
        document.getElementById("form").style.display = "none";
    } else {
        document.getElementById("name").innerText = form;
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", "../FormJson?user=" + user + "&form=" + form, true);
        xhr.send();
        xhr.onload = () => {
            let obj = xhr.response;
            if (Object.keys(obj).length === 0) {
                document.getElementById("incorrect").classList.add("error404");
                document.getElementById("thanks").style.display = "none";
                document.getElementById("form").style.display = "none";
            } else {
                document.getElementById("incorrect").classList.remove("error404");
                document.getElementById("thanks").style.display = "none";
                document.getElementById("form").style.display = "block";
                object = JSON.parse(obj["formFields"]);
                order = obj["order"][0];
                loadform();
            }
        }
    }
}
let phoneInputs = {};
function loadform() {
    for (const key of order.split(",")) {
        if (key.startsWith("Rating")) {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput = document.createElement("div");
            for (let i = 1; i <= 5; i++) {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star", key);
                star.id = key + i;
                FieldInput.append(star);
            }
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput.id = key;
            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];
            FieldDiv.append(FieldLabel, FieldInput, instruct);
            document.getElementById("formFields").append(FieldDiv);
            FieldInput.setAttribute("value", "0");
            document.querySelectorAll("." + key).forEach(e => e.onclick = function () { starClick(this, key) })
        } else if (key.startsWith("Phone")) {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput = document.createElement("input");
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput.id = key;
            let warning = document.createElement("div");
            warning.classList.add("warn");
            warning.id = key + "warn";
            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];
            FieldDiv.append(FieldLabel, FieldInput, warning, instruct);
            document.getElementById("formFields").append(FieldDiv);
            if (object[key]["Mandatory"] == "true") {
                FieldLabel.innerHTML += "<span style='color:red;'>*</span>";
            }
            let i = window.intlTelInput(FieldInput, {
                preferredCountries: ['in', 'us', 'gb'],
                utilsScript: "phoneInput/js/utils.js",
            });
            phoneInputs[key] = i;
            FieldInput.setAttribute("empty", "");
            FieldInput.setAttribute("warnCount", "");
            let errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
            FieldInput.onblur = () => {
                let empty = Boolean(FieldInput.getAttribute("empty"));
                let warnCount = Boolean(FieldInput.getAttribute("warnCount"));
                let x = FieldInput.value.trim();
                if (object[key]["Mandatory"] == "true" && x == "") {
                    document.getElementById(FieldInput.id + "warn").textContent = "Enter a value for this field."
                    document.getElementById(FieldInput.id + "warn").style.display = "block";
                    if (!warnCount) {
                        warningsCount++;
                    }
                    empty = true;
                    warnCount = true;
                } else if (phoneInputs[key].isValidNumber()) {
                    document.getElementById(FieldInput.id + "warn").style.display = "none";
                    if (empty) {
                        warningsCount--;
                        empty = false;
                        warnCount = false;
                    } else if (warnCount) {
                        warningsCount--;
                        warnCount = false;
                    }
                } else {
                    var errorCode = phoneInputs[key].getValidationError();
                    errorCode = errorCode < 0 ? 2 : errorCode;
                    document.getElementById(FieldInput.id + "warn").style.display = "block";
                    document.getElementById(FieldInput.id + "warn").textContent = errorMap[errorCode];
                    if (empty) {
                        empty = false;
                    } else if (!warnCount) {
                        warningsCount++;
                        warnCount = true;
                    }
                }
                empty = empty == true ? "1" : "";
                warnCount = warnCount == true ? "1" : "";
                FieldInput.setAttribute("empty", empty);
                FieldInput.setAttribute("warnCount", warnCount);
            }
        } else if (key.startsWith("MultiLine")) {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput = document.createElement("textarea");
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput.setAttribute("type", object[key]["type"]);
            FieldInput.id = key;
            let warning = document.createElement("div");
            warning.classList.add("warn");
            warning.id = key + "warn";
            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];
            FieldDiv.append(FieldLabel, FieldInput, warning, instruct);
            document.getElementById("formFields").append(FieldDiv);
            if (object[key]["Mandatory"] == "true") {
                FieldLabel.innerHTML += "<span style='color:red;'>*</span>";
            }
            FieldInput.setAttribute("empty", "");
            FieldInput.setAttribute("warnCount", "");
            FieldInput.setAttribute("maxlength", object[key]["max"]);
            FieldInput.onblur = () => {
                let empty = Boolean(FieldInput.getAttribute("empty"));
                let warnCount = Boolean(FieldInput.getAttribute("warnCount"));
                let x = FieldInput.value.trim();
                if (object[key]["Mandatory"] == "true" && x == "") {
                    document.getElementById(FieldInput.id + "warn").textContent = "Enter a value for this field."
                    document.getElementById(FieldInput.id + "warn").style.display = "block";
                    if (!warnCount) {
                        warningsCount++;
                    }
                    empty = true;
                    warnCount = true;
                } else {
                    document.getElementById(FieldInput.id + "warn").style.display = "none";
                    warningsCount--;
                    empty = false;
                    warnCount = false;
                }
                empty = empty == true ? "1" : "";
                warnCount = warnCount == true ? "1" : "";
                FieldInput.setAttribute("empty", empty);
                FieldInput.setAttribute("warnCount", warnCount);
            }
        } else if (key.startsWith("Name")) {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput1 = document.createElement("input");
            let FieldInput2 = document.createElement("input");
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput1.setAttribute("type", object[key]["type"]);
            FieldInput2.setAttribute("type", object[key]["type"]);
            FieldInput1.id = "First" + key;
            FieldInput2.id = "Last" + key;
            FieldInput1.onblur = ()=>{
	            if (/^[a-zA-Z0-9]+$/.test(FieldInput1.value)) {
			        FieldInput1.setCustomValidity("");
		      	} else {
			        FieldInput1.setCustomValidity("Please enter alphabets and numbers only.");
		      	}
			}
			FieldInput2.onblur = ()=>{
	            if (/^[a-zA-Z0-9]+$/.test(FieldInput2.value)) {
			        FieldInput2.setCustomValidity("");
		      	} else {
			        FieldInput2.setCustomValidity("Please enter alphabets and numbers only.");
		      	}
			}
            
            FieldInput1.setAttribute("maxlength", object[key]["max"])
            FieldInput2.setAttribute("maxlength", object[key]["max"])
            FieldInput1.setAttribute("placeholder", "First Name");
            FieldInput2.setAttribute("placeholder", "Last Name");
            if (object[key]["Mandatory"] == "true") {
                FieldLabel.innerHTML += "<span style='color:red;'>*</span>";
                FieldInput1.setAttribute("required", true);
                FieldInput2.setAttribute("required", true);
            }
            let NameDiv = document.createElement("div");
            NameDiv.classList.add("name");
            NameDiv.append(FieldInput1, FieldInput2);
            
            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];
            FieldDiv.append(FieldLabel, NameDiv, instruct);
            document.getElementById("formFields").append(FieldDiv);
        } else if (key.startsWith("DateTime")) {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput = document.createElement("input");
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput.setAttribute("type", object[key]["type"]);
            FieldInput.setAttribute("placeholder", "DD-MM-YYYY hh:mm AM/PM");
            FieldInput.id = key;
            let icon = document.createElement("i");
            icon.classList.add("bi", "bi-calendar");
            icon.style.padding = "0 10px";
            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];
            FieldDiv.append(FieldLabel, FieldInput, icon, instruct);
            document.getElementById("formFields").append(FieldDiv);
            flatpickr(document.getElementById(key), {
                enableTime: true,
                dateFormat: 'd-m-Y H:i K',
                defaultHour: new Date().getHours(),
                defaultMinute: new Date().getMinutes()
            });
        } else if (key.startsWith("Date")) {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput = document.createElement("input");
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput.setAttribute("type", object[key]["type"]);
            FieldInput.setAttribute("placeholder", "DD-MM-YYYY");
            FieldInput.id = key;
            let icon = document.createElement("i");
            icon.classList.add("bi", "bi-calendar");
            icon.style.padding = "0 10px";
            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];
            FieldDiv.append(FieldLabel, FieldInput, icon, instruct);
            document.getElementById("formFields").append(FieldDiv);
            flatpickr(document.getElementById(key), {
                dateFormat: 'd-m-Y',
            });
        } else if (key.startsWith("Url")) {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput = document.createElement("input");
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput.setAttribute("type", object[key]["type"]);
            FieldInput.id = key;
            
            if (object[key]["type"]=="number") {
                FieldInput.setAttribute("max", Math.pow(10,Number(object[key]["max"])));
            } else {
                FieldInput.setAttribute("maxlength", object[key]["max"])
            }

            let warning = document.createElement("div");
            warning.classList.add("warn");
            warning.id = key + "warn";

            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];

            FieldDiv.append(FieldLabel, FieldInput, warning, instruct);
            let pattern = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$/ig;
            FieldInput.setAttribute("empty", "");
            FieldInput.setAttribute("warnCount", "");
            document.getElementById("formFields").append(FieldDiv);
            FieldInput.onblur = () => {
                let empty = Boolean(FieldInput.getAttribute("empty"));
                let warnCount = Boolean(FieldInput.getAttribute("warnCount"));
                let x = FieldInput.value;
                if (x.match(pattern)) {
                    document.getElementById(FieldInput.id + "warn").style.display = "none";
                    if (empty) {
                        warningsCount--;
                        empty = false;
                        warnCount = false;
                    } else if (warnCount) {
                        warningsCount--;
                        warnCount = false;
                    }

                } else if (object[key]["Mandatory"] == "true" && FieldInput.value == "") {
                    document.getElementById(FieldInput.id + "warn").textContent = "Enter a value for this field."
                    document.getElementById(FieldInput.id + "warn").style.display = "block";
                    if (!warnCount) {
                        warningsCount++;
                    }
                    empty = true;
                    warnCount = true;
                } else {
                    document.getElementById(FieldInput.id + "warn").style.display = "block";
                    document.getElementById(FieldInput.id + "warn").textContent = "Enter a valid website. (eg: www.domain.com)";
                    if (empty) {
                        empty = false;
                    } else if (!warnCount) {
                        warningsCount++;
                        warnCount = true;
                    }
                }
                empty = empty == true ? "1" : "";
                warnCount = warnCount == true ? "1" : "";
                FieldInput.setAttribute("empty", empty);
                FieldInput.setAttribute("warnCount", warnCount);
            }
        } else if (key.startsWith("Email")) {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput = document.createElement("input");
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput.setAttribute("type", object[key]["type"]);
            FieldInput.id = key;
            FieldInput.setAttribute("maxlength", object[key]["max"]);
            let warning = document.createElement("div");
            warning.classList.add("warn");
            warning.id = key + "warn";

            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];

            FieldDiv.append(FieldLabel, FieldInput, warning, instruct);

            if (object[key]["Mandatory"] == "true") {
                FieldLabel.innerHTML += "<span style='color:red;'>*</span>";
                FieldInput.setAttribute("required", true);
            }
            let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            FieldInput.setAttribute("empty", "");
            FieldInput.setAttribute("warnCount", "");
            document.getElementById("formFields").append(FieldDiv);
            FieldInput.onblur = () => {
                let empty = Boolean(FieldInput.getAttribute("empty"));
                let warnCount = Boolean(FieldInput.getAttribute("warnCount"));
                let x = FieldInput.value;
                if (x.match(pattern)) {
                    document.getElementById(FieldInput.id + "warn").style.display = "none";
                    if (empty) {
                        warningsCount--;
                        empty = false;
                        warnCount = false;
                    } else if (warnCount) {
                        warningsCount--;
                        warnCount = false;
                    }

                } else if (object[key]["Mandatory"] == "true" && FieldInput.value == "") {
                    document.getElementById(FieldInput.id + "warn").textContent = "Enter a value for this field."
                    document.getElementById(FieldInput.id + "warn").style.display = "block";
                    if (!warnCount) {
                        warningsCount++;
                        empty = true;
                        warnCount = true;
                    }
                } else {
                    document.getElementById(FieldInput.id + "warn").style.display = "block";
                    document.getElementById(FieldInput.id + "warn").textContent = "Enter a valid email. (eg: example@example.com)";
                    if (empty) {
                        empty = false;
                    } else if (!warnCount) {
                        warningsCount++;
                        warnCount = true;
                    }
                }
                empty = empty == true ? "1" : "";
                warnCount = warnCount == true ? "1" : "";
                FieldInput.setAttribute("empty", empty);
                FieldInput.setAttribute("warnCount", warnCount);
            }
        } else {
            let FieldDiv = document.createElement("div");
            let FieldLabel = document.createElement("label");
            let FieldInput = document.createElement("input");
            FieldLabel.innerText = object[key]["FieldName"];
            FieldInput.setAttribute("type", object[key]["type"]);
            FieldInput.id = key;
            if (object[key]["type"] == "number") {
                FieldInput.setAttribute("max", 10 ** object[key]["max"])
            } else {
                FieldInput.setAttribute("maxlength", object[key]["max"])
            }
            if (object[key]["Mandatory"] == "true") {
                FieldLabel.innerHTML += "<span style='color:red;'>*</span>";
                FieldInput.setAttribute("required", true);
            }
            let instruct = document.createElement("div");
            instruct.classList.add("instructions");
            instruct.textContent = object[key]["instruction"];
            FieldDiv.append(FieldLabel, FieldInput, instruct);
            document.getElementById("formFields").append(FieldDiv);
        }
    }
    let BtnDiv = document.createElement("div");
    let btn = document.createElement("input");
    btn.setAttribute("type", "submit");
    btn.id = "sub";
    btn.classList.add("submit");
    BtnDiv.style.textAlign = "center";
    BtnDiv.append(btn);
    document.getElementById("formFields").append(BtnDiv);
    document.getElementById("formFields").onsubmit = submitting;
    validaters();
}

function validaters() {
    document.querySelectorAll(".url").forEach(
        e => {
            e.onblur = () => {

            }
        }
    )
}


function submitting(event) {
    event.preventDefault();
    if (warningsCount <= 0) {
        let x = order.split(",");
        console.log(x);
        let data = {};
        for (let i of x) {
            if (i.startsWith("Name")) {
				let val1 = document.getElementById("First" + i).value;
				val1=val1.replaceAll(`'`,`\\'`);
                val1=val1.replaceAll(`"`,`\\"`);
                val1=val1.replaceAll(`\\`,`\\\\`);
				let val2 = document.getElementById("Last" + i).value;
				val2=val2.replaceAll(`'`,`\\'`);
                val2=val2.replaceAll(`"`,`\\"`);
                val2=val2.replaceAll(`\\`,`\\\\`);
                data[i] = document.getElementById("First" + i).value + "-" + document.getElementById("Last" + i).value;
                document.getElementById("First" + i).value = "";
                document.getElementById("Last" + i).value = "";
            } else if (i.startsWith("Rating")) {
                data[i] = document.getElementById(i).getAttribute("value");
            }
            else {
                value = document.getElementById(i).value;
                value=value.replaceAll(`'`,`\\'`);
                value=value.replaceAll(`"`,`\\"`);
                value=value.replaceAll(`\\`,`\\\\`);
                console.log(value);
                data[i] = value;
                document.getElementById(i).value = "";
            }
        }
        let formData = new FormData();
        formData.append("user", user);
        formData.append("formName", form);
        formData.append("data", JSON.stringify(data));
        console.log(data);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../InsertData");
        xhr.send(formData);
        xhr.onload = () => {
            if (xhr.status == 200) {
                if (xhr.responseText == 200) {
                    document.getElementById("form").style.display = "none";
                    document.getElementById("thanks").style.display = "block";
                }
            }
        }
    } else {
        let notify = document.createElement("div");
        notify.textContent = "Invalid Entries Found!";
        notify.classList.add("notify");
        notify.style.display = "block";
        notify.style.opacity = 0;
    }

}
document.getElementById("again").onclick = () => {
    location.reload();
}

function starClick(e, key) {
    let x = e.id;
    x = Number(x[x.length - 1]);
    if (e.classList.contains("bi-star")) {
        for (let i = 1; i <= x; i++) {
            document.getElementById(key + i).classList.remove("bi-star");
            document.getElementById(key + i).classList.add("bi-star-fill");

        }
        for (let i = x + 1; i <= 5; i++) {
            document.getElementById(key + i).classList.remove("bi-star-fill");
            document.getElementById(key + i).classList.add("bi-star");

        }
        document.getElementById(key).setAttribute("value", x);
    } else {
        if (x < 5) {
            if (document.getElementById(key + (x + 1)).classList.contains("bi-star")) {
                for (let i = 1; i <= x; i++) {
                    document.getElementById(key + i).classList.remove("bi-star-fill");
                    document.getElementById(key + i).classList.add("bi-star");
                }
            } else {
                for (let i = x + 1; i <= 5; i++) {
                    document.getElementById(key + i).classList.remove("bi-star-fill");
                    document.getElementById(key + i).classList.add("bi-star");

                }
                document.getElementById(key).setAttribute("value", x);
            }
        } else {
            for (let i = 1; i <= 5; i++) {
                document.getElementById(key + i).classList.remove("bi-star-fill");
                document.getElementById(key + i).classList.add("bi-star");
            }
        }
    }
}

window.addEventListener("storage",()=>{location.reload()});