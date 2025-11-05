document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("loginMessage");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!email || !password || !role) {
      msg.textContent = "⚠️ Please fill in all fields.";
      msg.style.color = "red";
      return;
    }

    // Retrieve registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password && u.role === role);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      msg.textContent = "✅ Login successful! Redirecting...";
      msg.style.color = "green";

      setTimeout(() => {
        if (role === "student") window.location.href = "student.html";
        else if (role === "teacher") window.location.href = "teacher.html";
        else if (role === "parent") window.location.href = "parent.html";
      }, 800);
    } else {
      msg.textContent = "❌ Invalid credentials. Please try again.";
      msg.style.color = "red";
    }
  });
});
