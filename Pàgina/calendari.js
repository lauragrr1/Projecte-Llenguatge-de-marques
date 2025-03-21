document.addEventListener("DOMContentLoaded", function () {
  generarCalendario(); // Generar el calendario al cargar la página
});

// Función para generar el calendario
async function generarCalendario() {
  const mesSeleccionado = mesSelect.value; // Obtener el mes seleccionado
  tbodyDias.innerHTML = ""; // Limpiar la tabla de días
  festiusContainer.innerHTML = ""; // Limpiar festivos previos

  const year = 2025; // Año fijo
  const primerDia = (new Date(year, mesSeleccionado, 1).getDay() || 7) - 1; // Día del primer día del mes
  const ultimoDia = new Date(year, parseInt(mesSeleccionado) + 1, 0).getDate(); // Último día del mes

  let diaActual = 1; // Día inicial
 const festivos = await obtenerFestivos(mesSeleccionado, year); // Obtener festivos desde la API

for (let i = 0; i < 6; i++) { // Crear máximo 6 filas (semanas)
    let fila = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
        let celda = document.createElement("td");
        if ((i === 0 && j < primerDia) || diaActual > ultimoDia) {
            celda.innerHTML = ""; // Celda vacía
            celda.style.backgroundColor = "#f0f0f0"; // Color para celdas vacías
            } else {
            celda.textContent = diaActual; // Mostrar el número del día
            celda.onclick = function () {
                agregarTarea(celda.textContent, celda); // Permitir agregar tareas
            };
               
            // Resaltar si es festivo
            /*if (festivos.includes(diaActual)) {
                celda.classList.add("festivo");
            }*/
               const fecha = new Date(2025, mesSeleccionado, diaActual, 0, 0, 0);
                const formatoFecha = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')} ${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}:${String(fecha.getSeconds()).padStart(2, '0')}`;
                
                if (festivos.includes(formatoFecha)){
                    celda.classList.add("festivo");
                }

                if (festivos.some(festivo => festivo.date===formatoFecha)){celda.classList.add("festivo");}
            



            // Cargar tareas desde localStorage
            const clave = `2025-${parseInt(mesSeleccionado) + 1}-${diaActual}`;
            const tareaGuardada = localStorage.getItem(clave);
            if (tareaGuardada) {
                const tareaElement = document.createElement("div");
                tareaElement.textContent = tareaGuardada;
                tareaElement.style.fontSize = "12px";
                tareaElement.style.color = "#333";
                celda.appendChild(tareaElement);
            }
            diaActual++;
        }
        fila.appendChild(celda);
    }
    tbodyDias.appendChild(fila); // Añadir la fila al calendario
    if (diaActual > ultimoDia) break; // Salir del bucle si se han colocado todos los días
}

mostrarFestivos(mesSeleccionado, festivos);
}

// URL para obtener los festivos desde la API
const URL_HOLIDAYS ='https://api.generadordni.es/v2/holidays/holidays';
const festiusContainer = document.getElementById('festiusContainer');
const mesSelect = document.getElementById('mes');
const tbodyDias = document.getElementById('dias');

// Función para obtener festivos desde la API
async function obtenerFestivos(mes, year) {
  const queryParams = `?country=ES&year=${year}`;
  try {
      const response = await fetch(`${URL_HOLIDAYS}${queryParams}`);
      if (!response.ok) throw new Error('Error al obtener datos de la API');
      const data = await response.json();
        
      // Filtrar festivos del mes seleccionado
      return data.filter(festivo =>
        new Date(festivo.date).getMonth() === parseInt(mes)
      );
    /*  return data
          .filter(festivo => new Date(festivo.date).getMonth() === parseInt(mes))
          .map(festivo => new Date(festivo.date).getDate())
          .map(festivo => (festivo.name));*/
  } catch (error) {
      console.error('Error:', error);
      return [];
  }
}


// Función para agregar una tarea
function agregarTarea(dia, celda) {
  const mesSeleccionado = mesSelect.value;
  const tarea = prompt(`Afegir tasca:`); // Solicitar tarea
  if (tarea) {
      const tareaElement = document.createElement("div");
      tareaElement.textContent = tarea;
      tareaElement.style.fontSize = "12px";
      tareaElement.style.color = "#333";
      celda.appendChild(tareaElement);

      const clave = `2025-${parseInt(mesSeleccionado) + 1}-${dia}`;
      localStorage.setItem(clave, tarea); // Guardar la tarea en localStorage
  }
}

// Función para limpiar todas las tareas
function limpiarTareas() {
  localStorage.clear(); // Limpiar localStorage
  generarCalendario(); // Regenerar el calendario
}

// Función para mostrar los festivos debajo del calendario
function mostrarFestivos(mes, festivos) {
    const nombresMes = [
      'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
      'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre'
  ];
  festiusContainer.innerHTML = `<h3>Festius de ${nombresMes[parseInt(mes)]}:</h3>`;
  if (festivos.length > 0) {
    
      festivos.forEach(dia => {
          const festiuItem = document.createElement('div');
          const dia_mes = new Date(dia.date).getDate();

          festiuItem.textContent = `- Dia ${dia_mes} -  ${dia.name}`; // Muestra el campo `name` y el día
          festiusContainer.appendChild(festiuItem);
      });
  } else {
      festiusContainer.innerHTML += '<p>No hi ha festius aquest mes.</p>';
  }
}

//Funcion para ver dias libres
function mostrarDiaDisponible() {

// Seleccionar el contenedor principal
const dias = document.getElementById("dias");

// Seleccionar todos los <td> dentro del contenedor
const celda = dias.querySelectorAll("td");

// Filtrar las celdas con textContent menor a 3 caracteres
const celdasFiltradas = Array.from(celda).filter(celda => celda.textContent.trim().length < 3 && celda.textContent.trim().length > 0 && celda.backgroundColor !="#ffcccc;");

// Recorrer las celdas filtradas y hacer algo con ellas
celdasFiltradas.forEach(celda => {
  celda.style.backgroundColor = "yellow"; // Resaltar las celdas
});
}
