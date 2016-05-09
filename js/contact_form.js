/*
------------------------------------------------------------
Function to activate form button to open the slider.
------------------------------------------------------------
*/
function open_panel() {
	slideIt();
	var a = document.getElementById("sidebar");
	a.setAttribute("id", "sidebar1");
	a.setAttribute("onclick", "close_panel()");
}
/*
------------------------------------------------------------
Function to slide the sidebar form (open form)
------------------------------------------------------------
*/
function slideIt() {
	var slidingDiv = document.getElementById("slider");
	var stopPosition = 0;
	if (parseInt(slidingDiv.style.right) < stopPosition) {
		slidingDiv.style.right = parseInt(slidingDiv.style.right) + 2 + "px";
		setTimeout(slideIt, 1);
	}
}
/*
------------------------------------------------------------
Function to activate form button to close the slider.
------------------------------------------------------------
*/
function close_panel() {
	slideIn();
	a = document.getElementById("sidebar1");
	a.setAttribute("id", "sidebar");
	a.setAttribute("onclick", "open_panel()");
}
/*
------------------------------------------------------------
Function to slide the sidebar form (slide in form)
------------------------------------------------------------
*/
function slideIn() {
	var slidingDiv = document.getElementById("slider");
	var stopPosition = -342;
	if (parseInt(slidingDiv.style.right) > stopPosition) {
		slidingDiv.style.right = parseInt(slidingDiv.style.right) - 2 + "px";
		setTimeout(slideIn, 1);
	}
}

function validateTextInput( input ){
	return input.length > 5
}

function validateEmail(email){	
	var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function contactFormInputValidate( ){
	
	var nameInput = document.getElementById("InputName").value ;
	var emailInput = document.getElementById("InputEmail").value ;
	var messageInput = document.getElementById("InputMessage").value ;

	if( validateTextInput( nameInput) && validateEmail( emailInput) && validateTextInput( messageInput) ) {
		$("#contactFormSubmit").removeAttr('disabled');
	}else{
		$("#contactFormSubmit").attr('disabled', true);
	}
}


$("#contactFormSubmit").click( function (e) {
	e.preventDefault();
	var nameInput = document.getElementById("InputName").value ;
	var emailInput = document.getElementById("InputEmail").value ;
	var messageInput = document.getElementById("InputMessage").value ;

	var jsonObject = {};
	jsonObject["mailFrom"] = "casaaltiani.mail.from";
	jsonObject["mailTo"] = "casaaltiani.mail.to";
	jsonObject["Subject"] = "Casa Altiani - Web Message ";
	jsonObject["Name"] = nameInput;
	jsonObject["Email"] = emailInput;
	jsonObject["Message"] = messageInput ;

	sendPostRequest("sendMail", JSON.stringify(jsonObject));
	document.getElementById("contactForm").reset();
	$("#contactFormSubmit").attr('disabled', true);
});



/* submit the POST request to the remote server */
function sendPostRequest( urlPath, requestBody ){

	$.ajax({ 
		url: "http://188.166.168.128:48101/" + urlPath, 
		//url: "http://localhost:8080/" + urlPath, 
		method : "POST",
		headers: {
			"Content-Type" : "application/json"
		},
		data : requestBody,
		dataType: 'json',

		complete: function() {
			console.log("post request complete")
		},

		success: function() {
			console.log("success sending the email!")
		},

		error: function(jqXHR, textStatus, errorThrown) {
			console.log("an error occured")
			console.log(jqXHR)
			console.log(textStatus)
			console.log(errorThrown)
		}
	});
}