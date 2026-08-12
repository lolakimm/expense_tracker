import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class DatabaseSetup {
    static final String createTableQuery = """
            CREATE TABLE IF NOT EXISTS expenses(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE, 
                category VARCHAR(25),
                total DOUBLE, 
                payment_method VARCHAR(15)
            )
            """;
    public static void main(String[] args) throws Exception {
        String url = "jdbc:sqlite:database/expenses.db";

        try (Connection conn = DriverManager.getConnection(url);
            PreparedStatement stmnt = conn.prepareStatement(createTableQuery)) {
            System.out.println("Connection established.");
            stmnt.execute();
        }
        catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }
}
