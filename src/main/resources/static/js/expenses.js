// console.log("expenses.js loaded");

const categoryColors = {
    Food: "#36A2EB",
    Transportation: "#FF6384",
    Entertainment: "#FFCE56",
    Shopping: "#9966FF",
    Bills: "#4BC0C0"
};

let selectedRow = null;
let selectedExpenseId = null;
let selectedExpenseCategory = null;
let categoryChart = null;

// category counters for pie chart
let foodCount = 0;
let transportationCount = 0;
let entertainmentCount = 0;
let shoppingCount = 0;
let billCount = 0;

fetch("/api/expenses")
    .then(response => response.json())
    .then(expenses => {
        const tableBody = document.getElementById("expenseTableBody");

        expenses.forEach(expense => {

            const row = document.createElement("tr");

            // make each entry clickable for easy deletion
            row.dataset.id = expense.transactionID;
            row.dataset.category = expense.category;

            row.addEventListener("click", function() {
                // console.log("ROW CLICKED");

                selectedRow = this;
                selectedExpenseId = this.dataset.id;
                selectedExpenseCategory = this.dataset.category;

                document.getElementById("deleteModal").style.display = "flex";
            });

            const transactionID = document.createElement("td");
            transactionID.textContent = expense.transactionID;

            const date = document.createElement("td");
            date.textContent = expense.date;

            const category = document.createElement("td");
            const categoryName = expense.category;
            if (categoryName === "Food") {
                foodCount++;
            }
            else if (categoryName === "Transportation") {
                transportationCount++;
            }
            else if (categoryName === "Entertainment") {
                entertainmentCount++;
            }
            else if (categoryName === "Shopping") {
                shoppingCount++;
            }
            else if (categoryName === "Bills") {
                billCount++;
            }

            category.textContent = expense.category;
            category.style.color = categoryColors[categoryName];
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

        categoryChart = new Chart(ctx, {
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

    // cancel delete
    document.getElementById("cancelDelete").addEventListener("click", function() {
        document.getElementById("deleteModal").style.display = "none";

        selectedRow = null;
        selectedExpenseId = null;
        selectedExpenseCategory = null;
    });
    
    // confirm delete
    document.getElementById("confirmDelete").addEventListener("click", function () {
        fetch(`/api/expenses/${selectedExpenseId}`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.ok) {
                let categoryName = selectedExpenseCategory;

                selectedRow.remove();
                if (categoryName === "Food") {
                    foodCount--;
                }
                else if (categoryName === "Transportation") {
                    transportationCount--;
                }
                else if (categoryName === "Entertainment") {
                    entertainmentCount--;
                }
                else if (categoryName === "Shopping") {
                    shoppingCount--;
                }
                else if (categoryName === "Bills") {
                    billCount--;
                }

                categoryChart.data.datasets[0].data = [
                    foodCount,
                    transportationCount,
                    entertainmentCount,
                    shoppingCount,
                    billCount
                ];

                categoryChart.update();

                document.getElementById("deleteModal").style.display = "none";

                selectedRow = null;
                selectedExpenseId = null;
                selectedExpenseCategory = null;
            }
        });
    });

    

            
                

    //             if (confirm("Delete this expense?")) {

    //                 fetch(`/api/expenses/${id}`, {
    //                     method: "DELETE"
    //                 })
    //                 .then(response => {

    //                     if (response.ok) {

    //                         this.remove();

    //                         if (categoryName === "Food") {
    //                             foodCount--;
    //                         }
    //                         else if (categoryName === "Transportation") {
    //                             transportationCount--;
    //                         }
    //                         else if (categoryName === "Entertainment") {
    //                             entertainmentCount--;
    //                         }
    //                         else if (categoryName === "Shopping") {
    //                             shoppingCount--;
    //                         }
    //                         else if (categoryName === "Bills") {
    //                             billCount--;
    //                         }

    //                         categoryChart.data.datasets[0].data = [
    //                             foodCount,
    //                             transportationCount,
    //                             entertainmentCount,
    //                             shoppingCount,
    //                             billCount
    //                         ];

    //                         categoryChart.update();
    //                     }
    //                 });
    //             }
    //         });

    //         const transactionID = document.createElement("td");
    //         transactionID.textContent = expense.transactionID;

    //         const date = document.createElement("td");
    //         date.textContent = expense.date;

    //         const category = document.createElement("td");

    //         if (expense.category === "Food") {
    //             foodCount++;
    //         } 
    //         else if (expense.category === "Transportation") {
    //             transportationCount++;
    //         } 
    //         else if (expense.category === "Entertainment") {
    //             entertainmentCount++;
    //         } 
    //         else if (expense.category === "Shopping") {
    //             shoppingCount++;
    //         }
    //         else if (expense.category === "Bills") {
    //             billCount++;
    //         }
    //         category.textContent = expense.category;
    //         category.style.color = categoryColors[expense.category];
    //         category.style.fontWeight = "bold";

    //         const total = document.createElement("td");
    //         total.textContent = "$" + expense.total.toFixed(2);

    //         const paymentMethod = document.createElement("td");
    //         paymentMethod.textContent = expense.paymentMethod;

    //         row.appendChild(transactionID);
    //         row.appendChild(date);
    //         row.appendChild(category);
    //         row.appendChild(total);
    //         row.appendChild(paymentMethod);

    //         tableBody.appendChild(row);
    //     });

    //      // create pie chart
    //     const ctx = document.getElementById("categoryPieChart");

    //     const categoryChart = new Chart(ctx, {
    //         type: "pie",
    //         data: {
    //             labels: [
    //                 "Food",
    //                 "Transportation",
    //                 "Entertainment",
    //                 "Shopping",
    //                 "Bills"
    //             ],
    //             datasets: [{
    //                 data: [
    //                     foodCount,
    //                     transportationCount,
    //                     entertainmentCount,
    //                     shoppingCount,
    //                     billCount
    //                 ],
    //                 backgroundColor: [
    //                     categoryColors.Food,
    //                     categoryColors.Transportation,
    //                     categoryColors.Entertainment,
    //                     categoryColors.Shopping,
    //                     categoryColors.Bills
    //                 ]
    //             }]
    //         },
    //         options: {
    //             plugins: {
    //                 tooltip: {
    //                     callbacks: {
    //                         label: function(context) {
    //                             const label = context.label;
    //                             const count = context.raw;
    //                             const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
    //                             const percentage = ((count / total) * 100).toFixed(1);

    //                             return [
    //                                 `Expenses: ${count}`, 
    //                                 `Percentage: ${percentage}%`
    //                             ];
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // });