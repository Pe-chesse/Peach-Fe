const imgContainer = document.querySelector(".img-container");
const uploadInput = document.querySelector(".upload_input");

uploadInput.addEventListener("change", function() {
  const file = this.files[0];

if (file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    imgContainer.appendChild(img);
}
});