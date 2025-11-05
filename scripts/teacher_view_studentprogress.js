document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("progressContainer");

  // Function to create a blank quiz box (original state)
  function createBlankBox(title) {
    const box = document.createElement("div");
    box.classList.add("dashboard-box");
    box.innerHTML = `
      <h3><p style="color:black;font-size:18px;">${title}</p></h3>
      <p>No submissions yet. Add a quiz to view student progress here.</p>
    `;
    container.appendChild(box);
    return box;
  }

  // Single quiz info
  const quizTitle = "English Quiz";
  const sheetLink = "https://docs.google.com/spreadsheets/d/1y-U_23QEXS65VrZ9mpvj9sq_xKSgn8EKUkxS68DMhPo/edit?usp=sharing";

  // Initially create the quiz box
  const box = createBlankBox(quizTitle);

  // Add actual quiz content with Share and Remove buttons
  function populateQuizBox(box) {
    box.innerHTML = `
      <h3><p style="color:black;font-size:18px;">${quizTitle}</p></h3>
      <p>Access submissions: <a href="${sheetLink}" target="_blank">Open Google Sheet</a></p>
      <div style="display:flex;gap:10px;margin-top:10px;">
        <button class="share-btn" style="
          background-color: #1d8560ff; 
          color: white; 
          border: none; 
          padding: 8px 12px; 
          border-radius: 5px; 
          cursor: pointer;
        ">Share with Parent</button>

        <button class="remove-btn" style="
          background-color: red;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
        ">Remove</button>
      </div>
    `;

    // Share functionality
    const sharedReports = JSON.parse(localStorage.getItem("sharedReports")) || [];
    box.querySelector(".share-btn").addEventListener("click", () => {
      const report = {
        title: quizTitle,
        score: "Score not tracked",
        date: new Date().toLocaleString(),
        link: sheetLink
      };
      const updatedReports = sharedReports.filter(r => r.title !== quizTitle);
      updatedReports.push(report);
      localStorage.setItem("sharedReports", JSON.stringify(updatedReports));
      alert("Report shared with parent successfully!");
    });

    // Remove functionality
    box.querySelector(".remove-btn").addEventListener("click", () => {
      const updatedReports = sharedReports.filter(r => r.title !== quizTitle);
      localStorage.setItem("sharedReports", JSON.stringify(updatedReports));
      // Reset to original empty box
      box.innerHTML = `
        <h3><p style="color:black;font-size:18px;">${quizTitle}</p></h3>
        <p>No submissions yet. Add a quiz to view student progress here.</p>
      `;
      alert(`"${quizTitle}" has been removed.`);
    });
  }

  // Populate the quiz box initially
  populateQuizBox(box);
});
