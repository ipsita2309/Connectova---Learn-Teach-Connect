const container = document.getElementById("reportContainer");

// Function to render parent reports
function renderReports() {
  container.innerHTML = "";
  const sharedReports = JSON.parse(localStorage.getItem("sharedReports")) || [];

  if (!sharedReports.length) {
    container.innerHTML = "<p>No reports shared yet by the teacher.</p>";
    return;
  }

  sharedReports.forEach(report => {
    const box = document.createElement("div");
    box.classList.add("dashboard-box");
    box.style.border = "1px solid #ccc";
    box.style.borderRadius = "8px";
    box.style.padding = "15px";
    box.style.marginBottom = "15px";
    box.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    box.style.backgroundColor = "#f9f9f9";

    box.innerHTML = `
      <h3 style="color:black;font-size:18px; margin-bottom:10px;">${report.title}</h3>
      <p style="margin: 5px 0;"><em>Shared on: ${report.date}</em></p>
      <a href="${report.link}" target="_blank" style="
        display:inline-block;
        background-color: #007BFF;
        color: white;
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 5px;
        margin-top: 10px;
        margin-right: 10px;
      ">Open Google Sheet</a>
      <button class="remove-report-btn" style="
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
      ">Remove Report</button>
    `;

    // Remove report functionality
    box.querySelector(".remove-report-btn").addEventListener("click", () => {
      const updatedReports = sharedReports.filter(r => r.title !== report.title);
      localStorage.setItem("sharedReports", JSON.stringify(updatedReports));
      renderReports(); // Re-render parent dashboard
    });

    container.appendChild(box);
  });
}

// Initial render
renderReports();

// Listen for changes in localStorage (teacher removing quiz or sharing new report)
window.addEventListener("storage", () => {
  renderReports();
});
