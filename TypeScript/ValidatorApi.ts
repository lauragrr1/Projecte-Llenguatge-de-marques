type Holiday = {
    date: string; // Format: "YYYY-MM-DD HH:mm:ss"
    start: string; // ISO 8601 format
    end: string; // ISO 8601 format
    name: string;
    type: string; // e.g., "public", "private"
    rule: string; // e.g., "MM-DD"
  };
  
  const isValidHoliday = (holiday: any): holiday is Holiday => {
    return (
      typeof holiday.date === "string" &&
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(holiday.date) &&
      typeof holiday.start === "string" &&
      typeof holiday.end === "string" &&
      typeof holiday.name === "string" &&
      typeof holiday.type === "string" &&
      typeof holiday.rule === "string"
    );
  };
  
  export { Holiday, isValidHoliday };