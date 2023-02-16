async function main() {
  document.body.style.backgroundColor = "green";

  const imgs = document.querySelectorAll("img");

  imgs.forEach((el) => {
    console.log(el);
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((json) => {
        console.log("doggy", json);
        el.src = json.message;
        el.srcset = json.message;
      });
  });
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: main,
    });
  }
});
