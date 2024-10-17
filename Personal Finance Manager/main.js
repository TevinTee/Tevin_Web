//Work in progress

let transactions = [
    { id: 1, amount: 1000, type: "income", category: "Salary", description: "Monthly salary", date: "2024-10-10" },
    { id: 2, amount: 200, type: "expense", category: "Groceries", description: "Weekly shopping", date: "2024-10-11" }
];

// Display the transactions in the table
function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        transactionList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.type}</td>
                <td>${transaction.category}</td>
                <td>${transaction.description}</td>
                <td>${transaction.date}</td>
                <td>
                    <button class="btn btn-warning">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Call displayTransactions on page load
document.addEventListener('DOMContentLoaded', () => {
    displayTransactions();
});

// Chart.js to display expense categories
const ctx = document.getElementById('expenseChart').getContext('2d');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Rent', 'Groceries', 'Utilities'],
        datasets: [{
            label: 'Expenses',
            data: [800, 200, 100],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
        }]
    }
});

fetch('http://localhost:7000/transactions')
    .then(response => response.json())
    .then(data => {
        transactions = data;
        displayTransactions();
    });

// Add new transaction via API
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newTransaction = {
        amount: document.getElementById('amount').value,
        type: document.getElementById('type').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value
    };
    fetch('http://localhost:7000/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTransaction)
    })
    .then(response => response.json())
    .then(data => {
        transactions.push(data);
        displayTransactions();
    });
});










