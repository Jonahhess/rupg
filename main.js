import Mocker from "./mocker.js";
import apiKeys from "./apiKeys.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("hello world");

  const generateUserButton = document.getElementById("generate-user");
  generateUserButton.addEventListener("click", () => {
    console.log("hello world!");
    const mocker = new Mocker();

    // add api_name: key pairs to mocker
    const randomUserGenerator = "random_user_generator";
    mocker.add(randomUserGenerator, apiKeys.get(randomUserGenerator));

    // API 2:

    // API 3:

    // API 4:
  });
});
