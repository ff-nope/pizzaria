package com.ff.pizza.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import org.codehaus.jettison.json.JSONArray;

import com.ff.pizza.util.*;

public class DbPizza {

	private static DataSource myDS = null;
	private static Context context = null;
	//private static String DBKind = "Oracle";
	private static String DBKind = "MySQL";

	
	
	public static DataSource retornaDS() throws Exception {

		if (myDS != null) {
			return myDS;
		}
		try {
			if (context == null) {
				context = new InitialContext();
			}
			if (DBKind.equals("Oracle")) {
				myDS = (DataSource) context.lookup("FFPizzaOracle");
			} else {
				myDS = (DataSource) context.lookup("FFPizzaMySQL");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return myDS;
	} // fim do retornaDS

	
	public static Connection pizzaConnection() {
		Connection conn = null;
		try {
			conn = retornaDS().getConnection();
			return conn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}


	public int insertIntoPIZZARIA ( String PI_NOME,
			String PI_ING01,
			String PI_ING02,
			String PI_ING03,
			String TEMPO_FORNO)
					throws Exception{
		PreparedStatement query = null;
		Connection conn = null;
		int TEMPO_FORNOInt = 0;
		
		// System.out.println(">>>>>>>> insertIntoPIZZARIA >>> PI_ING01 : " + PI_ING01 +" PI_ING02 : " + PI_ING02 + " PI_ING03 : " + PI_ING03 );

		try {
			conn = pizzaConnection();
			query = conn.prepareStatement("insert into PIZZARIA "  
					+ "(PI_NOME, PI_ING01, PI_ING02, PI_ING03, TEMPO_FORNO) " 
					+ "VALUES ( ?,?,?,?,? )");
			query.setString(1, PI_NOME);
			query.setString(2, PI_ING01);
			query.setString(3, PI_ING02);
			query.setString(4, PI_ING03);

			TEMPO_FORNOInt = Integer.parseInt(TEMPO_FORNO);
			query.setInt(5, TEMPO_FORNOInt);
			
			query.executeUpdate();

		}
		catch (Exception e){
			e.printStackTrace();
			return 500;

		}
		finally{
			if (conn != null) conn.close();
		}
		return 200;
	}


	//retorna a row pelo nome da pizza
	public JSONArray retrieveFromPIZZARIA ( String PI_NOME)
			throws Exception{
		PreparedStatement query = null;
		Connection conn = null;

		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();

		System.out.println(">>>>>>>> retrieveFromPIZZARIA >>> PI_NOME : " + PI_NOME );

		try {
			conn = pizzaConnection();
			query = conn.prepareStatement("select PI_PK, PI_NOME, PI_ING01, PI_ING02, PI_ING03, TEMPO_FORNO "
											+ " from PIZZARIA where UPPER(PI_NOME) = ? " ) ;
			query.setString(1, PI_NOME);
			ResultSet rs = query.executeQuery();

			json = converter.toJSONArray(rs);
			
			query.close();
		}
		catch (SQLException sqlError){
			sqlError.printStackTrace();
			return json;
		} 
		catch (Exception e){
			e.printStackTrace();
			return json;
		} 
		finally {
			if (conn != null) conn.close();
		}
		return json;
	}

	//deleta a row dado o PI_PK
	public int deleteFromPizzaria ( int pk)
			throws Exception{
		PreparedStatement query = null;
		Connection conn = null;

		try {
			conn = pizzaConnection();
			query = conn.prepareStatement("delete from PIZZARIA "  
					+ "where PI_PK = ?");
			query.setInt(1, pk);
			query.executeUpdate();

		}
		catch (Exception e){
			e.printStackTrace();
			return 500;
		}
		finally{
			if (conn != null) conn.close();
		}
		return 200;
	}
	
	
	//update a row dado o PI_PK e as outras variaveis
	public int updateInPIZZARIA ( String PI_PK,
									String PI_NOME,
									String PI_ING01,
									String PI_ING02,
									String PI_ING03,
									String TEMPO_FORNO)
												throws Exception{
		PreparedStatement query = null;
		Connection conn = null;

		try {
			conn = pizzaConnection();
			
			query = conn.prepareStatement("update PIZZARIA "  
					+ " set PI_NOME  = ?, "
					+ " PI_ING01 = ?,"
					+ " PI_ING02 = ?, "
					+ " PI_ING03 = ?,"
					+ " TEMPO_FORNO = ? " 
		     		+ " where PI_PK = ? ");
			
			query.setString(1, PI_NOME);
			query.setString(2, PI_ING01);
			query.setString(3, PI_ING02);
			query.setString(4, PI_ING03);
			query.setInt(5, Integer.parseInt(TEMPO_FORNO));
			query.setInt(6, Integer.parseInt(PI_PK));
			
			System.out.println(">>>>>> query " + query.toString());
			query.executeUpdate();

		}
		catch (Exception e){
			e.printStackTrace();
			return 500;

		}
		finally{
			if (conn != null) conn.close();
		}

		return 200;
	}



	
	
	
	
	
	
	
	

	// public static Connection MySQLPcPartsConnection() {
	// Connection conn = null;
	// String url = "jdbc:mysql://192.168.1.3:3306/";
	// String database = "xe";
	// String username = "ffeijo";
	// String password = "deoclecio";
	//
	//
	// try{
	// conn = DriverManager.getConnection(url+database,username,password);
	// System.out.println("\nAbri com sucesso o banco de dados.\n");
	// return conn;
	// }
	// catch (Exception e){
	// System.out.println("\nDeu pau tentando abrir o banco de dados.\n");
	// e.printStackTrace();
	// }
	// return conn;
	// }

	
	
	
}






















