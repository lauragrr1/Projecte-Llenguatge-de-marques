function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate(); // Obtenció del número de dies del mes
}

function generateCalendar() {
    const month = parseInt(document.getElementById("month-select").value); // Obté el mes seleccionat
    const year = 2025; // Any fixat al 2025
    const firstDay = new Date(year, month, 1).getDay(); // Obté el dia de la setmana del primer dia del mes
    const days = getDaysInMonth(month, year); // Obté el número de dies del mes
    const calendarBody = document.getElementById("calendar-body");
    document.getElementById("calendar-title").textContent = `${document.getElementById("month-select").options[month].text} ${year}`; // Actualitza el títol
    
    calendarBody.innerHTML = ""; // Neteja el calendari anterior
    let row = document.createElement("tr"); // Crea una nova fila
    
    // Afegim cel·les buides per els dies anteriors al primer dia del mes
    for (let i = 1; i < (firstDay === 0 ? 7 : firstDay); i++) {
        let cell = document.createElement("td");
        cell.classList.add("empty");
        row.appendChild(cell);
    }
    
    // Agefeix els dies del mes
    for (let day = 1; day <= days; day++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
        let cell = document.createElement("td");
        cell.innerHTML = `<strong>${day}</strong>`;
        row.appendChild(cell);
    }
    
    // Afegeix cel·les buides per completar l'última fila
    while (row.children.length < 7) {
        let cell = document.createElement("td");
        cell.classList.add("empty");
        row.appendChild(cell);
    }
    calendarBody.appendChild(row); // Afegeix l'última fila al calendari
}

generateCalendar(); // Genera el calendari al cargar la pàgina