import Mock from "./mock.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("hello world");

  const generateUserButton = document.getElementById("generate-user");
  generateUserButton.addEventListener("click", () => {
    console.log("hello world!");
  });
});
