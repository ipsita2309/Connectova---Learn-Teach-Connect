document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadQuizBtn");
  const titleInput = document.getElementById("quizTitle");
  const formLinkInput = document.getElementById("quizLink"); // form link input
  const sheetLinkInput = document.getElementById("sheetLink"); // new input for sheet link
  const statusMsg = document.getElementById("statusMsg");
  const uploadedList = document.getElementById("uploadedList");

  function loadQuizzes() {
    uploadedList.innerHTML = "";
    const quizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");

    // Update quizUploaded flag for student progress page
    if (quizzes.length > 0) {
      localStorage.setItem("quizUploaded", "true");
    } else {
      localStorage.removeItem("quizUploaded");
    }

    quizzes.forEach((quiz, index) => {
      const li = document.createElement("li");
      li.style.margin = "15px 0";
      li.innerHTML = `
        <div class="quiz-card">
          <strong class="quiz-title">${quiz.title}</strong>
          <div class="quiz-actions">
            <a href="${quiz.link}" target="_blank" class="btn preview-btn">Preview Quiz (Form)</a>
            <a href="${quiz.sheetLink}" target="_blank" class="btn" style="background:#1d8560;color:white;">View Sheet</a>
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

        // Update flag after removal
        if (quizzes.length === 0) {
          localStorage.removeItem("quizUploaded");
        }

        loadQuizzes();
        statusMsg.textContent = "Quiz removed successfully!";
        statusMsg.style.color = "orange";
      });
    });
  }

  uploadBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const formLink = formLinkInput.value.trim();
    const sheetLink = sheetLinkInput.value.trim();

    if (!title || !formLink || !sheetLink) {
      statusMsg.style.color = "red";
      statusMsg.textContent = "Please enter title, form link, and sheet link.";
      return;
    }

    const quizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]");
    quizzes.push({ title, link: formLink, sheetLink });
    localStorage.setItem("teacherQuizzes", JSON.stringify(quizzes));

    // Mark quiz as uploaded for student progress page
    localStorage.setItem("quizUploaded", "true");

    // Reset form
    titleInput.value = "";
    formLinkInput.value = "";
    sheetLinkInput.value = "";
    statusMsg.style.color = "green";
    statusMsg.textContent = "✅ Uploaded successfully!";
    loadQuizzes();
  });

  loadQuizzes();
});
