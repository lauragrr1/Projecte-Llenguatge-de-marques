// Interficie per als festius 
interface Festiu {
  Date: string; // Data del festiu en format YYYY-MM-DD
  LocalName: string; // Nom local del festiu
  Name: string; // Nom del festiu
  National: boolean; // Indica si es un festiu nacional
  SubdivisionCodes: string[]; // per exemple, provincies
  }
  
// Interficie per a les tasques
interface Tasca {
  Date: string; // Data de la tasca en format YYYY-MM-DD
  Title: string; // Títol de la tasca
  Description: string; // Descripció de la tasca
  Hour: string; // Hora de la tasca
  Status: boolean; // Estat de la tasca (completada o no )
}

// Tipus per a arrays de festius i tasques
type FestiuArray = Festiu[]; 
type TascaArray = Tasca[]; 