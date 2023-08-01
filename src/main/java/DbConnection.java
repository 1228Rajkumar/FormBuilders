
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {
	private static final String URL="jdbc:mysql://localhost:3306/Login_creator";
	private static final String username ="rajava";
	private static final String password ="Java@123";
	
	public static Connection getConnection() throws SQLException, ClassNotFoundException {
		Class.forName("com.mysql.cj.jdbc.Driver");
		return DriverManager.getConnection(URL,username,password);
	}
}


