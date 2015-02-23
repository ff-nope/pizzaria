/**
 * 
 */

var http_request = null;
var url_retrieve = "http://192.168.1.10:7001/com.ff.pizza/api/v1/crud/retrieve";
var url_update   = "http://192.168.1.10:7001/com.ff.pizza/api/v1/crud/update";
var url_delete   = "http://192.168.1.10:7001/com.ff.pizza/api/v1/crud/delete";
var returnString = "";
var buf = "";
var pizza_found = false;
var response  = "";
var PI_PK = 0; // inicializando a variavel que vai hold a primary key


  
  
$(document).ready(function() {
	inicializa();	
});  

function deletaPizza(){
	var this_deletion_url = url_delete += "/"+  PI_PK.toString();
	alert ("entrei no deletaPizza com url : " + this_deletion_url );

	get_http_request();
	http_request.onreadystatechange = alertContents_delete;
    http_request.open("DELETE", this_deletion_url, false);
    http_request.setRequestHeader("Content-type", "application/json");
    http_request.send(prep(returnString));
    inicializa();
    cleanFields();
    var suicidal =document.getElementById("botaoDelete");
    document.getElementById("botaoDeleteDiv").removeChild(suicidal);
	
}



function create_button_delete() {
	
	var button = document.createElement("input");
    button.type = "button";
    button.id = "botaoDelete";
    button.value = "Deleta";
    button.onclick = function() {
    	deletaPizza();
    };
    document.getElementById("botaoDeleteDiv").appendChild(button);
	
}



function gravaDados(){

	get_http_request();
	http_request.onreadystatechange = alertContents_update;
    http_request.open("POST", url_update, false);
    http_request.setRequestHeader("Content-type", "application/json");
    http_request.send(prep(returnString));
    inicializa();
    cleanFields();
    
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
	
 	
 	//disable a edicao do nome da pizza
 	$("#PI_NOME").attr("disabled", true);
 	
 	//mostra o resto do registro da pizza
 	$("#pizza_campos").show();
 	
 	//create botao delete
 	create_button_delete();
 	 	
	//reconfigura o botao "Continua" para "Grava"
	$("#botaoMutante").attr("onclick", "gravaDados()");
	$("#botaoMutante").val("Grava");
	
	//coloca o focus no primeiro ingrediente da pizza
	$("#PI_ING01").focus();
	
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

    
//>>>>>>>>>>>>>>>>>>>>>>>>>               Plumbing



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


function alertContents_update()
{
	  //console.log("http_request.readyState " + http_request.readyState);
	  //console.log("http_request.status " + http_request.status);
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



function alertContents_delete()
{
	  //console.log("http_request.readyState " + http_request.readyState);
	  //console.log("http_request.status " + http_request.status);
	  if (http_request.readyState === 4) {
	    if (http_request.status === 200) 
	    {
	      response = JSON.parse(http_request.responseText);
	     } 
	    else 
	    {
	      alert('There was a problem with the deletion.');
	    }
	  }
}



function alertContents_retrieve() 
{
	  //console.log("http_request.readyState " + http_request.readyState);
	  //console.log("http_request.status " + http_request.status);
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






function cleanFields()
{
	   document.getElementById("PI_NOME").value = "";
	   document.getElementById("PI_ING01").value = "";
	   document.getElementById("PI_ING02").value = "";
	   document.getElementById("PI_ING03").value = "";
	   document.getElementById("TEMPO_FORNO").value = "";
	   //document.getElementById("cadastro").reset();
} 


function inicializa(){
	$("#PI_NOME").attr("disabled", false);
	$("#pizza_campos").hide();
	$("#botaoMutante").attr("onclick", "pegaDados()");
	$("#botaoMutante").val("Continua");
	//document.getElementById("PI_NOME").value = "Entre o nome da pizza";
	
	$("#PI_NOME").focus();
	// critica o tempo de forno, soh aceitando numeros
    $("#TEMPO_FORNO").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true)      || 
            // Allow: Ctrl+E
            (e.keyCode == 69 && e.ctrlKey === true)      || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        } // Now ensure the key is a number stopping the keypress if not a number
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    // Testa pela tecla ENTER no nome da pizza, e pressiona o botao caso o usuario tenha hit enter
    $("#PI_NOME").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
    	if (event.keyCode == 13) document.getElementById('botaoMutante').click();
    });
    
    // Limpa a variavel do nome da pizza quando a primeira tecla eh pressionada
    $("#PI_NOME").keypress(function() {
    	limpa(PI_NOME);
    });
}    
 