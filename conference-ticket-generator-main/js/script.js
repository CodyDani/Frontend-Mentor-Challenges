const generateBtn = document.querySelector(".generate");
const githubInput = document.getElementById("github");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const ticketForm = document.getElementById("ticket-form");
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("fileInput");
const uploadIcon = document.getElementById("upload-icon");
const previewImage = document.getElementById("previewImage");
const uploadText = document.querySelector(".upload-text");
const btnGroup = document.getElementById("btnGroup");
const changeBtn = document.getElementById("changeBtn");
const removeBtn = document.getElementById("removeBtn");

const heading = document.querySelector(".heading");
const ticketHeading = document.querySelector(".ticket-heading");
const ticketName = document.querySelector(".ticket-name");
const description = document.querySelector(".description");
const ticketDescription = document.querySelector(".ticket-description");
const ticketEmail = document.querySelector(".ticket-email");

ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData();
  displayTicket(formData);
});

function displayTicket(formData) {
  const ticketCard = document.getElementById("ticket-card");
  const participant = document.querySelector(".participant");
  const participantGithub = document.querySelector(".participant-github span");
  const participantImg = document.getElementById("participant-img");
  const ticketId = document.getElementById("ticket-id");

  formData.append("name", nameInput.value);
  formData.append("email", emailInput.value);
  formData.append("github", githubInput.value);
  formData.append("avatar", fileInput.files[0]);

  heading.classList.add("hidden");
  ticketHeading.classList.remove("hidden");
  ticketName.textContent = formData.get("name");
  description.classList.add("hidden");
  ticketDescription.classList.remove("hidden");
  ticketEmail.textContent = formData.get("email");

  ticketForm.classList.add("hidden");
  ticketCard.classList.remove("hidden");
  participant.textContent = formData.get("name");
  participantGithub.textContent = formData.get("github");
  participantImg.src = URL.createObjectURL(formData.get("avatar"));
  ticketId.textContent = ticketNumber();
}

function ticketNumber() {
  const randomNum = Math.floor(Math.random() * 100000);
  return `#${randomNum.toString().padStart(5, "0")}`;
}

// Trigger file browser on box click
dropZone.addEventListener("click", (e) => {
  // Prevent loop if clicking the action buttons inside the container
  if (!e.target.closest("#btnGroup")) {
    fileInput.click();
  }
});

// Drag and drop visual highlights
["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(
    eventName,
    (e) => {
      e.preventDefault();
      dropZone.classList.add("drag-over");
    },
    false,
  );
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(
    eventName,
    (e) => {
      e.preventDefault();
      dropZone.classList.remove("drag-over");
    },
    false,
  );
});

// Handle dropped files
dropZone.addEventListener("drop", (e) => {
  const dt = e.dataTransfer;
  const files = dt.files;

  if (files.length && files[0].type.startsWith("image/")) {
    // CRITICAL: This line injects the dropped file into the HTML form input element
    fileInput.files = files; // Sync files to input
    handleFile(files[0]); // Pass the single file to your preview reader
  }
});

// Handle file browser selection
fileInput.addEventListener("change", (e) => {
  if (e.target.files.length) {
    handleFile(e.target.files[0]);
  }
});

// Display image and swap elements
function handleFile(file) {
  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;

    uploadIcon.classList.add("hidden");
    previewImage.classList.remove("hidden");
    uploadText.classList.add("hidden");
    btnGroup.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

changeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fileInput.click();
});

removeBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  fileInput.value = "";
  previewImage.src = "";

  uploadIcon.classList.remove("hidden");
  previewImage.classList.add("hidden");
  uploadText.classList.remove("hidden");
  btnGroup.classList.add("hidden");
});
