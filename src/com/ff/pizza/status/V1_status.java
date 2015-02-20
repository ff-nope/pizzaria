package com.ff.pizza.status;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import org.codehaus.jettison.json.JSONArray;

import java.sql.*;

import com.ff.pizza.dao.*;
import com.ff.pizza.util.*;

@Path("/v1/status")
public class V1_status {
	static String my_ver = "0.1";

	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnTest() {
		return "<p>Hello World!</p><p>Aqui fala o servidor backend.</p>";
	}

	@Path("/database")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnDatabaseStatus() throws Exception {
		Statement query = null;
		String myString = null;
		String ReturnString = null;
		Connection conn = null;

		try {
			conn = DbPizza.pizzaConnection();
			query = conn.createStatement();
			ResultSet rs = query
					.executeQuery("select to_char(sysdate,'YYYY-MM-DD HH24:MI:SS') DATETIME "
							+ "from sys.dual");

			while (rs.next()) {
				myString = rs.getString("DATETIME");
			}
			query.close();
			ReturnString = "<p>Database Status<p> "
					+ "<p>Database Date/Time return: " + myString + "</p>";
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			if (conn != null) {
				conn.close();
			}

		}
		return ReturnString;
	}

	@Path("/inventory")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String allPizzasJSON() throws Exception {

		Statement query = null;
		String myString = null;
		String ReturnString = "";
		Connection conn = null;
		ToJSON converter = new ToJSON();
		JSONArray json = new JSONArray();

		try {
			conn = DbPizza.pizzaConnection();
			query = conn.createStatement();
			ResultSet rs = query.executeQuery("select * " + "from PIZZARIA");

			json = converter.toJSONArray(rs);
			query.close();

			ReturnString = json.toString();
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			if (conn != null) {
				conn.close();
			}

		}
		return ReturnString;
	}

	@Path("/inv")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String allPizzas() throws Exception {

		Statement query = null;
		String ReturnString = "";
		Connection conn = null;

		try {
			conn = DbPizza.pizzaConnection();
			query = conn.createStatement();
			ResultSet rs = query.executeQuery("select * " + "from PIZZARIA");

			while (rs.next()) {
				ReturnString += "<p> Nome da pizza: " + rs.getString("PI_NOME")
						+ ", e o primeiro ingrediente foi "
						+ rs.getString("PI_ING01") + "<p>";
			}
			query.close();
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			if (conn != null) {
				conn.close();
			}

		}
		return ReturnString;
	}
	
	@Path("/version")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnVersion(){
		return "<p>Versao</p>" + my_ver;
	}
	

}
