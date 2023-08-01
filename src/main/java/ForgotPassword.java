
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/ForgotPassword")
@MultipartConfig
public class ForgotPassword extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter pw = response.getWriter();
		String mailID = request.getParameter("mail");
		String password =DbChecker.GetPassword(mailID);
		boolean mailcheck=DbChecker.MailCheck(mailID);
		if(mailcheck) {
			pw.println("true");
			MailChecker.send_Pass_Mail(mailID,"send pass", password);
		}
		else {
			pw.println("false");
		}
		
	}

}
