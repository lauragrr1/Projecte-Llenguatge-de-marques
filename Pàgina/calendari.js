document.addEventListener("DOMContentLoaded", function () {
    generarCalendario(); // Genera el calendari al cargar la pàgina
});

function generarCalendario() {
    const mesSeleccionado = document.getElementById("mes").value;
    const diasContainer = document.getElementById("dias");
    diasContainer.innerHTML = ""; // Neteja la taula abans de generar un altre mes
    
    const year = 2025;
    const primerDia = (new Date(year, mesSeleccionado, 1).getDay() || 7) - 1; // S'ajusta per començar la setmana en dilluns
    const ultimoDia = new Date(year, parseInt(mesSeleccionado) + 1, 0).getDate();
    
    let diaActual = 1;
    for (let i = 0; i < 6; i++) { // Màxim 6 files
        let fila = document.createElement("tr");
        for (let j = 0; j < 7; j++) { // 7 dies de la setmana
            let celda = document.createElement("td");
            if ((i === 0 && j < primerDia) || diaActual > ultimoDia) {
                celda.innerHTML = ""; // Cel·la buida
                celda.style.backgroundColor = "#f0f0f0"; // Estil per a cel·les buides
            } else {
                celda.innerHTML = diaActual;
                celda.onclick = function () {
                    agregarTarea(diaActual, celda);
                };
                diaActual++;
            }
            fila.appendChild(celda);
        }
        diasContainer.appendChild(fila);
        if (diaActual > ultimoDia) break;
    }
}

function agregarTarea(dia, celda) {
    const tarea = prompt(`Agregar tarea:`);
    if (tarea) {
        const tareaElement = document.createElement("div");
        tareaElement.textContent = tarea;
        tareaElement.style.fontSize = "12px";
        tareaElement.style.color = "#333";
        celda.appendChild(tareaElement);
    }
}