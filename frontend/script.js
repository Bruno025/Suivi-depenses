document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('expense-form');
  const description = document.getElementById('description');
  const amount = document.getElementById('amount');
  const category = document.getElementById('category');
  const month = document.getElementById('month');
  const chartCanvas = document.getElementById('summary-chart');
  const expensesList = document.getElementById('expenses-list');
  const btnViewAll = document.getElementById('view-all-expenses');
  const btnByCategory = document.getElementById('view-by-category');

  let summaryChart;

  async function loadMonthlySummary() {
    const res = await fetch('http://localhost:3000/expenses/monthly-summary');
    const data = await res.json();
    const labels = data.map(row => row.month);
    const totals = data.map(row => parseFloat(row.total));
    if (summaryChart) summaryChart.destroy();
    summaryChart = new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Total par Mois ($)', data: totals, backgroundColor: '#2f80ed' }]
      },
      options: { responsive: true }
    });
  }

  async function showAllExpenses() {
    const res = await fetch('http://localhost:3000/expenses');
    const data = await res.json();
    expensesList.innerHTML = '<h3> Liste des Dépenses</h3>';
    data.forEach(exp => {
      const item = document.createElement('div');
      item.classList.add('expense-item');
      item.innerHTML = `
        <span>${exp.description} - ${exp.amount}$ - ${exp.category} - ${exp.month}</span>
        <button onclick="deleteExpense(${exp.id})">Supprimer</button>
      `;
      expensesList.appendChild(item);
    });
  }

  async function showByCategory() {
    const res = await fetch('http://localhost:3000/expenses/by-category');
    const data = await res.json();
    expensesList.innerHTML = '<h3>Dépenses par Catégorie</h3>';
    data.forEach(row => {
      const line = document.createElement('div');
      line.classList.add('expense-item');
      line.innerHTML = `<span><strong>${row.category}</strong> : ${row.total}$</span>`;
      expensesList.appendChild(line);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      description: description.value,
      amount: parseFloat(amount.value),
      category: category.value,
      month: month.value,
    };
    await fetch('http://localhost:3000/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    form.reset();
    loadMonthlySummary();
    showAllExpenses();
  });

  btnViewAll.addEventListener('click', showAllExpenses);
  btnByCategory.addEventListener('click', showByCategory);

  loadMonthlySummary();
  showAllExpenses();
});

async function deleteExpense(id) {
  await fetch(`http://localhost:3000/expenses/${id}`, { method: 'DELETE' });
  location.reload();
}
