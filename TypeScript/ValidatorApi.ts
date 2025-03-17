import Ajv from "ajv";
import type {Festiu} from "./TypeCode"; 
import eventSchema from "../Json/Api.json"; 

const response = await fetch('https://json-schema.org/draft-07/schema#') 
const data = await response.json()
const event: Event[] = data.event 

const ajv = new Ajv();
const validateEvent = ajv.compile(eventSchema); 


event.forEach(event => {
const valid = validateEvent(event); 
if (!valid) {
console.log("Errores de validación: ", validateEvent.errors); 
} else {
console.log(event.Date, " - ", event.LocalName); 
}
}); 