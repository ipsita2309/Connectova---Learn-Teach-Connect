// ========== STUDENT DASHBOARD SCRIPT ==========

document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("loggedInUser");
  const role = localStorage.getItem("userRole");
  if (!email || role !== "student") {
    alert("Unauthorized access! Please login as a student.");
    window.location.href = "login.html";
    return;
  }

  // Show student name
  const studentName = email.split("@")[0];
  const greeting = document.getElementById("greeting");
  if (greeting) greeting.textContent = `Welcome, ${studentName}!`;

  // Navigate to course pages
  document.querySelectorAll(".course-link").forEach(btn => {
    btn.addEventListener("click", e => {
      const page = e.target.getAttribute("data-page");
      window.location.href = page;
    });
  });

  // Chatbot toggle (Ask AI Tutor)
  const aiToggle = document.getElementById("ai-toggle");
  const aiChat = document.getElementById("ai-chat");

  if (aiToggle && aiChat) {
    aiToggle.addEventListener("click", () => {
      aiChat.classList.toggle("active");
    });
  }
});
