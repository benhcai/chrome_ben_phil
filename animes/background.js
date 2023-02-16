async function main() {
  const addLoader = () => {
    document.body.style.backgroundColor = "blue";
    const loader = document.createElement("DIV");
    loader.innerHTML = `<h1>🐶🐶🐶 Good boy! Fetch! 🦴🦴🦴</h1>`;
    loader.style.position = "fixed";
    loader.style.left = "50%";
    loader.style.transform = "translate(-50%, 0)";
    loader.style.zIndex = "999";
    loader.setAttribute("id", "doggyLoader");
    document.body.insertAdjacentElement("afterbegin", loader);
  };
  addLoader();

  const imgs = document.querySelectorAll("img");

  imgs.forEach((el) => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((json) => {
        const loader = document.querySelector("#doggyLoader");
        if (loader) loader.remove();

        el.src = json.message;
        el.srcset = json.message;
        el.style = `background-image:url(${json.message})`;
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
