document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("materialsContainer");
  const materials = JSON.parse(localStorage.getItem("studyMaterials")) || [];

  if (materials.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:#555;">No materials uploaded by teacher yet.</p>`;
    return;
  }

  materials.forEach(material => {
    const box = document.createElement("div");
    box.classList.add("dashboard-box");

    box.innerHTML = `
      <h3><p style="color:black; font-size:18px;">${material.title}</p></h3>
      <p>Uploaded by your teacher</p>
      <a href="#" class="view-btn">View Material</a>
    `;

    box.querySelector(".view-btn").addEventListener("click", () => {
      const pdfWindow = window.open();
      pdfWindow.document.write(
        `<iframe width="100%" height="100%" src="${material.data}"></iframe>`
      );
    });

    container.appendChild(box);
  });
});
