

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

@WebServlet("/DeleteForm")
@MultipartConfig
public class DeleteForm extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user = request.getParameter("user");
		String formName = request.getParameter("formName");
		try {
			Connection conn = DbConnection.getConnection();
			Statement stmt = conn.createStatement();
			String formToAddInTrash=formName;
			if (DbQueries.toCheckInTrash(user,formName)!=0) {
				formToAddInTrash=formName+"("+DbQueries.toCheckInTrash(user,formName)+")";
			}
	        stmt.execute("use `"+user+".trash"+"`");
	        stmt.execute("INSERT INTO RNSGZS2024(formname) values('"+formToAddInTrash+"')");
	        String query="update RNSGZS2024 set formOrder= (SELECT formOrder FROM `"+user+"`.RNSGZS2024 where formname ='"+formName+"'), formFields = (SELECT formFields FROM `"+user+"`.RNSGZS2024 where formname ='"+formName+"'), dateCreated = (SELECT dateCreated FROM `"+user+"`.RNSGZS2024 where formname ='"+formName+"'), fieldIds = (SELECT fieldIds FROM `"+user+"`.RNSGZS2024 where formname ='"+formName+"') where formname='"+formToAddInTrash+"'";
	        stmt.execute(query);
	        stmt.execute("CREATE table `"+formToAddInTrash+"` like `"+user+"`.`"+formName+"`");
	        stmt.execute("insert into `"+formToAddInTrash+"` select * from `"+user+"`.`"+formName+"`");
	        stmt.execute("use `"+user+"`");
	        stmt.execute("delete from RNSGZS2024 where formname = '"+formName+"'");
	        stmt.execute("drop table if exists `"+formName+"`");
	        stmt.close();
			conn.close();
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace();
		}
	}

}
