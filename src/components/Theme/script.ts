
const toggleButton = document.getElementById("toggleMode") as HTMLButtonElement;

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
