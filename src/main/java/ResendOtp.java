
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@WebServlet("/ResendOtp")
public class ResendOtp extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter pw = response.getWriter();
		HttpSession session = request.getSession();
		session.removeAttribute("otp");
		String mailString = (String) session.getAttribute("mailId");
		String otp = MailChecker.send_Otp_Mail(mailString,"sendotp");
		session.setAttribute("otp",otp);
		String otpString = (String) session.getAttribute("otp");
	}

}
