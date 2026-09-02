fetch("/api/expenses")
    .then(response => response.json())
    .then(expenses => {

        const tableBody = document.getElementById("expenseTableBody");

        expenses.forEach(expense => {

            const row = document.createElement("tr");

            const transactionID = document.createElement("td");
            transactionID.textContent = expense.transactionID;

            const date = document.createElement("td");
            date.textContent = expense.date;

            const category = document.createElement("td");
            category.textContent = expense.category;

            const total = document.createElement("td");
            total.textContent = "$" + expense.total.toFixed(2);

            const paymentMethod = document.createElement("td");
            paymentMethod.textContent = expense.paymentMethod;

            row.appendChild(transactionID);
            row.appendChild(date);
            row.appendChild(category);
            row.appendChild(total);
            row.appendChild(paymentMethod);

            tableBody.appendChild(row);
        });
    });