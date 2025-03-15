interface Festiu {
    Date: string; // Data del festiu en format YYYY-MM-DD
    LocalName: string; // Nom local del festiu
    Name: string; // Festiu
    National: boolean; // Indica si es un festiu nacional
    SubdivisionCodes: string[]; // per exemple, provincies
  }
  
  type FestiuArray = Festiu[]; // Array d'objectes tipus Festiu
  