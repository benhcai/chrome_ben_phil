const addLoader = () => {
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

// executeScript.js
function injectDogs(breed) {
  console.log(breed);
  const breedSearch = breed || "retriever/golden";
  console.log("breed", breed);
  imgs.forEach((el) => {
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
