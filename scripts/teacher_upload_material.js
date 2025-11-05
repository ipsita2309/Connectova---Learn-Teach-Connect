document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("materialTitle");
  const fileInput = document.getElementById("materialFile");
  const uploadBtn = document.getElementById("uploadMaterialBtn");
  const uploadedList = document.getElementById("uploadedList");
  const statusMsg = document.getElementById("statusMsg");

  let storedMaterials = JSON.parse(localStorage.getItem("studyMaterials")) || [];

  // Show previously uploaded items
  storedMaterials.forEach(addMaterialToList);

  uploadBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const file = fileInput.files[0];

    if (!title || !file) {
      alert("Please provide both a title and a PDF file!");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      return;
    }

    // Read file as Data URL so it persists properly across reloads
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileData = event.target.result;
      const material = { title, data: fileData };

      storedMaterials.push(material);
      localStorage.setItem("studyMaterials", JSON.stringify(storedMaterials));

      addMaterialToList(material);
      titleInput.value = "";
      fileInput.value = "";
      statusMsg.innerText = "Material uploaded successfully!";
    };
    reader.readAsDataURL(file);
  });

  function addMaterialToList(material) {
    const div = document.createElement("div");
    div.classList.add("quiz-item");
    div.innerHTML = `
      <h4>${material.title}</h4>
      <button class="preview-btn">View PDF</button>
      <button class="remove-btn">Remove</button>
    `;

    div.querySelector(".preview-btn").addEventListener("click", () => {
      const pdfWindow = window.open();
      pdfWindow.document.write(
        `<iframe width="100%" height="100%" src="${material.data}"></iframe>`
      );
    });

    div.querySelector(".remove-btn").addEventListener("click", () => {
      storedMaterials = storedMaterials.filter(m => m.title !== material.title);
      localStorage.setItem("studyMaterials", JSON.stringify(storedMaterials));
      div.remove();
    });

    uploadedList.appendChild(div);
  }
});
