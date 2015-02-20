package com.ff.pizza.crud;


import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import com.ff.pizza.dao.*;


@Path("/v1/crud")
public class V1_crud {

	@Path("/cadastro")
	@POST
	@Consumes ({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces (MediaType.APPLICATION_JSON)
	public Response addPizza(String incomingData) throws Exception {

		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		DbPizza dao = new DbPizza();
		
		try {
			System.out.println(">>>      incomingData : " + incomingData);
			JSONObject partsData = new JSONObject(incomingData);
			System.out.println("partsData   : " + partsData.toString());


			int http_code = dao.insertIntoPIZZARIA (partsData.optString("PI_NOME"), 
					partsData.optString("PI_ING01"), 
					partsData.optString("PI_ING02"), 
					partsData.optString("PI_ING03"), 
					partsData.optString("TEMPO_FORNO") );
			
			if (http_code == 200) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item gravado com sucesso, Version 3");
				returnString = jsonArray.put(jsonObject).toString();				
			} else{
				return Response.status(500).entity("Deu pau na gravacao.Http code: " + String.valueOf(http_code)).build();
			}
			System.out.println("returnString: " + returnString);

		}
		catch (Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request.").build();
		}

		return Response.ok(returnString).build();	
    } // fim do metodo addPizza
	

	
	
	
	
	
	
	
	@Path("/update")
	@POST
	@Consumes ({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces (MediaType.APPLICATION_JSON)
	public Response updatePizza(String incomingData) throws Exception {

		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		DbPizza dao = new DbPizza();
		
		try {
			System.out.println(">>>    updatePizza >>>>  incomingData : " + incomingData);
			JSONObject pizzaData = new JSONObject(incomingData);
			System.out.println(">>>    updatePizza >>>>  pizzaData   : " + pizzaData.toString());


			int http_code = dao.updateInPIZZARIA ( pizzaData.optString("PI_PK"),
					pizzaData.optString("PI_NOME"), 
					pizzaData.optString("PI_ING01"), 
					pizzaData.optString("PI_ING02"), 
					pizzaData.optString("PI_ING03"), 
					pizzaData.optString("TEMPO_FORNO") );
				
			if (http_code == 200) {
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item atualizado com sucesso.");
				returnString = jsonArray.put(jsonObject).toString();				
			} else{
				return Response.status(500).entity("Deu pau na atualizacao. Http code: " + String.valueOf(http_code)).build();
			}
			System.out.println("returnString: " + returnString);
		}
		catch (Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request. Excecao no metodo updatePizza").build();
		}

		return Response.ok(returnString).build();	
    } // fim do metodo updatePizza

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@Path("/retrieve")
	@POST
	@Consumes ({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces (MediaType.APPLICATION_JSON)
	public Response retrievePizza(String incomingData) throws Exception {

		String returnString = null;                    	// vai conter retorno deste metodo com os dados da pizza
		JSONArray jsonArray = new JSONArray();         	// vai conter o retorno do metodo dao com os dados da pizza
		DbPizza dao = new DbPizza();
														// aqui eu jogo o JSON-EM-STRING do parametro num objeto json
		JSONObject jsonObj = new JSONObject(incomingData);
														// e aqui eu jogo o valor JSON numa string
		String PI_NOME = jsonObj.optString("PI_NOME");
		
		try {
			//System.out.println("\n" + ">>>> retrievePizza >>>>  PI_NOME : " + PI_NOME);
			
														// chamada ao dao, passando o nome da pizza em string. 
														// O dao devolve o resto da row em JSONArray
														// se nao achar devolve a JSONArray vazia
			jsonArray = dao.retrieveFromPIZZARIA(PI_NOME);
			returnString = jsonArray.toString();
			
			if (returnString.equals("[]") ){
				return Response.status(400).entity("Erro: Nao achei a pizza " + jsonObj + ".").build();
			}
			
			System.out.println(">>>> retrievePizza >>>>  returnString: " + returnString);

		}
		catch (Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request.").build();
		}

		return Response.ok(returnString).build();	
    } // Fim do metodo retrievePizza
	

	@Path("/delete/{PI_PK}")
	@DELETE
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response deletePizza(@PathParam("PI_PK") int PI_PK) throws Exception {

		String returnString = null;                    				// vai conter retorno deste metodo com o status da delecao
		DbPizza dao = new DbPizza();
		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		int http_code = 0;
		
		try {
			System.out.println("\n" + ">>>> deletePizza >>>>  PI_PK : " + PI_PK);
																	// chamada ao dao, passando o PI_PK. 
			http_code = dao.deleteFromPizzaria(PI_PK);
			
			if (http_code == 200){
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item deletado.");
				 	
			}
			else
			{
				 return Response.status(500).entity("Nao deletou.").build();
				//jsonObject.put("HTTP_CODE", "500");
				//jsonObject.put("MSG", "Deu pau! Nao deletou.");
				
			} 														// fim do else
			
			returnString = jsonArray.put(jsonObject).toString();
			System.out.println(">>>> deletePizza >>>>  returnString: " + returnString);
			return Response.ok(returnString).build();

		}
		catch (Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server was not able to process your request.").build();
		}

		
    } // Fim do metodo retrievePizza
	
	

	
} // Fim da classe

