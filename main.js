
// Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = "https://hhnwrwkretympggpbmnw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhobndyd2tyZXR5bXBnZ3BibW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMTk4MDQsImV4cCI6MjA0MDc5NTgwNH0.wYCeye0G01aKsGIwSc2tMcC4BvNWu7ckRVKLp7-4ocI";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchLoadData() {
  const { data, error } = await supabase.from("LoadData").select("*");

  if (error) {
    document.getElementById("app").textContent = "Error: " + error.message;
    return;
  }

  renderTable(data);
}

function renderTable(loads) {
  const table = document.createElement("table");

  const headers = ["Truck", "Start Dt", "End Dt", "TS- Revenue", "Driver ID"];
  const headerRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  loads.forEach(load => {
    const row = document.createElement("tr");
    headers.forEach(field => {
      const td = document.createElement("td");
      td.textContent = load[field] || "";
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(table);
}

fetchLoadData();
