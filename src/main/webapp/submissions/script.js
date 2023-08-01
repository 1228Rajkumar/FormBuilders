const ARRAY=[];
let formName = localStorage.getItem("currentForm");
document.getElementById("name").textContent = formName;
let formData = new FormData();
formData.append("form", formName);
formData.append("user", localStorage.getItem("user"));
let xhr = new XMLHttpRequest();
xhr.open("POST", "../GetHeadings");
xhr.send(formData);
xhr.onload = () => {
    let form = JSON.parse(xhr.response);
    creater(form);
}
function creater(form){
  let headingRow = document.createElement("tr");
    for (const title of form["headings"]) {
        let heading = document.createElement("th");
        heading.textContent = title;
        headingRow.append(heading);
    }
    document.getElementById("form").append(headingRow);
    if (form["len"] == 0) {
        document.querySelector(".empty").style.display = "flex";
    }else {
        document.querySelector(".empty").style.display = "none";
        for (let i = 0; i < Number(form["len"]); i++) {
            let dataRow = document.createElement("tr");
            if(i%2==0){
            	dataRow.setAttribute("class","tableRow");
            }
            let dum=0;
            for (const title of form["" + i]) {
            	dum++;
            	if(dum==1){
					ARRAY.push(title);
            		dataRow.setAttribute("id",title);
            		dataRow.setAttribute("onclick","darker("+title+")");
            	}else{
                let heading = document.createElement("td");
                heading.textContent = title;
                dataRow.append(heading);
            }
            	}
            document.getElementById("form").append(dataRow);
        }
    }
}

const a=[];
function darker(i){
	let trail=document.getElementById(i);
	trail.classList.toggle("mystyle");
	
	if(a.includes(i)==true){
		a.splice(a.indexOf(i),1);
	}
	else{
		a.push(i);
	}
	console.log(a);
} 

const ADD = document.getElementById("all");
//ADD.addEventListener("click",eraseAll);
ADD.addEventListener("click",darkerAll);
function darkerAll(){
	if(a.length!=ARRAY.length){
		for(var i=0; i<a.length; i++){
			console.log("len = "+a.length);
			let trail=document.getElementById(a[i]);
			trail.classList.toggle("mystyle");
			console.log("Before = "+a);	
		}
		a.length=0;
	}
	
	for(var i=0; i<ARRAY.length; i++){
		let trail=document.getElementById(ARRAY[i]);
		trail.classList.toggle("mystyle");
		if(a.includes(parseInt(ARRAY[i]))==true){
			a.splice(a.indexOf(parseInt(ARRAY[i])),1);
		}
		else{
			a.push(parseInt(ARRAY[i]));
		}
		
	}
	console.log(a);
	
}



const TRASH = document.getElementById("trash");
TRASH.addEventListener("click",erase);
function erase(event){
	event.preventDefault();
	let xhr = new XMLHttpRequest();	
	let formData = new FormData();
	formData.append("a", a);
	formData.append("user",localStorage.getItem("user"));
	formData.append("form",localStorage.getItem("currentForm"));
	xhr.open("POST", "../delete",true);
	xhr.send(formData);
	xhr.onload = () => {
	    console.log(xhr.response);
		location.reload();
		
  }
}



document.getElementById("download").onclick = function () {
    this.setAttribute("download", formName + ".csv");
    return ExcellentExport.csv(this, 'form');
}
document.getElementById("close").onclick = function () {
    localStorage.removeItem("currentForm");
    window.location = "../home";
}


window.addEventListener("storage",()=>{location.reload()});

