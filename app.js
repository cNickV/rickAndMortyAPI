document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    loadingData(true);

    const res = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await res.json();
    createCard(data);
  } catch (err) {
    console.error(err);
  } finally {
    loadingData(false);
  }
};

const createCard = (data) => {
  const cards = document.getElementById("card-dynamic");
  const templateCard = document.getElementById("template-card").content;
  const fragment = document.createDocumentFragment();

  data.results.forEach((item) => {
    const clone = templateCard.cloneNode(true);
    clone.querySelector("h3").textContent = item.name;
    clone.querySelector("p").textContent = item.species;
    clone.querySelector("img").setAttribute("src", item.image);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const loadingData = (state) => {
  const loading = document.getElementById("loading");
  if (state) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
