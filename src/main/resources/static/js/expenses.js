const categoryColors = {
    Food: "#36A2EB",
    Transportation: "#FF6384",
    Entertainment: "#FFCE56",
    Shopping: "#9966FF",
    Bills: "#4BC0C0"
};

fetch("/api/expenses")
    .then(response => response.json())
    .then(expenses => {

        let foodCount = 0;
        let transportationCount = 0;
        let entertainmentCount = 0;
        let shoppingCount = 0;
        let billCount = 0;

        const tableBody = document.getElementById("expenseTableBody");

        expenses.forEach(expense => {

            const row = document.createElement("tr");

            const transactionID = document.createElement("td");
            transactionID.textContent = expense.transactionID;

            const date = document.createElement("td");
            date.textContent = expense.date;

            const category = document.createElement("td");

            if (expense.category === "Food") {
                foodCount++;
            } 
            else if (expense.category === "Transportation") {
                transportationCount++;
            } 
            else if (expense.category === "Entertainment") {
                entertainmentCount++;
            } 
            else if (expense.category === "Shopping") {
                shoppingCount++;
            }
            else if (expense.category === "Bills") {
                billCount++;
            }
            category.textContent = expense.category;
            category.style.color = categoryColors[expense.category];
            category.style.fontWeight = "bold";

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

         // create pie chart
        const ctx = document.getElementById("categoryPieChart");

        new Chart(ctx, {
            type: "pie",
            data: {
                labels: [
                    "Food",
                    "Transportation",
                    "Entertainment",
                    "Shopping",
                    "Bills"
                ],
                datasets: [{
                    data: [
                        foodCount,
                        transportationCount,
                        entertainmentCount,
                        shoppingCount,
                        billCount
                    ],
                    backgroundColor: [
                        categoryColors.Food,
                        categoryColors.Transportation,
                        categoryColors.Entertainment,
                        categoryColors.Shopping,
                        categoryColors.Bills
                    ]
                }]
            },
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label;
                                const count = context.raw;
                                const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                                const percentage = ((count / total) * 100).toFixed(1);

                                return [
                                    `Expenses: ${count}`, 
                                    `Percentage: ${percentage}%`
                                ];
                            }
                        }
                    }
                }
            }
        });
    });