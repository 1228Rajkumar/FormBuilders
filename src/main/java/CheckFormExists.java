import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/CheckFormExists")
@MultipartConfig
public class CheckFormExists extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user = request.getParameter("user");
		String form = request.getParameter("form");        
        try {
        	Connection conn = DbConnection.getConnection();
        	Statement stmt = conn.createStatement();
			stmt.execute("use `"+user+"`");
			ResultSet result = stmt.executeQuery("select * from RNSGZS2024 where formname='"+form+"'");
	        if (result.next()) {
	        	response.getWriter().println("true");
	        }else {
	        	response.getWriter().println("false");
	        }
	        result.close();
	        stmt.close();
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

}
