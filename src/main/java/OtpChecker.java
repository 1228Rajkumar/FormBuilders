
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/OtpChecker")
 @MultipartConfig
public class OtpChecker extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter pw = response.getWriter();
		String otpGiven = request.getParameter("getotp");
		HttpSession session = request.getSession();
		String mailString = (String) session.getAttribute("mailId");
		String passwordString = (String) session.getAttribute("password");
		String otpString =  (String) session.getAttribute("otp");
		String userString =  (String) session.getAttribute("user");
		if (otpGiven.equals(otpString)) {
		DbChecker.User_Table_maker(mailString, passwordString,userString);
			pw.print("true");
			DbChecker.User_Database_maker(mailString);			
		}else {
			pw.print("false");
		}
	}
}
