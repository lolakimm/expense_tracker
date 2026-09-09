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

// pagination
const expensesPerPage = 12;
let currentPage = 1;
let allExpenses = [];

fetch("/api/expenses")
    .then(response => response.json())
    .then(expenses => {
        allExpenses = expenses;

        const tableBody = document.getElementById("expenseTableBody");

        // count expenses by category
        expenses.forEach(expense => {
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
        });

        // display current page
        function displayPage() {
            tableBody.innerHTML = "";

            const start = (currentPage - 1) * expensesPerPage;
            const end = start + expensesPerPage;

            const pageExpenses = allExpenses.slice(start, end);

            pageExpenses.forEach(expense => {
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

            createPagination();
        }

        // pagination buttons
        function createPagination() {
            const pagination = document.getElementById("pagination");

            pagination.innerHTML = "";

            const totalPages = Math.ceil(allExpenses.length / expensesPerPage);

            // previous
            const previousButton = document.createElement("button");
            previousButton.textContent = "Previous";

            previousButton.disabled = currentPage === 1;

            previousButton.addEventListener("click", function () {
                if(currentPage > 1) {
                    currentPage--;
                    displayPage();
                }
            });

            pagination.appendChild(previousButton);

            // page number buttons
            for (let page = 1; page <= totalPages; page++) {
                const pageButton = document.createElement("button");

                pageButton.textContent = page;

                if(page === currentPage) {
                    pageButton.classList.add("active");
                }

                pageButton.addEventListener("click", function() {
                    currentPage = page;
                    displayPage();
                });

                pagination.appendChild(pageButton);
            }

            // next button
            const nextButton = document.createElement("button");
            nextButton.textContent = "Next";

            nextButton.disabled = currentPage === totalPages;

            nextButton.addEventListener("click", function() {
                if(currentPage < totalPages) {
                    currentPage++;
                    displayPage();
                }
            });

            pagination.appendChild(nextButton);
        }

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
        displayPage();

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

                    allExpenses = allExpenses.filter(
                        expense => expense.transactionID != selectedExpenseId
                    );
                    
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

                    // check if the current page becomes empty
                    const totalPages = Math.ceil(allExpenses.length / expensesPerPage);

                    if(currentPage > totalPages && currentPage > 1) {
                        currentPage--;
                    }

                    displayPage();

                    document.getElementById("deleteModal").style.display = "none";

                    selectedRow = null;
                    selectedExpenseId = null;
                    selectedExpenseCategory = null;
                }
            });
        });
    });