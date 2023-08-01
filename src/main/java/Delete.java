

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

import com.mysql.cj.Session;

/**
 * Servlet implementation class delete
 */
@WebServlet("/delete")
@MultipartConfig
public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String[] reStrings=request.getParameterValues("a");
		String user = request.getParameter("user");
		System.out.println(user);
		
		String form = request.getParameter("form");
		System.out.println(form);
		try {
			forDelete.deleter(user, reStrings, form);
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
		response.setContentType("application/json");
		try {
			Connection conn = DbConnection.getConnection();
			Statement stmt = conn.createStatement();
			stmt.execute("use `"+user+"`");
			ResultSet rs = stmt.executeQuery("select formOrder,formFields from RNSGZS2024 where formname='"+form+"'");
			JSONObject formData = new JSONObject();
			if (rs.next()) {
				String order = rs.getString(1);
				JSONObject json = new JSONObject(rs.getString(2));
				HashMap<String, HashMap<String, String>> map = new HashMap<String, HashMap<String, String>>();
			 	Iterator<String> keys = json.keys();
			 	while (keys.hasNext()) { 
					 String key = keys.next();
					 Object value = json.get(key);
					 JSONObject val = new JSONObject(value.toString());
					 HashMap<String, String> props = new HashMap<String, String>();
					 Iterator<String> keys1 = val.keys();
					 while (keys1.hasNext()) {
						 String key1 = keys1.next();
						 Object value1 = val.get(key1);
						 props.put(key1, value1.toString());
					 }
					 map.put(key, props);
			 	}
			 	String result = "";
			 	for (String name:order.split(",")) {
			 		result+=map.get(name).get("FieldName")+",";
			 	}
			 	result = result.substring(0,result.length()-1);
			 	formData.put("headings", result);
			 	
			 	Connection conn1 = DbConnection.getConnection();
				Statement stmt1 = conn.createStatement();
				stmt1.execute("use `"+user+"`");
				order="id,"+order;
			 	ResultSet rs1 = stmt1.executeQuery("select "+order+" from `"+form+"`");

			 	int c = 0;
			 	
			 	while (rs1.next()) {
			 		String row = "";
			 		for (int i=0;i<order.split(",").length;i++) {
			 			row+=rs1.getString(i+1)+",";
			 		}
			 		row = row.substring(0,row.length()-1);
			 		formData.put(""+c, row);
			 		c++;
			 	}
			 	rs1.close();
			 	stmt1.close();
				conn1.close();
			 	formData.put("len",c);
			 	response.getWriter().println(formData);
			}
			rs.close();
			stmt.close();
			conn.close();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
