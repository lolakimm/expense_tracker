/* Represents an individual expense transaction.
 * Stores information such as transaction ID, transaction date, category, total, and payment method.
 */

public class Expense {
    private int transactionID;
    private String date;
    private String category;
    private double total;
    private String paymentMethod;

    // constructor
    public Expense(int transactionID, String date, String category, double total, String paymentMethod) {
        this.transactionID = transactionID;
        this.date = date;
        this.category = category;
        this.total = total;
        this.paymentMethod = paymentMethod;
    }

    // getter methods for safe reading
    public int get_transactionID() {
        return transactionID;
    }
    
    public String get_date() {
        return date;
    }

    public String get_category() {
        return category;
    }

    public double get_total() {
        return total;
    }

    public String get_paymentMethod() {
        return paymentMethod;
    }

    public void printExpense() {
        System.out.printf(
            "%-5d %-15s %-20s $%-11.2f %-15s%n",
            transactionID,
            date,
            category,
            total,
            paymentMethod
        );
    }
}
