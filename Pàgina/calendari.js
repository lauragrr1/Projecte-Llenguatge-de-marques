const holidays = [
    {
      date: "2025-01-01 00:00:00",
      start: "2025-01-01T00:00:00.000Z",
      end: "2025-01-02T00:00:00.000Z",
      name: "Año Nuevo",
      type: "public",
      rule: "01-01"
    },
    {
      date: "2025-01-06 00:00:00",
      start: "2025-01-06T00:00:00.000Z",
      end: "2025-01-07T00:00:00.000Z",
      name: "Reyes",
      type: "public",
      rule: "01-06"
    }
  ];
  
  function buscarFestivo() {
    const input = document.getElementById("buscador-festivo").value.toLowerCase();
    const results = holidays.filter((holiday) =>
      holiday.name.toLowerCase().includes(input)
    );
    const container = document.getElementById("festiusContainer");
    container.innerHTML = results.map((h) =>
      <p>${h.date}: ${h.name} (Tipo: ${h.type})</p>
    ).join("");
  }