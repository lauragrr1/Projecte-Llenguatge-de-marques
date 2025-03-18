import Ajv from "Ajv";
import {Festiu, Tasca, FestiuArray, TascaArray } from "TypeCode.ts"; 
import festiusSchema from "../Json/SchemaFestius.json"; 
import tasquesSchema from "../Json/schemaTasques.json";

import fs from 'fs'; // Importem el mòdul fs per llegir fitxers locals
import path from 'path'; // Importem path per gestionar rutes de fitxers

// Llegeix els fitxers JSON locals
const festiusData = fs.readFileSync('path/to/csvjson.json', 'utf-8');
const festius: FestiuArray = JSON.parse(festiusData);
const tasquesData = fs.readFileSync('path/to/tasques.json', 'utf-8');
const tasques: TascaArray = JSON.parse(tasquesData);

// Configura Ajv per a la validació
const ajv = new Ajv();
const validateFestius = ajv.compile(festiusSchema);
const validateTasques = ajv.compile(tasquesSchema);

// Valida els festius
festius.forEach(element => {
    if (!validateFestius(Festiu)) {
        console.log("Error de validació en festiu: ", validateFestius.errors);
    }
});

// Valida les tasques
tasques.forEach(element => {
    if (!validateTasques(Tasca)) {
        console.log("Error de validació en tasca: ", validateTasques.errors);
    }
});

console.log("validació completada.");