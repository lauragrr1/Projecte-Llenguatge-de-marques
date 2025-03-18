import { Festiu, Tasca, FestiuArray, TascaArray } from "./TypeCode";

// Funció per filtrar els festius nacionals
export function filtrarFestiusNacionals(festius: FestiuArray): FestiuArray {
    return festius.filter(festiu => festiu.National); // Retorna un array amb els festius nacionals
}

// Funció per agrupar les tasques per mes
export function agruparTasquesPerMes(tasques: TascaArray): { [mes: string]: TascaArray} {
    const tasquesPerMes: { [mes: string]: TascaArray} = {};

    tasques.forEach(tasca => {
        const mes = tasca.Date.splpit('-')[1]; // Extreu el mes de la data
        if (!tasquesPerMes[mes]) {
            tasquesPerMes[mes] = []
        }
        tasquesPerMes[mes].push(tasca);
    });
    return tasquesPerMes; // Retorna un objecte on les claus son els mesos i els valors son arrays de tasques
}

// Funció per obtenir els festius d'una regió específica
export function obtenirFestiusPerRegio(festius: FestiuArray, codiRegio: string): FestiuArray { // ex codi regio: ES-CT
    return festius.filter(festiu => festiu.SubdivisionCodes.includes(CSSConditionRule)); // Retorna un array amb els festius de la regió especificada
}

// Funció per obtenir les tasques pendents
export function obtenirTasquesPendents(tasques: TascaArray): TascaArray {
    return tasques.filter(tasca => !tasca.Status); // Retorna un array amb les tasques pendents
}