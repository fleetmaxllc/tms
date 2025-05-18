import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://hhnwrwkretympggpbmnw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhobndyd2tyZXR5bXBnZ3BibW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMTk4MDQsImV4cCI6MjA0MDc5NTgwNH0.wYCeye0G01aKsGIwSc2tMcC4BvNWu7ckRVKLp7-4ocI";
const supabase = createClient(supabaseUrl, supabaseKey);

const app = document.getElementById("app");

async function fetchLoads() {
  const { data, error } = await supabase.from("loads").select("*");
  if (error) {
    app.innerHTML = "<p>Error loading data.</p>";
    console.error(error);
    return;
  }
  renderTable(data);
}

function renderTable(data) {
  app.innerHTML = `
    <h1>Editable TMS Dashboard</h1>
    <table>
      <thead>
        <tr>
          <th>Truck</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Revenue</th>
          <th>Driver</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(row => `
          <tr data-id="${row.id}">
            <td><input value="${row.truck || ""}" data-field="truck" /></td>
            <td><input type="date" value="${row.start_date || ""}" data-field="start_date" /></td>
            <td><input type="date" value="${row.end_date || ""}" data-field="end_date" /></td>
            <td><input value="${row.revenue || ""}" data-field="revenue" /></td>
            <td><input value="${row.driver || ""}" data-field="driver" /></td>
            <td><button class="save-btn">Save</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".save-btn").forEach(btn =>
    btn.addEventListener("click", async (e) => {
      const tr = e.target.closest("tr");
      const id = tr.dataset.id;
      const inputs = tr.querySelectorAll("input");

      const update = {};
      inputs.forEach(input => {
        update[input.dataset.field] = input.value;
      });

      const { error } = await supabase.from("loads").update(update).eq("id", id);
      if (error) {
        alert("Error saving.");
        console.error(error);
      } else {
        alert("Saved.");
      }
    })
  );
}

fetchLoads();
