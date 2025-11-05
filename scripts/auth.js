// auth.js
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const msg = document.getElementById('loginMsg');

  loginBtn.addEventListener('click', () => {
    const email = (document.getElementById('email').value || '').trim().toLowerCase();
    const pwd = (document.getElementById('password').value || '').trim();
    const role = document.querySelector('input[name="role"]:checked').value;

    if (!email) {
      msg.style.color = 'red';
      msg.textContent = 'Please enter an email.';
      return;
    }

    // Demo: No real password check; in a real app validate against DB.
    localStorage.setItem('loggedInUser', email);
    localStorage.setItem('userRole', role);

    // Redirect based on role
    if (role === 'teacher') window.location.href = 'teacher.html';
    else if (role === 'student') window.location.href = 'student.html';
    else window.location.href = 'parent.html';
  });
});
