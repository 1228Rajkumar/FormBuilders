

import java.sql.Connection;

import java.sql.ResultSet;
import java.sql.Statement;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class DbChecker {
	private static final String ALGORITHM = "AES";
    private static final String KEY = "mysecretkey12345"; // must be 16, 24, or 32 bytes long

    public static String encrypt(String plainText) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(KEY.getBytes(), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    public static String decrypt(String encryptedText) throws Exception {
        SecretKeySpec secretKeySpec = new SecretKeySpec(KEY.getBytes(), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
        byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
        return new String(decryptedBytes);
    }
	
	public static int acess(String mailId) {
		try {
            Connection conn =DbConnection.getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs1 = stmt.executeQuery("select * from users_list where (mailId ='"+mailId+"')");
            if (rs1.next()) {
            	rs1.close();
				stmt.close();
				conn.close();
				return 150;
			}			
			rs1.close();
			stmt.close();
			conn.close();
			return 200;
        }catch (Exception e) {
            e.printStackTrace();
            return 150;
        }
	}
	public static void User_Table_maker(String mailId,String password,String user) {
		try {
			Connection conn =DbConnection.getConnection();
            Statement stmt = conn.createStatement();
            stmt.executeUpdate("insert into users_list values('"+mailId+"','"+encrypt(password)+"','"+user+"')");
			stmt.close();
			conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
	}
	
	public static boolean MailCheck(String mailId) {
		try {
            Connection conn =DbConnection.getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs1 = stmt.executeQuery("select * from users_list where mailId ='"+mailId+"'");
            if (rs1.next()) {
            	rs1.close();
    			stmt.close();
    			conn.close();
            	return true;
            }
            rs1.close();
			stmt.close();
			conn.close();
			return false;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
	}
	
	
	public static boolean LoginCheck(String mailId,String password) {
		try {
			Connection conn = DbConnection.getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs1 = stmt.executeQuery("select * from users_list where mailId ='"+mailId+"' AND password='"+encrypt(password)+"'");
            if (rs1.next()) {
            	rs1.close();
    			stmt.close();
    			conn.close();
            	return true;
            }
            rs1.close();
			stmt.close();
			conn.close();
			return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
	}
	
	public static String GetPassword(String mailId) {
		try {
			Connection con = DbConnection.getConnection();
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery("select password from users_list where mailId ='"+mailId+"'");
			rs.next();
			String result = decrypt(rs.getString(1));
			rs.close();
			st.close();
			con.close();
			return result;
		} catch (Exception e) {
			return "false";
		}
}
	
	
	
	
	public static void Use_Database(String id) {
		try {
			Connection conn =DbConnection.getConnection();
            Statement stmt = conn.createStatement();
            stmt.executeUpdate("use`"+id+"`");
			stmt.close();
			conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
	}
	
	public static void Common_Table_maker(String id) {
		try {
			Connection conn =DbConnection.getConnection();
            Statement stmt = conn.createStatement();
            stmt.execute("use `"+id+"`");
            stmt.executeUpdate("create table `RNSGZS2024`(formname varchar(255), formOrder varchar(2000), formFields json, dateCreated varchar(50), fieldIds json)");
            stmt.execute("use `"+id+".trash"+"`");
            stmt.executeUpdate("create table `RNSGZS2024`(formname varchar(255), formOrder varchar(2000), formFields varchar(8000), dateCreated varchar(50), fieldIds json)");
			stmt.close();
			conn.close();
		} catch (Exception e) {
            e.printStackTrace();
        }
	}
	
	public static void User_Database_maker(String id) {
		try
        {
			Connection conn = DbConnection.getConnection();
            Statement stmt = conn.createStatement();
            stmt.executeUpdate("create database `"+id+"`");
            stmt.executeUpdate("create database `"+id+".trash"+"`");
			stmt.close();
			conn.close();
            Common_Table_maker(id);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
	}
}


