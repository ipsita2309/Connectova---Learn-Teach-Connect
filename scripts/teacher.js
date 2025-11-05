// ========== TEACHER DASHBOARD SCRIPT ==========

document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("loggedInUser");
  const role = localStorage.getItem("userRole");
  if (!email || role !== "teacher") {
    alert("Unauthorized access! Please login as a teacher.");
    window.location.href = "login.html";
    return;
  }

  // Upload form handling
  const uploadForm = document.getElementById("uploadForm");
  const uploadList = document.getElementById("uploadList");

  if (uploadForm) {
    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fileInput = document.getElementById("fileUpload");
      if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        const item = document.createElement("li");
        item.textContent = fileName;
        uploadList.appendChild(item);
        alert("File uploaded successfully (local simulation).");
        fileInput.value = "";
      }
    });
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
