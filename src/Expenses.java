import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Scanner;

public class Expenses {
    static final String url = "jdbc:sqlite:database/expenses.db";

    // display expenses
    static final String displayExpenseQuery = """
                    SELECT * 
                    FROM expenses
                    """;
    public static void main(String args[]) {
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

            // addExpense();
            // deleteExpense();

        }
        catch (Exception e) {
            System.err.println("Error: " + e);
        }
    }

    public static void addExpense() {
        // temporarily take input from terminal
        System.out.println("\nAdd an expense... \n");
        Scanner in = new Scanner(System.in);
        System.out.print("Enter date (YYYY-MM-DD): ");
        String dateInput = in.next();
        System.out.print("Enter category: ");
        String categoryInput = in.next();
        System.out.print("Enter total spent: ");
        double totalInput = in.nextDouble();
        in.nextLine();
        System.out.print("Enter payment method: ");
        String paymentInput = in.nextLine();

        String addExpenseQuery = """
                INSERT INTO expenses(date, category, total, payment_method)
                VALUES(?, ?, ?, ?)
                """;

        try(Connection conn = DriverManager.getConnection(url);
        PreparedStatement stmt = conn.prepareStatement(addExpenseQuery)) {
            stmt.setString(1, dateInput);
            stmt.setString(2, categoryInput);
            stmt.setDouble(3, totalInput);
            stmt.setString(4, paymentInput);

            stmt.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error: " + e);
        }
    }

    public static void deleteExpense() {
        // temporarily delete expense by id num
        System.out.println("\nDelete an expense... \n");
        Scanner in = new Scanner(System.in);
        System.out.print("Enter id number: ");
        int idNum = in.nextInt();

        String deleteExpenseQuery = """
                DELETE FROM expenses
                WHERE id = ?
                """;

        try(Connection conn = DriverManager.getConnection(url);
        PreparedStatement stmt = conn.prepareStatement(deleteExpenseQuery);) {
            stmt.setInt(1, idNum);
            stmt.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error: " + e);
        }
    }
}