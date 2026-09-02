package com.example.expensetracker.model;

public class Expense {
    private int transactionID;
    private String date;
    private String category;
    private double total;
    private String paymentMethod;

    public Expense(){}

    public Expense(int transactionID, String date, String category, double total, String paymentMethod) {
        this.transactionID = transactionID;
        this.date = date;
        this.category = category;
        this.total = total;
        this.paymentMethod = paymentMethod;
    }

    // getters
    public int getTransactionID() {
        return transactionID;
    }
    
    public String getDate() {
        return date;
    }

    public String getCategory() {
        return category;
    }

    public double getTotal() {
        return total;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    // setters
    public void setTransactionID(int transactionID) {
        this.transactionID = transactionID;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
