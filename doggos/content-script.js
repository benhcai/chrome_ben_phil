const addLoader = () => {
  const loader = document.createElement("DIV");
  loader.innerHTML = `<h1>🐶🐶🐶 Good boy! Fetch! 🦴🦴🦴</h1>`;
  loader.style.position = "fixed";
  loader.style.left = "50%";
  loader.style.transform = "translate(-50%, 0)";
  loader.style.zIndex = "999";
  loader.style.transition = "opacity 500ms linear";
  loader.setAttribute("id", "doggyLoader");
  document.body.insertAdjacentElement("afterbegin", loader);
};
addLoader();

const imgs = document.querySelectorAll("img");
const sources = document.querySelectorAll("source");
const styles = document.querySelectorAll("[style]");

// executeScript.js
function injectDogs(breed) {
  console.log(breed);
  const breedSearch = breed || "retriever/golden";

  imgs.forEach((el) => {
    fetch(`https://dog.ceo/api/breed/${breedSearch}/images/random`)
      .then((res) => res.json())
      .then((json) => {
        const loader = document.querySelector("#doggyLoader");
        if (loader) {
          loader.style.opacity = "0";
          setTimeout(() => loader.remove(), 500);
        }
        el.style.objectFit = "cover";
        el.style.aspectRatio = "1 / 1";
        el.src = json.message;
        el.srcset = json.message;
        el.style.backgroundImage = `background-image:url(${json.message})`;
      });
  });

  sources.forEach((el) => {
    fetch(`https://dog.ceo/api/breed/${breedSearch}/images/random`)
      .then((res) => res.json())
      .then((json) => {
        const loader = document.querySelector("#doggyLoader");
        if (loader) loader.remove();
        el.style.objectFit = "cover";
        el.style.aspectRatio = "1 / 1";
        el.src = json.message;
        el.srcset = json.message;
        el.style.backgroundImage = `background-image:url(${json.message})`;
      });
  });

  styles.forEach((el) => {
    if (!el.style.backgroundImage.includes("url(")) return;
    fetch(`https://dog.ceo/api/breed/${breedSearch}/images/random`)
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
