
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/Login")
@MultipartConfig
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;    
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter pw = response.getWriter();
		response.setContentType("text/plain");
		String mailString = request.getParameter("mail");
		String passwordString = request.getParameter("pass");
		HttpSession session= request.getSession();
		session.setAttribute("mailId", mailString);
		boolean mailcheck=DbChecker.MailCheck(mailString);
		if(mailcheck) {
			boolean passcheck = DbChecker.LoginCheck(mailString,passwordString);
			pw.println(passcheck);
		}
		else {
			pw.println("false");
		}
			
	}


}	
