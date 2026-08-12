import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Expenses {
    // display expenses
    static final String displayExpenseQuery = """
                    SELECT * 
                    FROM expenses
                    """;
    public static void main(String args[]) {
        String url = "jdbc:sqlite:database/expenses.db";

        try (Connection conn = DriverManager.getConnection(url);
        PreparedStatement stmnt = conn.prepareStatement(displayExpenseQuery);
        ResultSet rs = stmnt.executeQuery();) {
            System.out.printf(
                    "%-5s %-15s %-20s %-12s %-15s%n",
                    "ID",
                    "Date",
                    "Category",
                    "Total",
                    "Payment Method"
                );

            while(rs.next()) {
                Expense e = new Expense(
                    rs.getInt("id"),
                    rs.getString("date"),
                    rs.getString("category"),
                    rs.getDouble("total"),
                    rs.getString("payment_method")
                );
                e.printExpense();
            }
        }
        catch (Exception e) {
            System.err.println("Error: " + e);
        }
    }
}
