import Ajv from "ajv";
import {Festiu, Tasca, FestiuArray, TascaArray } from "./TypeCode"; 
import festiusSchema from "./SchemaFestius.json"; 
import tasquesSchema from "./SchemaTasques.json";

const fs = require('fs'); // Importem el mòdul fs per llegir fitxers locals
const path = require('path'); // Importem path per gestionar rutes de fitxers

// Llegeix els fitxers JSON locals
const festiusData = fs.readFileSync('path/to/csvjson.json', 'utf-8');
const festius: FestiuArray = JSON.parse(festiuData);
const tasquesData = fs.readFileSync('path/to/tasques.json', 'utf-8');
const tasques: TascaArray = JSON.parse(tasquesData);

// Configura Ajv per a la validació
const ajv = new Ajv();
const validateFestius = ajv.compile(festiusSchema);
const validateTasques = ajv.compile(tasquesSchema);