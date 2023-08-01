import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;

import org.json.JSONException;
import org.json.JSONObject;

public class DbQueries {

	public static void createFormTable(HashMap<String, HashMap<String, String>> map,String order,String fields, String formName,String user,String date,String fieldIds) throws ClassNotFoundException, SQLException {
		Connection conn = DbConnection.getConnection();
        Statement stmt = conn.createStatement();
        stmt.execute("use `"+user+"`");
        StringBuilder query = new StringBuilder("create table `"+formName+"`(id int NOT NULL PRIMARY KEY AUTO_INCREMENT,");
        map.forEach((key,value)->{
            StringBuilder column = new StringBuilder("`"+key+"` ");
            column.append("varchar(255), ");
            query.append(column);
        });
        query.deleteCharAt(query.length()-1);
        query.deleteCharAt(query.length()-1);
        query.append(")");
        stmt.execute("drop table if exists `"+formName+"`");
        stmt.execute(String.valueOf(query));
        stmt.execute("delete from RNSGZS2024 where formname = '"+formName+"'");
        stmt.execute("insert into RNSGZS2024 values('"+formName+"','"+order+"','"+fields+"','"+date+"','"+fieldIds+"')");
        stmt.close();
		conn.close();
	}
	
	public static JSONObject getJson(String user,String form) throws SQLException, ClassNotFoundException, JSONException {
		Connection conn = DbConnection.getConnection();
        Statement stmt = conn.createStatement();
        stmt.execute("use `"+user+"`");
        ResultSet result = stmt.executeQuery("select formOrder,formFields,fieldIds from RNSGZS2024 where formname='"+form+"'");
        if (result.next()) {
        	JSONObject json = new JSONObject();
        	json.append("order", result.getString(1));
        	json.append("formFields", result.getString(2));
        	json.append("fieldIds", result.getString(3));
        	result.close();
        	stmt.close();
    		conn.close();
        	return json;
        }
        result.close();
        stmt.close();
		conn.close();
        return new JSONObject();
   	}
  static int toCheck(String user,String form) throws ClassNotFoundException, SQLException {
		Connection conn = DbConnection.getConnection();
		Statement stmt = conn.createStatement();
		stmt.execute("use `"+user+"`");
		ResultSet rs= stmt.executeQuery("Select * from RNSGZS2024 ");
		int a=0;
		while (rs.next()) {
            String result= rs.getString(1);
            if (result.equals(form)){
                a++;
            }
            else if (result.contains(form+"(")&&result.length()==form.length()+3&&result.endsWith(")")){
                a++;
            }
            
        }
		return a;	
	}
		
		
	
	static int toCheckInTrash(String user,String form) throws ClassNotFoundException, SQLException {
		Connection conn = DbConnection.getConnection();
		Statement stmt = conn.createStatement();
		stmt.execute("use `"+user+".trash"+"`");
		ResultSet rs= stmt.executeQuery("Select * from RNSGZS2024 ");
		int a=0;
		while (rs.next()) {
            String result= rs.getString(1);
            String[] arr = result.split("[(]");
            String[] arr1 = form.split("[(]");

            
            if (result.equals(form)){
                a++;
            }
            else if (arr.length==arr1.length && arr1[0].equals(arr[0])){
                System.out.println(true);
            }
        }
		return a;
	}
}
