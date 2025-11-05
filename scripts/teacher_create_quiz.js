document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadQuizBtn");
  const titleInput = document.getElementById("quizTitle");
  const linkInput = document.getElementById("quizLink");
  const statusMsg = document.getElementById("statusMsg");
  const uploadedList = document.getElementById("uploadedList");

  function loadQuizzes() {
    uploadedList.innerHTML = "";
    const quizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
    quizzes.forEach((quiz, index) => {
      const li = document.createElement("li");
      li.style.margin = "15px 0";
      li.innerHTML = `
        <div class="quiz-card">
          <strong class="quiz-title">${quiz.title}</strong>
          <div class="quiz-actions">
            <a href="${quiz.link}" target="_blank" class="btn preview-btn">Preview Form</a>
            <button class="btn remove-btn" data-index="${index}">Remove Quiz</button>
          </div>
        </div>
      `;
      uploadedList.appendChild(li);
    });

    // Remove button handlers
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = e.target.dataset.index;
        const quizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
        quizzes.splice(idx, 1);
        localStorage.setItem("teacherQuizzes", JSON.stringify(quizzes));
        loadQuizzes();
        statusMsg.textContent = "Quiz removed successfully!";
      });
    });
  }

  uploadBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const link = linkInput.value.trim();

    if (!title || !link) {
      statusMsg.style.color = "red";
      statusMsg.textContent = "Please enter both title and link.";
      return;
    }

    const quizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
    quizzes.push({ title, link });
    localStorage.setItem("teacherQuizzes", JSON.stringify(quizzes));

    titleInput.value = "";
    linkInput.value = "";
    statusMsg.style.color = "green";
    statusMsg.textContent = "✅ Uploaded successfully!";
    loadQuizzes();
  });

  loadQuizzes();
});
