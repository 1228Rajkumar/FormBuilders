

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/InsertData")
@MultipartConfig
public class InsertData extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject data;
		try {
			data = new JSONObject(request.getParameter("data"));
			Iterator<String> keys = data.keys();
			Connection conn = DbConnection.getConnection();
	        Statement stmt = conn.createStatement();
	        stmt.execute("use `"+request.getParameter("user")+"`");
	        StringBuilder query = new StringBuilder("insert into `"+request.getParameter("formName")+ "`("+"");
	        while (keys.hasNext()) {
	            String key = keys.next();
	            query.append(key+",");
	        }
	        keys = data.keys();
	        query.deleteCharAt(query.length()-1);
	        query.append(") values(");
	        while (keys.hasNext()) {
	            String key = keys.next();
	            String value = data.getString(key);
	            query.append("'"+value+"'"+",");
	        }
	        query.deleteCharAt(query.length()-1);
	        query.append(")");
	        stmt.executeUpdate(query.toString());
	        response.getWriter().println("200");
	        stmt.close();
			conn.close();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
