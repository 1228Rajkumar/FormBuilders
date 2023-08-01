

import java.awt.List;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
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


@WebServlet("/GetHeadings")
@MultipartConfig
public class GetHeadings extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String form = request.getParameter("form");
		String user = request.getParameter("user");
		response.setContentType("application/json");
		HttpSession session= request.getSession();
		session.setAttribute("form", form);
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
			 	ArrayList result = new ArrayList();
			 	for (String name:order.split(",")) {
			 		result.add(map.get(name).get("FieldName"));
			 	}
			 	formData.put("headings", result);
			 	
			 	Connection conn1 = DbConnection.getConnection();
				Statement stmt1 = conn.createStatement();
				stmt1.execute("use `"+user+"`");
				order="id,"+order;
			 	ResultSet rs1 = stmt1.executeQuery("select "+order+" from `"+form+"`");
			 	int c = 0;
			 	while (rs1.next()) {
			 		ArrayList row = new ArrayList();
			 		for (int i=0;i<order.split(",").length;i++) {
			 			row.add(rs1.getString(i+1));
			 		}
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

}
