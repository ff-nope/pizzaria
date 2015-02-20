/**
 * 
 */

var http_request = null;
var url = "http://localhost:7001/com.ff.pizza/api/v1/crud/update";
var returnString = "";
var buf = "";
  
  
$(document).ready(function() {
		
	$("#pizza_campos").hide();
	
	
	
	
	
		//getInventory();
//		$(document.body).on('click', ':button, .DELETE_BTN', function(e) {
//		console.log(this);
//		var $this = $(this)
//			, PC_PARTS_PK = $this.val()
//			, obj = {PC_PARTS_PK : PC_PARTS_PK}
//			, $tr = $this.closest('tr')
//			, PC_PARTS_MAKER = $tr.find('.CL_PC_PARTS_MAKER').text()
//			, PC_PARTS_CODE = $tr.find('.CL_PC_PARTS_CODE').text();
//		
//		deleteInventory(obj, PC_PARTS_MAKER, PC_PARTS_CODE);
//	});
});  
 
function postJSON()
{
   get_http_request();
   http_request.onreadystatechange = alertContents;
   http_request.open("POST", url, true);
   http_request.setRequestHeader("Content-type", "application/json");
   http_request.send(prep(returnString));
   cleanFields();
}

  
// >>>>>>>>>>>>>>>>>>>>>>>>>               Plumbing
function alertContents() 
  {
	  console.log("http_request.readyState " + http_request.readyState);
	  console.log("http_request.status " + http_request.status);
	  if (http_request.readyState === 4) {
	    if (http_request.status === 200) 
	    {
	      var response = JSON.parse(http_request.responseText);
	      //alert("HTTP_CODE: " + response[0].HTTP_CODE);
	      //console.log("HTTP_CODE: " + response[0].HTTP_CODE);
	      document.getElementById("fromServer").innerHTML = "MSG: " + response[0].MSG;
	      alert("MSG: " + response[0].MSG);
	      document.getElementById("fromServer").innerHTML = "Resposta do backend aqui.";
	      //console.log("MSG: " + response[0].MSG);
	     } 
	    else 
	    {
	      alert('There was a problem with the request.');
	    }
	  }
  }
function get_http_request() 
  {
   http_request = new XMLHttpRequest();     
   try{
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
     }catch (e)
     {
      // Internet Explorer Browsers
      try{
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
           alert("Internet Explorer!");
      }catch (e) 
      {
         try{
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e)
         {
            // Something went wrong
            alert("Your browser broke!");
            return false;
         }
      }
    }  
  }
  
function prep(returnString)
  {
	    returnString = '{';
		returnString += '"PI_NOME": ' +'\"' + document.getElementById("PI_NOME").value +'\"'  ;  
		returnString += ',"PI_ING01": ' +'\"' + document.getElementById("PI_ING01").value +'\"'  ;  
		returnString += ',"PI_ING02": ' +'\"' + document.getElementById("PI_ING02").value +'\"'  ;  
		returnString += ',"PI_ING03": ' +'\"' + document.getElementById("PI_ING03").value +'\"'  ;  
		returnString += ',"TEMPO_FORNO": ' +'\"' + document.getElementById("TEMPO_FORNO").value +'\"'  ;  		
		returnString += '}';
        alert("returnString : " + returnString);
		return returnString;
 }
function cleanFields()
{
	   document.getElementById("PI_NOME").value = "";
	   document.getElementById("PI_ING01").value = "";
	   document.getElementById("PI_ING02").value = "";
	   document.getElementById("PI_ING03").value = "";
	   document.getElementById("TEMPO_FORNO").value = "";
	   //document.getElementById("cadastro").reset();
} 

