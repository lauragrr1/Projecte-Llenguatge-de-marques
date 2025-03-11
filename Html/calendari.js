function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function generateCalendar() {
    const month = parseInt(document.getElementById("month-select").value);
    const year = 2025; // El año está fijo en 2025
    const firstDay = new Date(year, month, 1).getDay();
    const days = getDaysInMonth(month, year);
    const calendarBody = document.getElementById("calendar-body");
    document.getElementById("calendar-title").textContent = `${document.getElementById("month-select").options[month].text} ${year}`;
    
    calendarBody.innerHTML = "";
    let row = document.createElement("tr");
    
    for (let i = 1; i < (firstDay === 0 ? 7 : firstDay); i++) {
        let cell = document.createElement("td");
        cell.classList.add("empty");
        row.appendChild(cell);
    }
    
    for (let day = 1; day <= days; day++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
        let cell = document.createElement("td");
        cell.innerHTML = `<strong>${day}</strong>`;
        row.appendChild(cell);
    }
    
    while (row.children.length < 7) {
        let cell = document.createElement("td");
        cell.classList.add("empty");
        row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}

generateCalendar();