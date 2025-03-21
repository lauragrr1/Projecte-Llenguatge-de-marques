# Projecte-Llenguatge-de-marques

En aquest projecte volem fer un calendari del 2025 interactiu en el que tractarem les dades de la pàgina (https://api.generadordni.es/v2/holidays/holidays?country=ES&year=2025) on hi estan tots els festius d'Espanya i on es guardin les tasques que podría introduir l'usuari per a que apareguin en el calendari de manera local.

## Fitxers

- [TypeCode](TypeScript/TypeCode.ts) : Aquest fitxer contés les interfícies i tipus necessaris per a les dades de festius i tasques.

- [ValidatorApi](TypeScript/ValidatorApi.ts) : Aquest fitxer s'encarrega de validar les dades utilitzant JSON Schema i Ajv.

- [DataProcessor](TypeScript/DataProcessor.ts) : Aquest fitxer contés les funcions per processar les dades (filtres).

- [CalendariJS](Pàgina/calendari.js) : Aquest fitxer genera el calendari i permet afegir tasques.

- [CalendariCSS](Pàgina/calendari.css) : Aquest fitxer conté els estils per al calendari.

- [CalendariHTML](Pàgina/Calendar.html) : Aquest fitxer és la pàgina principal del calendari.

- [SchemaFestius](Json/SchemaFestius.json) : Aquest fitxer conté l'esquema de validació per als festius.

- [Festius](Json/csvjson.json) : Aquest fitxer conté les dades dels festius.



