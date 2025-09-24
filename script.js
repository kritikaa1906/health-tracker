// Patient records array
let patients = [];

// Handle form submit
document.getElementById("patientForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const bp = parseInt(document.getElementById("bp").value);
  const sugar = parseInt(document.getElementById("sugar").value);
  const depression = parseInt(document.getElementById("depression").value);

  patients.push({ name, bp, sugar, depression });
  updatePatientList();
  updateCharts();

  this.reset();
});

// Update patient list
function updatePatientList() {
  const list = document.getElementById("patientList");
  list.innerHTML = "";
  patients.forEach(p => {
    const li = document.createElement("li");
    li.textContent = ${p.name} - BP: ${p.bp}, Sugar: ${p.sugar}, Depression: ${p.depression};
    list.appendChild(li);
  });
}

// Charts
const bpCtx = document.getElementById("bpChart").getContext("2d");
const sugarCtx = document.getElementById("sugarChart").getContext("2d");

let bpChart = new Chart(bpCtx, {
  type: "line",
  data: { labels: [], datasets: [{ label: "Blood Pressure", data: [], borderColor: "red" }] }
});

let sugarChart = new Chart(sugarCtx, {
  type: "line",
  data: { labels: [], datasets: [{ label: "Blood Sugar", data: [], borderColor: "blue" }] }
});

function updateCharts() {
  const labels = patients.map(p => p.name);
  bpChart.data.labels = labels;
  bpChart.data.datasets[0].data = patients.map(p => p.bp);
  bpChart.update();

  sugarChart.data.labels = labels;
  sugarChart.data.datasets[0].data = patients.map(p => p.sugar);
  sugarChart.update();
}
