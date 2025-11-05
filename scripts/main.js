document.addEventListener("DOMContentLoaded", () => {
  // Only run if we are on pages with logout / deleteAccount elements
  const logout = document.getElementById("logout");
  const deleteAccount = document.getElementById("deleteAccount");

  // Logout handler
  if (logout) {
    logout.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("userRole");
      window.location.href = "index.html";
    });
  }

  // Dashboard access only if logged in
  const email = localStorage.getItem('loggedInUser');
  const role = localStorage.getItem('userRole');
  if (!email || !role) return;

  const enterStudent = document.getElementById('enterStudent');
  const enterTeacher = document.getElementById('enterTeacher');
  const enterParent = document.getElementById('enterParent');

  function deny() { alert('Access Denied — You are not authorized to view this section.'); }

  if (enterStudent) enterStudent.addEventListener('click', () => { if (role==='student') window.location.href='student.html'; else deny(); });
  if (enterTeacher) enterTeacher.addEventListener('click', () => { if (role==='teacher') window.location.href='teacher.html'; else deny(); });
  if (enterParent) enterParent.addEventListener('click', () => { if (role==='parent') window.location.href='parent.html'; else deny(); });

  // Chatbot toggle
  const aiToggle = document.getElementById("ai-toggle");
  const aiChat = document.getElementById("ai-chat");
  if (aiToggle && aiChat) aiToggle.addEventListener("click", () => aiChat.classList.toggle("active"));
});
