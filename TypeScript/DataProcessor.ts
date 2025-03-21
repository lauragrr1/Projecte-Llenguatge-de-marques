import { Holiday } from "./types";

const processHolidays = (data: any): Holiday[] => {
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format");
  }
  return data.map((holiday) => {
    if (!holiday.date  !holiday.start  !holiday.end  !holiday.name  !holiday.type || !holiday.rule) {
      throw new Error("Missing required holiday fields");
    }
    return {
      date: holiday.date,
      start: holiday.start,
      end: holiday.end,
      name: holiday.name,
      type: holiday.type,
      rule: holiday.rule,
    };
  });
};

export { processHolidays };