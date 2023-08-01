import java.io.IOException;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/CreateForm")
@MultipartConfig
public class CreateForm extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			JSONObject json = new JSONObject(request.getParameter("fields"));
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
		 	response.getWriter().println(request.getParameter("fields"));
		 	DbQueries.createFormTable(map,request.getParameter("order"),request.getParameter("fields"),request.getParameter("formName"),request.getParameter("user"),request.getParameter("date"),request.getParameter("fieldIds"));
		}catch (JSONException e) {
			 e.printStackTrace(); 
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}