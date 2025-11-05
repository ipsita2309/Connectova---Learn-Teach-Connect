document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("reportContainer");
  const report = JSON.parse(localStorage.getItem("sharedReport"));

  if (!report) {
    container.innerHTML = `<p style="text-align:center;color:#555;">No reports shared yet by teacher.</p>`;
    return;
  }

  const box = document.createElement("div");
  box.classList.add("dashboard-box");

  box.innerHTML = `
    <h3><p style="color:black; font-size:18px;">${report.title}</p></h3>
    <p>Student: ${report.student}</p>
    <p>Score: <b>${report.score}%</b></p>
    <p>Shared on: ${report.sharedAt}</p>
    <a href="#" id="openReportBtn">Open Report</a>
  `;

  box.querySelector("#openReportBtn").addEventListener("click", () => {
    alert("Teacher shared report. (Here you can show or download the PDF.)");
  });

  container.appendChild(box);
});
