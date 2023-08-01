import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;


public class forDelete {
	public static String deleter(String user,String[] delStrings,String form) throws SQLException, ClassNotFoundException {
		Connection conn = DbConnection.getConnection();
		Statement stmt = conn.createStatement();
		stmt.execute("use `"+user+"`");
		String[] summa= delStrings[0].split(",", 0);
		for(int i=0; i<summa.length; i++) {
			String queryString="delete from `"+form+"` where id='"+summa[i]+"'";
			stmt.executeUpdate(queryString);
		}
		return "completed";
	}
}
