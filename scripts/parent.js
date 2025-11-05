// ========== PARENT DASHBOARD SCRIPT ==========

document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("loggedInUser");
  const role = localStorage.getItem("userRole");
  if (!email || role !== "parent") {
    alert("Unauthorized access! Please login as a parent.");
    window.location.href = "login.html";
    return;
  }

  // Example: Load dummy student data
  const progressBox = document.getElementById("progressBox");
  if (progressBox) {
    progressBox.innerHTML = `
      <p><strong>Student:</strong> Alex Kumar</p>
      <p><strong>Maths Progress:</strong> 82%</p>
      <p><strong>English Progress:</strong> 91%</p>
    `;
  }

  // Chatbot toggle (Ask AI Tutor)
  const aiToggle = document.getElementById("ai-toggle");
  const aiChat = document.getElementById("ai-chat");

  if (aiToggle && aiChat) {
    aiToggle.addEventListener("click", () => {
      aiChat.classList.toggle("active");
    });
  }
});
