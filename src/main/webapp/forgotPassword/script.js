const emailInput = document.querySelector('#email');
const Submit = document.querySelector('.btn');
    const wrong = document.getElementById("warn");
    const gif = document.getElementById("loading");
    Submit.addEventListener("click", forgot_pass);

    function forgot_pass(event) {
        event.preventDefault();
        if (emailInput.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
	        let formData = new FormData();
	        formData.append("mail", emailInput.value);
	        let validate = new XMLHttpRequest();
	        validate.open("POST", "../ForgotPassword");
	        validate.send(formData);
	        gif.style.display = "flex";
	        validate.onload = () => {
	            if (validate.responseText.trim() == "true") {
					gif.style.display = "none";
					warn.style.display = "none";
	                window.location = "../signin";
	            }
	            else{
					gif.style.display = "none";
	            	wrong.textContent = "Account Doesn't Exists!";
	                wrong.style.display = "block";
	            }
	        }
        }else{
        	wrong.textContent = "Invalid Email!";
        	wrong.style.display = "block";
        }
    }