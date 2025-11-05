document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("teacherQuizList");

  function loadQuizzes() {
    const quizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
    list.innerHTML = "";

    if (quizzes.length === 0) {
      list.innerHTML = "<p style='color:black;'>No quizzes uploaded by teacher yet.</p>";
      return;
    }

    quizzes.forEach(q => {
      const li = document.createElement("li");
      li.style.margin = "12px 0";
      li.innerHTML = `
        <div class="dashboard-box" style="max-width:600px;margin:auto;">
          <h3 style="color:black;">${q.title}</h3>
          <button class="btn" onclick="window.open('${q.link}','_blank')">Open Quiz</button>
        </div>
      `;
      list.appendChild(li);
    });
  }

  loadQuizzes();
});
