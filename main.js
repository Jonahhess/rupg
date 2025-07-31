import Mock from "./mock.js";
import apiKeys from "./apiKeys.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("hello world");

  const generateUserButton = document.getElementById("generate-user");
  generateUserButton.addEventListener("click", () => {
    console.log("hello world!");
    const mocker = new Mock();

    // add api_name: key pairs to mocker
    mocker.add("random_user_generator");

    // API 2:

    // API 3:

    // API 4:
  });
});
