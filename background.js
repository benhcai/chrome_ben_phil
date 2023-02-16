function main() {
  document.body.style.backgroundColor = "red";
  fetch("https://demon-slayer-api.onrender.com/v1/")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const imgDirty = json;
      const imgClean = imgDirty.map((el) => {
        const index = el.image.search(".png");
        const newUrl = el.image.slice(0, index + 4);
        return newUrl;
      });

      console.log("imguls", imgClean);
      const imgs = document.querySelectorAll("img");

      function randomEl(array) {
        const randomId = Math.floor(Math.random() * (array.length - 1 - 0 + 1) + 0);
        return array[randomId];
      }

      imgs.forEach((el) => {
        console.log(el);
        const randomImgUrl = randomEl(imgClean);
        console.log("randomimgurl", randomImgUrl);
        el.src = randomImgUrl;
        el.srcset = randomImgUrl;
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
