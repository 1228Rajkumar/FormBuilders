

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/GetId")
public class GetId extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static String getUserId(String mailId) {
		try {
			Connection con = DbConnection.getConnection();
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery("select mailId from users_list where mailId ='"+mailId+"'");
			rs.next();
			
			String result = rs.getString(1);
			rs.close();
			st.close();
			con.close();
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().println(getUserId(request.getParameter("mailId")));
	}

}
