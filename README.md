# Projecte-Llenguatge-de-marques

En aquest projecte volem fer un calendari del 2025 interactiu en el que tractarem les dades de la pàgina (https://date.nager.at/PublicHoliday/Spain/2025) on hi estan tots els festius d'Espanya i les dades de les tasques que podría introduir l'usuari per a que apareguin en el calendari.

## Fitxers

- [TypeCode](TypeScript/TypeCode.ts) : Aquest fitxer contés les interfícies i tipus necessaris per a les dades de festius i tasques.

- [ValidatorApi](TypeScript/ValidatorApi.ts) : Aquest fitxer s'encarrega de validar les dades utilitzant JSON Schema i Ajv.

- [DataProcessor](TypeScript/DataProcessor.ts) : Aquest fitxer contés les funcions per processar les dades (filtres).

- [CalendariJS](Pàgina/calendari.js) : Aquest fitxer genera el calendari i permet afegir tasques.

- [CalendariCSS](Pàgina/calendari.css) : Aquest fitxer conté els estils per al calendari.

- [CalendariHTML](Pàgina/Calendar.html) : Aquest fitxer és la pàgina principal del calendari.

- [SchemaFestius](Json/SchemaFestius.json) : Aquest fitxer conté l'esquema de validació per als festius.

- [SchemaTasques](Json/schemaTasques.json) : Aquest fitxer conté l'esquema de validació per a les tasques.

- [Festius](Json/csvjson.json) : Aquest fitxer conté les dades dels festius.

- [Tasques](Json/tasques.json) : Aquest fitxer conté les dades de les tasques.

API: /v2/holidays/holidays?country=ES&state=CN&region=FU&year=2025


Código:

        // URL base de la API
        const URL_HOLIDAYS = '/v2/holidays/holidays';

        // Variables donde guardamos los elementos HTML según el ID
        const searchInput = document.getElementById("search") as HTMLInputElement;
        const holidaysContainer = document.getElementById("holidays-container");
        const searchButton = document.getElementById("search-button");

        interface Holiday {
        name: string;
        date: string;
        }

        // Función asíncrona para obtener festividades de la API
        async function fetchHolidays() {
        const year = searchInput?.value || '2025'; // Se toma el año ingresado por el usuario o 2025 por defecto
        const queryParams = `?country=ES&state=CN&region=FU&year=${year}`; // Parámetros de la consulta
        try {
            const response = await fetch(`${URL_HOLIDAYS}${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            if (!response.ok) throw new Error('Error al obtener datos de la API');
    
            const data: Holiday[] = await response.json(); // Se espera un arreglo de objetos Holiday

            // Mostrar resultados en el contenedor HTML
            if (holidaysContainer) {
            holidaysContainer.innerHTML = data.length > 0
                ? data.map(holiday => `
                <div class="holiday-item">
                    <h3>${holiday.name}</h3>
                    <p>Fecha: ${holiday.date}</p>
                </div>
                `).join('')
                : '<p>No se encontraron festividades para este año.</p>';
            }
        } catch (error) {
            console.error('Error:', error);
            if (holidaysContainer) {
            holidaysContainer.innerHTML = '<p>Error al obtener las festividades.</p>';
            }
        }
        }

        // Listener para buscar cuando se hace clic en el botón
        searchButton?.addEventListener("click", fetchHolidays);

        // Listener para activar la búsqueda con la tecla Enter
        searchInput?.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            fetchHolidays();
        }
        });
