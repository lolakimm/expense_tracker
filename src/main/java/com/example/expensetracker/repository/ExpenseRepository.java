package com.example.expensetracker.repository;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import com.example.expensetracker.model.Expense;
import org.springframework.stereotype.Repository;

@Repository
public class ExpenseRepository {
    private static final String getQuery = """
        SELECT * FROM Expenses;
        """;
    
    String addQuery = """
            INSERT INTO Expenses(date, category, total, paymentMethod)
            VALUES(?, ?, ?, ?);
            """;
    
    String removeQuery = """
            DELETE FROM Expenses
            WHERE id = ?;
            """;

    private final JdbcTemplate jdbcTemplate;

    public ExpenseRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Expense> getAllExpenses() {
        return jdbcTemplate.query(getQuery, (rs, rowNum) ->
            new Expense(
                rs.getInt("id"),
                rs.getString("date"),
                rs.getString("category"),
                rs.getDouble("total"),
                rs.getString("payment_method")
            )
        );
    }

    public Expense addExpense(Expense e) {
        jdbcTemplate.update(
            addQuery,
            e.getDate(),
            e.getCategory(),
            e.getTotal(),
            e.getPaymentMethod()
        );

        return e;
    }

    public void removeExpense(int id) {
        jdbcTemplate.update(removeQuery,id);
    }
}


