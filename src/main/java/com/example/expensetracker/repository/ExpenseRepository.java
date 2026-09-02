package com.example.expensetracker.repository;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import com.example.expensetracker.model.Expense;
import org.springframework.stereotype.Repository;

@Repository
public class ExpenseRepository {
    private static final String query = """
        SELECT * FROM EXPENSES;
        """;

    private final JdbcTemplate jdbcTemplate;

    public ExpenseRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Expense> getAllExpenses() {
        return jdbcTemplate.query(query, (rs, rowNum) ->
            new Expense(
                rs.getInt("id"),
                rs.getString("date"),
                rs.getString("category"),
                rs.getDouble("total"),
                rs.getString("payment_method")
            )
        );
    }
}
