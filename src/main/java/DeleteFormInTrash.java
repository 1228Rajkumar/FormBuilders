

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/DeleteFormInTrash")
@MultipartConfig
public class DeleteFormInTrash extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user = request.getParameter("user");
		String formName = request.getParameter("formName");
		try {
			Connection conn = DbConnection.getConnection();
			Statement stmt = conn.createStatement();
	        stmt.execute("use `"+user+".trash"+"`");
	        stmt.execute("delete from RNSGZS2024 where formname = '"+formName+"'");
	        stmt.execute("drop table if exists `"+formName+"`");
	        stmt.close();
			conn.close();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

}
