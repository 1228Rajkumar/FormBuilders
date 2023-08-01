

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/Edit")
@MultipartConfig
public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			String user = request.getParameter("user");
			String form = request.getParameter("formName");
			List order = Arrays.asList(request.getParameter("order").split(","));
			JSONObject fields = new JSONObject(request.getParameter("fields"));
			response.getWriter().println(order);
			Connection conn = DbConnection.getConnection();
			Statement stmt = conn.createStatement();
			stmt.execute("use `"+user+"`");
	        ResultSet result = stmt.executeQuery("select formOrder,formFields from RNSGZS2024 where formname='"+form+"'");
	        result.next();
	        List oldOrder = Arrays.asList(result.getString(1).split(","));
	        response.getWriter().println(oldOrder);
	        String oldFields = result.getString(2);
	        for (int i = 0; i < oldOrder.size(); i++) {
	            if (!order.contains(oldOrder.get(i))) {
	            	stmt.execute("ALTER TABLE "+form+" DROP COLUMN "+oldOrder.get(i));
	            }
	    	}
	        for (int i = 0; i < order.size(); i++) { 
            if (!oldOrder.contains(order.get(i))) {
	            	JSONObject field = (JSONObject)fields.get((String) order.get(i));
	            	stmt.execute("ALTER TABLE "+form+" ADD "+order.get(i)+" varchar(255)");
	            }
	    	}
	        
	        stmt.execute("update RNSGZS2024 set formOrder = '"+request.getParameter("order")+"' , formFields = '"+request.getParameter("fields")+"' , dateCreated = '"+request.getParameter("date")+"' , fieldIds = '"+request.getParameter("fieldIds")+"' where formname = '"+form+"'");
	    	result.close();
	    	stmt.close();
			conn.close();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
