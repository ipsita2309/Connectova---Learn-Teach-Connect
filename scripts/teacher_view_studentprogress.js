document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("progressContainer");

  // Key for localStorage
  const removalKey = "studentProgressRemoved";

  // Check if the quiz was removed previously
  const isRemoved = JSON.parse(localStorage.getItem(removalKey)) || false;

  function showNoResultMessage() {
    container.innerHTML = `<p style="color:black; font-size:16px;">No result to be displayed yet</p>`;
  }

  if (isRemoved) {
    showNoResultMessage();
    return; // Do not display the quiz box
  }

  // Quiz info
  const quizTitle = "English Quiz";
  const sheetLink = "https://docs.google.com/spreadsheets/d/1y-U_23QEXS65VrZ9mpvj9sq_xKSgn8EKUkxS68DMhPo/edit?usp=sharing";

  const box = document.createElement("div");
  box.classList.add("dashboard-box");
  box.innerHTML = `
    <h3><p style="color:black;font-size:18px;">${quizTitle}</p></h3>
    <p>Access submissions: <a href="${sheetLink}" target="_blank">Open Google Sheet</a></p>
    <button class="share-btn" style="
      background-color: #1d8560ff; 
      color: white; 
      border: none; 
      padding: 8px 12px; 
      border-radius: 5px; 
      cursor: pointer;
      margin-top: 10px;
    ">Share with Parent</button>
    <button class="remove-btn" style="
      background-color: #ff4c4c; 
      color: white; 
      border: none; 
      padding: 8px 12px; 
      border-radius: 5px; 
      cursor: pointer;
      margin-top: 10px;
      margin-left: 10px;
    ">Remove</button>
  `;
  container.appendChild(box);

  // Share button
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

  // Remove button
  box.querySelector(".remove-btn").addEventListener("click", () => {
    // Persist removal in localStorage
    localStorage.setItem(removalKey, true);
    showNoResultMessage();
  });
});
