const monthSelect = document.getElementById('month-select');
const calendarTable = document.getElementById('calendar-table').getElementsByTagName('tbody')[0];

function generateCalendar(year, month) {
    calendarTable.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('td');
        row.appendChild(cell);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        if (row.children.length === 7) {
            calendarTable.appendChild(row);
            row = document.createElement('tr');
        }
        const cell = document.createElement('td');
        cell.textContent = day;
        cell.addEventListener('click', () => {
            const event = prompt('Agregar evento:');
            if (event) {
                cell.innerHTML = `${day}<br><span>${event}</span>`;
            }
        });
        row.appendChild(cell);
    }
    calendarTable.appendChild(row);
}

monthSelect.addEventListener('change', () => {
    generateCalendar(2025, parseInt(monthSelect.value));
});

generateCalendar(2025, 0); // Inicialmente muestra enero 2025
