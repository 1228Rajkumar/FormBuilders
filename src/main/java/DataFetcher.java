

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import org.json.JSONException;


@WebServlet("/DataFetcher")
@MultipartConfig
public class DataFetcher extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
				
		try {
			response.setContentType("application/json");
			response.getWriter().println(Fetcher.tables(request.getParameter("user")));
		} catch (ClassNotFoundException | IOException | SQLException | JSONException e) {
			e.printStackTrace();
		}
	}

}
