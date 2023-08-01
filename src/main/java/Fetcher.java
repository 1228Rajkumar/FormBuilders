import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Fetcher {
	public static JSONArray tables(String user) throws ClassNotFoundException, SQLException, JSONException {
		try {
			Connection conn = DbConnection.getConnection();
			Statement stmt = conn.createStatement();
			stmt.execute("use `"+user+"`");
	        ResultSet rs = stmt.executeQuery("select formname,dateCreated from RNSGZS2024");
	        JSONArray array = new JSONArray();
	        while(rs.next()){
	        	JSONObject table = new JSONObject();
	        	table.put("name",rs.getString(1));
	        	table.put("date", rs.getString(2));
	        	Connection conn1 = DbConnection.getConnection();
				Statement stmt1 = conn1.createStatement();
				stmt1.execute("use `"+user+"`");
	        	ResultSet rs1 = stmt1.executeQuery("select count(*) from `"+rs.getString(1)+"`");
	        	if (rs1.next()) {
					table.put("num", rs1.getString(1));
				}
	        	rs1.close();
	        	stmt1.close();
	    		conn1.close();
	        	array.put(table);
	        }
	        rs.close();
	        stmt.close();
			conn.close();
	        return array;
		} catch (SQLException e) {
	        e.printStackTrace();
	        return new JSONArray();
     	}
	}
}
