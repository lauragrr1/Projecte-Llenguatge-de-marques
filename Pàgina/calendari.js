document.addEventListener("DOMContentLoaded", function () {
    generarCalendario(); // Genera el calendari al cargar la pàgina
});

function generarCalendario() {
    const mesSeleccionado = document.getElementById("mes").value; // Obté el mes seleccionat en el desplegable
    const diasContainer = document.getElementById("dias"); // Fa referencia a la taula on es mostraran el dies
    diasContainer.innerHTML = ""; // Neteja la taula abans de generar un altre mes
    
    const year = 2025; // Any fix a 2025
    const primerDia = (new Date(year, mesSeleccionado, 1).getDay() || 7) - 1; // Obté el dia de la setmana del primer dia del mes (s'ajusta per que el dilluns sigui l'inici ja que 0 = diumenge)
    const ultimoDia = new Date(year, parseInt(mesSeleccionado) + 1, 0).getDate(); // Obté l'últim dia del mes seleccionat
    
    let diaActual = 1; // Variable per controlar el dies que es coloquin en la taula
    for (let i = 0; i < 6; i++) { // Bucle per crear un màxim de 6 files (setmanes)
        let fila = document.createElement("tr"); // Crea una nova fila en la taula
        for (let j = 0; j < 7; j++) { // Bucle per crear 7 cel·les (dies)
            let celda = document.createElement("td"); // Crea una cel3la per un dia del mes
            if ((i === 0 && j < primerDia) || diaActual > ultimoDia) { // Condició per cel·les buides (abans del primer dia o després de l'últim)
                celda.innerHTML = ""; // Cel·la buida
                celda.style.backgroundColor = "#f0f0f0"; // Cambia el color del fons de les cel·les buides
            } else {
                celda.innerHTML = diaActual; // Assigna el número del dia
                celda.onclick = function () {
                    agregarTarea(diaActual, celda); // Assigna la funció per afegir tasques al fer clic
                };

                // Cargar tasques guardades del LocalStorage
                const clave = `2025-${parseInt(mesSeleccionado) + 1}-${diaActual}`;
                const tareaGuardada = localStorage.getItem(clave); // Obté la tasca guardada
                if (tareaGuardada) {
                    const tareaElement = document.createElement("div"); // Crea un element per mostrar la tasca
                    tareaElement.textContent = tareaGuardada; 
                    tareaElement.style.fontSize = "12px"; // Mida del text
                    tareaElement.style.color = "#333"; // Color del text
                    celda.appendChild(tareaElement); // Agrega la tasca dins de la cel·la del dia seleccionat
                }
                diaActual++; // Incrementa el contador de dies
            } 
            fila.appendChild(celda); // Agrega la cel·la a la fila
        }
        diasContainer.appendChild(fila); // Afegeix la fila completa a la taula
        if (diaActual > ultimoDia) break; // Pausa la generació de files si ja s'han col·locat tots els dies del mes
    }
}

function agregarTarea(dia, celda) {
    const mesSeleccionado = document.getElementById("mes").value; // Obté el mes seleccionat
    const tarea = prompt(`Afegir tasca:`); // Sol·licita a l'usuari que afegeixi una tasca al calendari
    if (tarea) {
        const tareaElement = document.createElement("div"); // Crea un element per mostrar la tasca al calendari
        tareaElement.textContent = tarea; // Assigna el text de la tasca
        tareaElement.style.fontSize = "12px"; // Mida per al text
        tareaElement.style.color = "#333"; // Color per al text
        celda.appendChild(tareaElement); // Afegeix la tasca dins de la cel·la del dia seleccionat

        // Per que la tasca afegida es guardi permanentment ??????
        const clave = `2025-${parseInt(mesSeleccionado) + 1}-${dia}`; 
        localStorage.setItem(clave,tarea);
    }
}

// Funció per netejar els mesos 
function limpiarTareas() {
    localStorage.clear(); 
    generarCalendario();
}

fetch('Json/csvjson.json') 
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verifica les dades en la consola
    mostrarFestius(data);
  })
  .catch(error => console.error('Error al carregar el JSON:', error));

function mostrarFestius(festius) {
  const container = document.getElementById('festiusContainer');
  container.innerHTML = '<h2>Festius</h2>';
  
  festius.forEach(festiu => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${festiu.Name}</strong> - ${festiu.Date}`;
    container.appendChild(div);
  });
}

//Funció extra
function trobarDiaDisponible(dataInicial, festius = []) {
    let diaActual = new Date(dataInicial);
    while (diaActual.getDay() === 6 || diaActual.getDay() === 0 || festius.includes(diaActual.toISOString().split('T')[0])) {
    diaActual.setDate(diaActual.getDate() + 1);
    }
    return diaActual.toISOString().split('T')[0];
    }
    
    function mostrarDiaDisponible() {
    const festiusEspanya = ["2025-12-25", "2025-12-26", "2025-01-01"];
    const dataInicial = "2025-03-18";
    const diaDisponible = trobarDiaDisponible(dataInicial, festiusEspanya);
    alert(`El proper dia laborable disponible és: ${diaDisponible}`);
    }
// Prova
const festiusEspanya = ["2025-12-25", "2025-12-26", "2025-01-01"]; // Dies festius personalitzats
const dataInicial = "2025-03-18";
const diaDisponible = trobarDiaDisponible(dataInicial, festiusEspanya);

console.log(`El proper dia laborable disponible és: ${diaDisponible}`);

/////////////////////////////////////////
const URL_HOLIDAYS = '/v2/holidays/holidays';
const festiusContainer = document.getElementById('festiusContainer');
const mesSelect = document.getElementById('mes') as HTMLSelectElement;
const tbodyDias = document.getElementById('dias');

// Función para generar el calendario y resaltar los festivos
async function generarCalendario() {
    const mes = mesSelect.value; // Mes seleccionado
    const year = 2025; // Año fijo para el calendario

    // Limpiar contenido previo
    tbodyDias.innerHTML = '';
    festiusContainer.innerHTML = '';

    // Obtener días festivos del mes seleccionado
    const festivos = await obtenerFestivos(mes, year);

    // Crear las filas del calendario
    const primerDiaMes = new Date(year, parseInt(mes), 1);
    const ultimoDiaMes = new Date(year, parseInt(mes) + 1, 0);

    let diaSemana = primerDiaMes.getDay(); // Día de la semana del primer día (0=Domingo, 1=Lunes, etc.)
    if (diaSemana === 0) diaSemana = 7; // Ajustar para empezar con Lunes

    // Crear filas del calendario
    let fila = document.createElement('tr');
    for (let i = 1; i < diaSemana; i++) {
        const celdaVacia = document.createElement('td');
        fila.appendChild(celdaVacia);
    }

    for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
        const celda = document.createElement('td');
        celda.textContent = dia.toString();

        // Resaltar si el día es festivo
        if (festivos.includes(dia)) {
            celda.classList.add('festivo');
        }

        fila.appendChild(celda);

        // Crear nueva fila al completar la semana
        if ((diaSemana + dia - 1) % 7 === 0 || dia === ultimoDiaMes.getDate()) {
            tbodyDias.appendChild(fila);
            fila = document.createElement('tr');
        }
    }

    mostrarFestivos(mes, festivos);
}

// Función para obtener festivos desde la API
async function obtenerFestivos(mes: string, year: number): Promise<number[]> {
    const queryParams = `?country=ES&state=CN&region=FU&year=${year}`;
    try {
        const response = await fetch(`${URL_HOLIDAYS}${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Error al obtener datos de la API');
        const data = await response.json();

        // Filtrar los festivos del mes seleccionado
        return data
            .filter((holiday: { date: string }) => new Date(holiday.date).getMonth() === parseInt(mes))
            .map((holiday: { date: string }) => new Date(holiday.date).getDate());
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Función para mostrar festivos en texto
function mostrarFestivos(mes: string, festivos: number[]) {
    const nombresMes = [
        'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
        'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre'
    ];
    festiusContainer.innerHTML = `<h3>Festius de ${nombresMes[parseInt(mes)]}:</h3>`;
    if (festivos.length > 0) {
        festivos.forEach(dia => {
            const festiuItem = document.createElement('div');
            festiuItem.textContent = `- Dia ${dia}`;
            festiusContainer.appendChild(festiuItem);
        });
    } else {
        festiusContainer.innerHTML += '<p>No hi ha festius aquest mes.</p>';
    }
}
