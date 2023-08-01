let bool = false;
let x1 = x2 = fieldCount = 0;
const t = document.querySelector("main>div");
const main = document.getElementById("choosenFields");
const empty = document.getElementById("Empty");
let thisId;
let fieldsIdObject = {
    "Name": 0,
    "Number": 0,
    "Email": 0,
    "Phone": 0,
    "MultiLine": 0,
    "SingleLine": 0,
    "Date": 0,
    "DateTime": 0,
    "Url": 0,
    "Rating": 0,
}
const defaultProperties = {
    "Name": {
        "type": "name",
        "FieldName": "Name",
        "Mandatory": "true",
        "instruction": "",
        "max": "30"
    },
    "Number": {
        "type": "number",
        "FieldName": "Number",
        "Mandatory": "true",
        "instruction": "",
        "max": "10"
    },
    "Email": {
        "type": "email",
        "FieldName": "Email",
        "Mandatory": "true",
        "instruction": "",
        "max": "100"
    },
    "Phone": {
        "type": "number",
        "FieldName": "Phone",
        "Mandatory": "true",
        "instruction": "",
        "max": "20"
    },
    "SingleLine": {
        "type": "text",
        "FieldName": "SingleLine",
        "Mandatory": "false",
        "instruction": "",
        "max": "30"
    },
    "MultiLine": {
        "FieldName": "MultiLine",
        "Mandatory": "false",
        "instruction": "",
        "max": "150"
    },
    "Date": {
        "type": "text",
        "FieldName": "Date",
        "Mandatory": "false",
        "instruction": "",
        "max": "20"
    },
    "DateTime": {
        "type": "text",
        "FieldName": "DateTime",
        "Mandatory": "false",
        "instruction": "",
        "max": "20"
    },
    "Url": {
        "type": "text",
        "FieldName": "Url",
        "Mandatory": "false",
        "instruction": "",
        "max": "50"
    },
    "Rating": {
        "FieldName": "Rating",
        "instruction": "",
        "max": "10"
    }
}
let fields = {};

window.onload = ()=>{
	let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "../FormJson?user=" + localStorage.getItem("user") + "&form=" + localStorage.getItem("formName"), true);
    xhr.send();
    xhr.onload = () => {
        let obj = xhr.response;
        fields = JSON.parse(obj["formFields"]);
        let order = obj["order"][0].split(",");
        fieldsIdObject = JSON.parse(obj["fieldIds"][0]);
        console.log(fields);
        console.log(fieldsIdObject);
        for(let i=0;i<order.length;i++){
			empty.style.display = "none";
			let child = document.createElement("div");
            child.classList.add("draggable");
            child.draggable = true;
            let text = document.createElement("span");
            text.textContent = fields[order[i]]["FieldName"];
            let deleteBtn = document.createElement("i");
            deleteBtn.setAttribute("class", "bi bi-trash3 trash");
            deleteBtn.setAttribute("fieldId", order[i]);
            deleteBtn.style.display = "none";
                deleteBtn.style.opacity = "0";
                deleteBtn.onclick = deleteField;
                child.onmouseenter = ()=>{
					deleteBtn.style.display = "block";
					deleteBtn.style.opacity = "1";
				};
				child.onmouseleave = ()=>{
					deleteBtn.style.display = "none";
					deleteBtn.style.opacity = "0";
				};
            child.append(text, deleteBtn);
            child.setAttribute("id", order[i]);
            child.setAttribute("focused", "false");
            child.onclick = fieldClick;
            document.getElementById("build").removeAttribute("disabled");
            child.addEventListener("dragstart", function (e) {
                child.click();
                child.style.color = "transparent";
                child.style.backgroundColor = "#2691d921";
                child.classList.add("dragging");
                let childClone = this.cloneNode(true);
                childClone.style.width = "200px";
                childClone.style.height = "50px";
                childClone.style.padding = "10px";;
                childClone.style.backgroundColor = "#fff";
                childClone.style.color = "#2691d9";
                childClone.style.border = "2px dotted #2691d9";
                childClone.textContent = child.textContent;
                childClone.style.cursor = "move";
                document.body.append(childClone);
                e.dataTransfer.setDragImage(childClone, 100, 25);
            }, false);
            child.addEventListener("dragend", () => {
                child.style.backgroundColor = "#fff";
                child.style.border = "2px dotted #2691d9";
                child.style.color = "#2691d9";
                child.classList.remove("dragging");
            })
            main.insertBefore(child, blueField);
            t.style.display = "none";
            fieldCount++;
            child.click();
		}
    }
    if (!(localStorage.getItem("user") && localStorage.getItem("formName"))) {
        let xhr1 = new XMLHttpRequest();
        xhr1.open("GET", "../error/error.html", true);
        xhr1.onload = () => {
            document.body.innerHTML = xhr.responseText;
        }
        xhr1.send(null);
        fields = localStorage.getItem("formFields");
    }
}

document.querySelector(".edit").onclick = ()=>{
	document.querySelector(".popup").style.display = "none";
	document.getElementById("qrcode").innerHTML = "";
}

let x = [main.offsetLeft, main.offsetLeft + main.offsetWidth];
let y = [main.offsetTop, main.offsetTop + main.offsetHeight];
function addField() {
    bool = true;
    t.textContent = this.getAttribute("fieldName");
    t.style.display = "block";
    x1 = event.clientX;
    y1 = event.clientY;
    t.style.left = x1 - 100 + "px";
    t.style.top = y1 - 75 + "px";
}
document.querySelectorAll(".fields>section>div").forEach((e) => {
    e.onmousedown = addField;
})
let blueField;
let removeBlue = false;
window.onmousemove = (event) => {
    if (bool) {
        t.style.display = "block";
        x = event.clientX;
        y = event.clientY;
        t.style.left = x - 100 + "px";
        t.style.top = y - 100 + "px";
        if ((main.offsetLeft <= event.clientX) && (event.clientX <= main.offsetLeft + main.offsetWidth) && main.offsetTop <= event.clientY && (event.clientY <= main.offsetTop + main.offsetHeight)) {
            if (blueField) {
                main.removeChild(blueField);
                blueField = undefined;
            }
            blueField = document.createElement("section");
            blueField.innerText = "a";
            blueField.classList.add("bluediv");
            blueField.style.display = "block";
            let insertBefore = hello(main, event.clientY);
            main.insertBefore(blueField, insertBefore);
            removeBlue = true
        } else if (removeBlue) {
            main.removeChild(blueField);
            blueField = undefined;
            removeBlue = false;
        }
    }
}
window.onmouseup = (event) => {
    if (bool) {
        bool = false;
        if (fieldCount == 0) {
            if ((empty.offsetLeft <= event.clientX) && (event.clientX <= empty.offsetLeft + empty.offsetWidth) && empty.offsetTop <= event.clientY && (event.clientY <= empty.offsetTop + empty.offsetHeight)) {
                empty.style.display = "none";
                let child = document.createElement("div");
                child.classList.add("draggable");
                child.draggable = true;
                let text = document.createElement("span");
                text.textContent = t.textContent;
                let deleteBtn = document.createElement("i");
                deleteBtn.setAttribute("class", "bi bi-trash3 trash");
                deleteBtn.setAttribute("fieldId", t.textContent + fieldsIdObject[t.textContent]);
                deleteBtn.style.display = "none";
                deleteBtn.style.opacity = "0";
                deleteBtn.onclick = deleteField;
                child.onmouseenter = ()=>{
					deleteBtn.style.display = "block";
					deleteBtn.style.opacity = "1";
				};
				child.onmouseleave = ()=>{
					deleteBtn.style.display = "none";
					deleteBtn.style.opacity = "0";
				};
                child.append(text, deleteBtn);
                child.setAttribute("id", t.textContent + fieldsIdObject[t.textContent]);
                child.setAttribute("focused", "false");
                fields[child.id] = defaultProperties[t.textContent];
                fieldsIdObject[t.textContent] += 1;
                child.onclick = fieldClick;
                document.getElementById("build").removeAttribute("disabled");
                child.addEventListener("dragstart", function (e) {
                    child.click();
                    child.style.color = "transparent";
                    child.style.backgroundColor = "#2691d921";
                    child.classList.add("dragging");
                    let childClone = this.cloneNode(true);
                    childClone.style.width = "200px";
                    childClone.style.height = "50px";
                    childClone.style.padding = "10px";;
                    childClone.style.backgroundColor = "#fff";
                    childClone.style.color = "#2691d9";
                    childClone.style.border = "2px dotted #2691d9";
                    childClone.textContent = child.textContent;
                    childClone.style.cursor = "move";
                    document.body.append(childClone);
                    e.dataTransfer.setDragImage(childClone, 100, 25);
                }, false);
                child.addEventListener("dragend", () => {
                    child.style.backgroundColor = "#fff";
                    child.style.border = "2px dotted #2691d9";
                    child.style.color = "#2691d9";
                    child.classList.remove("dragging");
                })
                main.insertBefore(child, blueField);
                t.style.display = "none";
                fieldCount++;
                child.click();
                main.removeChild(blueField);
                blueField = undefined;
                removeBlue = false;
            } else {
                t.style.transition = "0.5s";
                t.style.left = x1 - 100 + "px";
                t.style.top = y1 - 75 + "px";
                setTimeout(() => {
                    t.style.display = "none";
                    t.style.transition = "0s";
                }, 500);
            }
        } else {
            if ((main.offsetLeft <= event.clientX) && (event.clientX <= main.offsetLeft + main.offsetWidth) && main.offsetTop <= event.clientY && (event.clientY <= main.offsetTop + main.offsetHeight)) {
                let child = document.createElement("div");
                child.classList.add("draggable");
                child.draggable = true;
                let text = document.createElement("span");
                text.textContent = t.textContent;
                let deleteBtn = document.createElement("i");
                deleteBtn.setAttribute("class", "bi bi-trash3 trash");
                deleteBtn.setAttribute("fieldId", t.textContent + fieldsIdObject[t.textContent]);
                deleteBtn.style.display = "none";
                deleteBtn.style.opacity = "0";
                deleteBtn.onclick = deleteField;
                child.onmouseenter = ()=>{
					deleteBtn.style.display = "block";
					deleteBtn.style.opacity = "1";
				};
				child.onmouseleave = ()=>{
					deleteBtn.style.display = "none";
					deleteBtn.style.opacity = "0";
				};
                child.append(text, deleteBtn);
                child.setAttribute("id", t.textContent + fieldsIdObject[t.textContent]);
                child.setAttribute("focused", "false");
                fields[child.id] = defaultProperties[t.textContent];
                fieldsIdObject[t.textContent] += 1;
                child.onclick = fieldClick;
                document.getElementById("build").removeAttribute("disabled");
                child.addEventListener("dragstart", function (e) {
                    child.click();
                    child.style.color = "transparent";
                    child.style.backgroundColor = "#2691d921";
                    child.classList.add("dragging");
                    let childClone = this.cloneNode(true);
                    childClone.style.width = "200px";
                    childClone.style.height = "50px";
                    childClone.style.padding = "10px";;
                    childClone.style.backgroundColor = "#fff";
                    childClone.style.color = "#2691d9";
                    childClone.style.border = "2px dotted #2691d9";
                    childClone.textContent = child.textContent;
                    childClone.style.cursor = "move";
                    document.body.append(childClone);
                    e.dataTransfer.setDragImage(childClone, 100, 25);

                }, false);
                child.addEventListener("dragend", () => {
                    child.style.backgroundColor = "#fff";
                    child.style.border = "2px dotted #2691d9";
                    child.style.color = "#2691d9";
                    child.classList.remove("dragging");
                })

                main.insertBefore(child, blueField);
                t.style.display = "none";
                fieldCount++;

                main.removeChild(blueField);
                blueField = undefined;
                removeBlue = false;
                child.click();
                window.onbeforeunload = (event) => {
                    event.preventDefault();
                }
            } else {
                t.style.transition = "0.5s";
                t.style.left = x1 - 100 + "px";
                t.style.top = y1 - 75 + "px";
                setTimeout(() => {
                    t.style.display = "none";
                    t.style.transition = "0s";
                }, 500);
            }
        }
    }
}

main.addEventListener("dragover", (event) => {
    event.preventDefault();
    const insertAfter = hello(main, event.clientY);
    if (insertAfter == null) {
        main.append(document.querySelector(".dragging"));
    } else {
        main.insertBefore(document.querySelector(".dragging"), insertAfter);
    }
})

function hello(main, y) {
    return [...main.querySelectorAll(".draggable:not(.dragging)")].reduce((closest, child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


function deleteField(event) {
	event.stopPropagation();
    delete fields[this.getAttribute("fieldId")];
    fieldCount--;
    if (fieldCount == "0") {
        document.getElementById("build").setAttribute("disabled", true);
        empty.style.display = "flex";
    }
    if (this.parentElement.getAttribute("focused")=="true" && fieldCount>0){
		let child;
		if (main.firstElementChild==this.parentElement){
			child = this.parentElement.nextSibling;
		}else{
			child = this.parentElement.previousSibling;
		}
		document.querySelectorAll("#choosenFields>div").forEach(e => {
	        e.style.border = "2px solid";
	        e.style.color = "#000";
	        e.setAttribute("focused", "false");
	    })
	    if (child.getAttribute("focused") == "false") {
	        child.style.border = "2px dotted #2691d9";
	        child.style.color = "#2691d9";
	        child.setAttribute("focused", "true");
	        thisId = child.id;
	        getProperties(thisId);
	    }
	}
    main.removeChild(document.getElementById(this.getAttribute("fieldId")));
}
function fieldClick() {
    document.querySelectorAll("#choosenFields>div").forEach(e => {
        e.style.border = "2px solid";
        e.style.color = "#000";
        e.setAttribute("focused", "false");
    })
    if (this.getAttribute("focused") == "false") {
        this.style.border = "2px dotted #2691d9";
        this.style.color = "#2691d9";
        this.setAttribute("focused", "true");
        thisId = this.id;
        getProperties(thisId);
    }
}

function getProperties(ele) {
    if (ele.startsWith("Rating")) {
        let field = fields[ele];
        document.getElementById("displayName").value = field["FieldName"];
        document.getElementById("instruct").value = field["instruction"];
        document.getElementById("props").style.display = "none";
    } else {
        document.getElementById("props").style.display = "block";
        let field = fields[ele];
        document.getElementById("displayName").value = field["FieldName"];
        document.getElementById("instruct").value = field["instruction"];
        if (field["Mandatory"] == 'true') {
            document.getElementById("isMandatory").checked = true;
        } else {
            document.getElementById("isMandatory").checked = false;
        }
        document.getElementById("maxLength").value = field["max"];
    }
}

document.querySelectorAll("#properties input, #instruct").forEach(
    (e) => {
        e.oninput = () => {
            if (document.getElementById("displayName").value == "") {
                document.getElementById("emptyFieldName").style.display = "block";
                document.getElementById("build").onclick = ""
                document.querySelectorAll("#choosenFields>div").forEach(e => e.onclick = "");
                document.querySelectorAll(".fields>section>div").forEach((e) => {
                    e.onmousedown = "";
                })
                document.querySelectorAll(".trash").forEach(e => e.onclick = '');
                document.getElementById("displayName").focus();

            }
            else if (document.getElementById("maxLength").value > 255 || document.getElementById("maxLength").value < 1) {
                document.getElementById("invalidLength").style.display = "block";
                document.getElementById("build").onclick = "";
                document.querySelectorAll("#choosenFields>div").forEach(e => e.onclick = "");
                document.querySelectorAll(".fields>section>div").forEach((e) => {
                    e.onmousedown = "";
                })
                document.querySelectorAll(".trash").forEach(e => e.onclick = '');
                document.getElementById("maxLength").focus();
            }
            else {
                validOptions();
            }
            setProperties();
        }
    }
)

function validOptions() {
    document.getElementById("emptyFieldName").style.display = "none";
    document.getElementById("invalidLength").style.display = "none";
    document.getElementById("build").onclick = buildForm;
    document.querySelectorAll("#choosenFields>div").forEach(e => e.onclick = fieldClick);
    document.getElementById("build").onclick = buildForm;
    document.querySelectorAll(".fields>section>div").forEach((e) => {
        e.onmousedown = addField;
    })
    document.querySelectorAll(".trash").forEach(e => e.onclick = deleteField);
}

function setProperties() {
    let field = {};
    if (!thisId.startsWith("Rating")) {
        field["FieldName"] = document.getElementById("displayName").value;
        document.querySelector("#" + thisId + " span").textContent = document.getElementById("displayName").value;
        field["Mandatory"] = "" + document.getElementById("isMandatory").checked;
        field["instruction"] = document.getElementById("instruct").value;
        field["max"] = document.getElementById("maxLength").value;
        fields[thisId] = field;
    } else {
        field["FieldName"] = document.getElementById("displayName").value;
        field["instruction"] = document.getElementById("instruct").value;
        document.querySelector("#" + thisId + " span").textContent = document.getElementById("displayName").value;
        field["max"] = "10";
        fields[thisId] = field;
    }
}
document.getElementById("build").onclick = buildForm;
function buildForm() {
    let fieldList = "";
    document.querySelectorAll("#choosenFields>div").forEach(e => {
        fieldList += e.id + ",";
    });
    fieldList = fieldList.substring(0, fieldList.length - 1);
    let formData = new FormData();
    formData.append("fields", JSON.stringify(fields));
    formData.append("order", fieldList);
    formData.append("formName", localStorage.getItem("formName"));
    formData.append("user", localStorage.getItem("user"));
    formData.append("fieldIds", JSON.stringify(fieldsIdObject));
    let today = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    formData.append("date", today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear());
    
    let xhr = new XMLHttpRequest();
	xhr.open("POST", "../Edit", true);
	xhr.onload = () => {
		let currentLocation = window.location.href;
        currentLocation = currentLocation.split("/");
        currentLocation = currentLocation.slice(0,currentLocation.length-2);
        let link = currentLocation.join("/")+ "/form?user=" + localStorage.getItem("user") + "&form=" + localStorage.getItem("formName");
        new QRCode(document.getElementById("qrcode"), link);
        document.querySelector(".popup").style.display = "flex";
        document.getElementById("copy").setAttribute("link", link);
	}
	xhr.send(formData);
}

document.getElementById("close").onclick = () => {
    window.location = "../home";
}

document.getElementById("copy").onclick = () => {
    navigator.clipboard.writeText(document.getElementById("copy").getAttribute("link"));
    document.querySelector(".popup>div>span").style.display = "block";
    setTimeout(() => {
        document.querySelector(".popup>div>span").style.display = "none";
    }, 500);
}
  

window.addEventListener("storage",()=>{location.reload()});