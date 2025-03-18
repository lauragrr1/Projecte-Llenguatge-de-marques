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
    const clave = `2025-${parseInt(mesSeleccionado) + 1}-${dia}`;

    let tareasGuardadas = localStorage.getItem(clave);
    tareasGuardadas = tareasGuardadas ? JSON.parse(tareasGuardadas) : []; // Converteix el JSON a array
    const tarea = prompt(`Afegir tasca:`); // Sol·licita a l'usuari que afegeixi una tasca al calendari
    
    if (tarea) {
        tareasGuardadas.push(tarea); // Agrega la nova tasca a l'array
        localStorage.setItem(clave, JSON.stringify(tareasGuardadas)); // // Guarda el array actualitzat
        
        celda.innerHTML = dia; // Restableix elnúmero del dia
        tareasGuardadas.forEach(tarea => {
        const tareaElement = document.createElement("div"); // Crea un element per mostrar la tasca al calendari
        tareaElement.textContent = tarea; // Assigna el text de la tasca
        tareaElement.style.fontSize = "12px"; // Mida per al text
        tareaElement.style.color = "#333"; // Color per al text
        celda.appendChild(tareaElement); // Afegeix la tasca dins de la cel·la del dia seleccionat
        })


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
