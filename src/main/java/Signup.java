import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



@WebServlet("/Signup")
@MultipartConfig
public class Signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter pw = response.getWriter();
		response.setContentType("text/plain");
		String mailString= request.getParameter("Smail");
		String passwordString= request.getParameter("Spass");
		String userString= request.getParameter("user");
		int acess=DbChecker.acess(mailString);
		if (acess==200) {
			String otp = MailChecker.send_Otp_Mail(mailString,"sendotp");
			HttpSession session= request.getSession();
			session.setAttribute("mailId", mailString);
			session.setAttribute("otp",otp);
			session.setAttribute("password", passwordString);
			session.setAttribute("user", userString);
			pw.print("not.p");
		}
		else if (acess==150) {
			pw.print("present");
		}
		
	}
}
