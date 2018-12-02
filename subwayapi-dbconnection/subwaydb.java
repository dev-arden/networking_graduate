package subwayapi;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/*Database Access Object*/
public class subwaydb {
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://graduate.cbiz6ipldrs0.ap-northeast-2.rds.amazonaws.com:3306/graduate?useSSL=false";
	static final String USERNAME = "soo"; // DB ID
	static final String PASSWORD = "11111111"; // DB Password

	private Connection conn = null;
	private Statement stmt = null;
	private ResultSet rs = null;

	public subwaydb() {
		System.out.print("DatabaseName Connection 연결 : ");
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);
			if (conn != null) {
				System.out.println("OK");
			} else {
				System.out.println("Failed");
			}

		} catch (ClassNotFoundException e) {
			System.out.println("Class Not Found Exection");
			e.printStackTrace();
		} catch (SQLException e) {
			System.out.println("SQL Exception");
			e.printStackTrace();
		}
	}// UserDAO

	public void tableInsert(String code, String name, String name_eng, String line, String frcd) {
		subwaydbname tn = new subwaydbname(code, name, name_eng, line, frcd);
		// System.out.println(name);

		String query = "INSERT INTO subway " + "VALUE ('" + tn.cd + "', '" + tn.name + "' , '" + tn.name_eng + "' , '"
				+ tn.line + "', '" + tn.frcd + "');";
		System.out.println(query);

		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);

			stmt = conn.createStatement();
			stmt.executeUpdate(query);

			stmt.close();
			conn.close();
		} catch (ClassNotFoundException e) {
			System.out.println("Class Not Found Exection");
		} catch (SQLException e) {
			System.out.println("SQL Exception : " + e.getMessage());
		}
	}

}
