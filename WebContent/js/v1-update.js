/**
 * 
 */

var http_request = null;
var url_retrieve = "http://192.168.1.10:7001/com.ff.pizza/api/v1/crud/retrieve";
var url_update   = "http://192.168.1.10:7001/com.ff.pizza/api/v1/crud/update";
var returnString = "";
var buf = "";
var pizza_found = false;
var response  = "";
var PI_PK = 0; // inicializando a variavel que vai hold a primary key


  
  
$(document).ready(function() {
	inicializa();	
});  


function gravaDados(){

	get_http_request();
	http_request.onreadystatechange = alertContents_update;
    http_request.open("POST", url_update, false);
    http_request.setRequestHeader("Content-type", "application/json");
    http_request.send(prep(returnString));
    inicializa();
    
}

function alertContents_update()
{
	  console.log("http_request.readyState " + http_request.readyState);
	  console.log("http_request.status " + http_request.status);
	  if (http_request.readyState === 4) {
	    if (http_request.status === 200) 
	    {
	      response = JSON.parse(http_request.responseText);
	     } 
	    else 
	    {
	      alert('There was a problem with the request.');
	    }
	  }
}

function pegaDados(){
	if (! processa_pizza_nome()){
		alert ("Por favor digite o nome");
		document.fpizza_nome.PI_NOME.focus();
		return false;
	}
	
	JPI_NOME = '{';
	JPI_NOME += '"PI_NOME": ' +'\"' + document.getElementById("PI_NOME").value +'\"'  ;  
	JPI_NOME += '}';
    //alert("JPI_NOME : " + JPI_NOME);
	
    get_http_request();
	
    http_request.onreadystatechange = alertContents_retrieve;
    http_request.open("POST", url_retrieve, false);
    http_request.setRequestHeader("Content-type", "application/json");
    http_request.send(JPI_NOME);
	
	
	if (! pizza_found){
		document.fpizza_nome.PI_NOME.focus();
  		return false;
	}
	PI_PK = response[0].PI_PK;
 	document.getElementById("PI_ING01").value =  response[0].PI_ING01;
 	document.getElementById("PI_ING02").value =  response[0].PI_ING02;
 	document.getElementById("PI_ING03").value =  response[0].PI_ING03;
 	document.getElementById("TEMPO_FORNO").value =  response[0].TEMPO_FORNO;
	
 	$("#PI_NOME").attr("disabled", true);
 	$("#pizza_campos").show();
	
	$("#botaoMutante").attr("onclick", "gravaDados()");
	$("#botaoMutante").val("Grava");
	$("#PI_ING01").focus();
	
}

function alertContents_retrieve() 
{
	  console.log("http_request.readyState " + http_request.readyState);
	  console.log("http_request.status " + http_request.status);
	  if (http_request.readyState === 4) {
	    if (http_request.status === 200) 
	    {
	      response = JSON.parse(http_request.responseText);
	      pizza_found = true;
	     } 
	    else 
	    {
	    	alert ("Pizza " +  document.getElementById("PI_NOME").value  +" nao encontrada no banco de dados.");
	    	pizza_found = false;
	    }
	  }
}


function processa_pizza_nome(){
	var localNome = document.getElementById("PI_NOME").value;
	var length_PI_NOME = localNome.length;
	if (length_PI_NOME == 0){
		alert("length de zero");
		return false;
	}
	if (localNome == "Entre o nome da pizza"){
		alert("foi direto no botao");
		return false;
	}
	return true;
	
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


function limpa(var1){
	//console.log("var1.value.length :" + var1.value.length);
	if (var1.value == "Entre o nome da pizza"){
		(var1).value = "";
		//alert("passei na limpa");
		return false;
	}
	
	
	
	
}

function prep(returnString)
{
	    returnString = '{';
	    returnString += '"PI_PK": ' +'\"' + PI_PK.toString() +'\"'  ;  
		returnString += ',"PI_NOME": ' +'\"' + document.getElementById("PI_NOME").value +'\"'  ;  
		returnString += ',"PI_ING01": ' +'\"' + document.getElementById("PI_ING01").value +'\"'  ;  
		returnString += ',"PI_ING02": ' +'\"' + document.getElementById("PI_ING02").value +'\"'  ;  
		returnString += ',"PI_ING03": ' +'\"' + document.getElementById("PI_ING03").value +'\"'  ;  
		returnString += ',"TEMPO_FORNO": ' +'\"' + document.getElementById("TEMPO_FORNO").value +'\"'  ;  		
		returnString += '}';
		// alert("returnString : " + returnString);
		return returnString;
}

function inicializa(){
	$("#PI_NOME").attr("disabled", false);
	$("#pizza_campos").hide();
	$("#botaoMutante").attr("onclick", "pegaDados()");
	$("#botaoMutante").val("Continua");
	document.getElementById("PI_NOME").value = "Entre o nome da pizza";
	$("#PI_NOME").focus();

}


// >>>>>>>>>>>>>>>>>>>>>>>>>               Plumbing



function cleanFields()
{
	   document.getElementById("PI_NOME").value = "";
	   document.getElementById("PI_ING01").value = "";
	   document.getElementById("PI_ING02").value = "";
	   document.getElementById("PI_ING03").value = "";
	   document.getElementById("TEMPO_FORNO").value = "";
	   //document.getElementById("cadastro").reset();
} 

