document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("progressContainer");
  container.innerHTML = "";

  const quizUploaded = localStorage.getItem("quizUploaded");
  const quizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");

  if (!quizUploaded || quizzes.length === 0) {
    container.innerHTML = `<p style="color:black;font-size:16px;">No results displayed yet</p>`;
    return;
  }

  const quiz = quizzes[0]; // assuming one quiz at a time

  // 🧩 Determine which link to show:
  // If teacher saved a "sheetLink" along with the quiz, use that.
  // Otherwise, fallback to quiz.link.
  const sheetLink = quiz.sheetLink || quiz.link;

  const box = document.createElement("div");
  box.classList.add("dashboard-box");
  box.innerHTML = `
    <h3><p style="color:black;font-size:18px;">${quiz.title}</p></h3>
    <p>Access submissions: 
      <a href="${sheetLink}" target="_blank">Open Google Sheet</a>
    </p>
    <button class="share-btn" style="
      background-color: #1d8560ff; 
      color: white; 
      border: none; 
      padding: 8px 12px; 
      border-radius: 5px; 
      cursor: pointer;
      margin-top: 10px;
    ">Share with Parent</button>
    <button class="remove-btn" style="
      background-color: #d9534f;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 8px;
      margin-top: 10px;
    ">Remove</button>
  `;
  container.appendChild(box);

  // Share button
  box.querySelector(".share-btn").addEventListener("click", () => {
    const sharedReports = JSON.parse(localStorage.getItem("sharedReports")) || [];
    const report = {
      title: quiz.title,
      score: "Score not tracked",
      date: new Date().toLocaleString(),
      link: sheetLink
    };
    const updatedReports = sharedReports.filter(r => r.title !== quiz.title);
    updatedReports.push(report);
    localStorage.setItem("sharedReports", JSON.stringify(updatedReports));
    alert("Report shared with parent successfully!");
  });

  // Remove button
  box.querySelector(".remove-btn").addEventListener("click", () => {
    localStorage.removeItem("quizUploaded");
    localStorage.setItem("teacherQuizzes", JSON.stringify([]));
    container.innerHTML = `<p style="color:black;font-size:16px;">No results displayed yet</p>`;
  });
});
