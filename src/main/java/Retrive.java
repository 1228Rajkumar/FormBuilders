

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

/**
 * Servlet implementation class Retrive
 */
@WebServlet("/Retrive")
@MultipartConfig
public class Retrive extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public Retrive() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user=request.getParameter("user");
		String formname=request.getParameter("formName");
		Connection conn;
		try {
			conn = DbConnection.getConnection();
			Statement stmt = conn.createStatement();
	        stmt.execute("use `"+user+"`");
	        String formToAdd=formname;
			if (DbQueries.toCheck(user,formname)!=0) {
				formToAdd=formname+"("+DbQueries.toCheck(user,formname)+")";
			}
	        stmt.execute("INSERT INTO RNSGZS2024(formname) values('"+formToAdd+"')");
	        String query="update RNSGZS2024 set formOrder= (SELECT formOrder FROM `"+user+".trash`.RNSGZS2024 where formname ='"+formname+"'), formFields = (SELECT formFields FROM `"+user+".trash`.RNSGZS2024 where formname ='"+formname+"'), dateCreated = (SELECT dateCreated FROM `"+user+".trash`.RNSGZS2024 where formname ='"+formname+"'), fieldIds = (SELECT fieldIds FROM `"+user+".trash`.RNSGZS2024 where formname ='"+formname+"') where formname='"+formToAdd+"'";
	        stmt.execute(query);
	        stmt.execute("CREATE table `"+formToAdd+"` like `"+user+".trash`.`"+formname+"`");
	        stmt.execute("insert into `"+formToAdd+"` select * from `"+user+".trash`.`"+formname+"`");
	        stmt.execute("use `"+user+".trash`");
	        stmt.execute("delete from RNSGZS2024 where formname = '"+formname+"'");
	        stmt.execute("drop table if exists `"+formname+"`");
	        stmt.close();
			conn.close();
		}catch (Exception e) {
			e.printStackTrace();
		}

	}

}
