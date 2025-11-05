document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("progressContainer");

  // load uploaded quizzes
  const uploadedQuizzes = JSON.parse(localStorage.getItem("uploadedQuizzes")) || [];
  const quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];

  if (uploadedQuizzes.length === 0) {
    container.innerHTML = `<p style="text-align:center;">No quizzes uploaded yet.</p>`;
    return;
  }

  uploadedQuizzes.forEach((quiz) => {
    const quizBox = document.createElement("div");
    quizBox.classList.add("dashboard-box");

    // Filter student results for this quiz
    const results = quizResults.filter(r => r.quizTitle === quiz.title);

    let contentHTML = "";
    if (results.length === 0) {
      contentHTML = `<p>No submissions yet for <b>${quiz.title}</b>.</p>`;
    } else {
      contentHTML = results
        .map(
          (r) => `
          <div style="margin-top:10px; border-top:1px dashed #ccc; padding-top:8px;">
            <h4 style="color:black;">${r.studentName}</h4>
            <p>Score: <b>${r.score}%</b></p>
            <button class="report-btn" data-title="${quiz.title}" data-student="${r.studentName}" data-score="${r.score}">Generate Report</button>
            <button class="share-btn" data-title="${quiz.title}" data-student="${r.studentName}" data-score="${r.score}" style="margin-left:8px;">Share with Parent</button>
          </div>
        `
        )
        .join("");
    }

    quizBox.innerHTML = `
      <h3><p style="color:black; font-size:18px;">${quiz.title}</p></h3>
      <p>Uploaded by you</p>
      ${contentHTML}
    `;

    container.appendChild(quizBox);
  });

  // Generate PDF
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("report-btn")) {
      const { title, student, score } = e.target.dataset;
      generateReportPDF(title, student, score);
    }

    if (e.target.classList.contains("share-btn")) {
      const { title, student, score } = e.target.dataset;
      const reportData = { title, student, score, sharedAt: new Date().toLocaleString() };
      localStorage.setItem("sharedReport", JSON.stringify(reportData));
      alert(`Report for ${student} shared with parent!`);
    }
  });

  function generateReportPDF(title, student, score) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const grade =
      score >= 90 ? "A+" : score >= 75 ? "A" : score >= 60 ? "B" : "C";

    doc.text("Connectova — Student Report", 20, 20);
    doc.text(`Quiz Title: ${title}`, 20, 40);
    doc.text(`Student Name: ${student}`, 20, 50);
    doc.text(`Score: ${score}%`, 20, 60);
    doc.text(`Grade: ${grade}`, 20, 70);
    doc.text("Teacher Remarks: Keep improving your performance!", 20, 85);

    doc.save(`${student}_${title}_report.pdf`);
  }
});
