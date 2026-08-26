CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE, 
    category VARCHAR(25),
    total DOUBLE, 
    payment_method VARCHAR(15)
);