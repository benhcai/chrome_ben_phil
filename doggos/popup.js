let injectFile = document.getElementById("inject-file");
let injectFunction = document.getElementById("inject-function");

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

injectFile.addEventListener("click", async () => {
  let tab = await getCurrentTab();

  // chrome.scripting.executeScript({
  //   target: { tabId: tab.id },
  //   files: ["content-script.js"],
  // });
  const inputField = document.querySelector("#breed").value;

  chrome.scripting.executeScript(
    { target: { tabId: tab.id }, files: ["content-script.js"] },
    () => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [inputField],
        func: (...args) => injectDogs(...args),
      });
    }
  );
});
