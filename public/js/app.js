const formData = document.querySelector("#formData");
const sendBtn = document.querySelector("#sendBtn");
console.log(sendBtn);
console.log(formData);
formData.addEventListener("keyup", (e) => {
  e.preventDefault();
  console.log(formData.children[1].value);
  if (
    (formData.children[1].value != "" || null) &&
    (formData.children[2].value != "" || null) &&
    (formData.children[3].value != "" || null)
  ) {
    sendBtn.removeAttribute("disabled", "false");
    sendBtn.style.background = "#4ac00e";
  }
});

// ------------ successmessage------------
setTimeout(() => {
  const messages = document.querySelector("#messages");
  messages.style.display = "none";
}, 2000);
