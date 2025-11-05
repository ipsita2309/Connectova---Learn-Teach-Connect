// ========== MAIN SITE SCRIPT ==========

// Logout + Delete Account handlers
document.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  const deleteAccount = document.getElementById("deleteAccount");

  if (logout) {
    logout.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userRole");
      alert("You have been logged out.");
      window.location.href = "index.html";
    });
  }

  if (deleteAccount) {
    deleteAccount.addEventListener("click", () => {
      if (confirm("Are you sure you want to remove your account?")) {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userRole");
        alert("Account removed successfully.");
        window.location.href = "index.html";
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
