const themeToggle = document.querySelector(".theme-toggle");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const modelSelect = document.querySelector("#model-select");
const countSelect = document.querySelector("#count-select");
const aspectSelect = document.querySelector("#aspect-select");
const gridGallery = document.querySelector(".gallery-grid");

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];
// set theme based on saved preference or system default
//iife(immediately invoked function expression)
(() => {
  const savedTheme = localStorage.getItem("theme");
  // cheks the system preference
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  //
  const isDarkTheme =
    savedTheme === "dark" || (!savedTheme && systemPrefersDark);
  document.body.classList.toggle("dark-theme", isDarkTheme);
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
})();
const toggleTheme = () => {
  //   console.log("clicked");
  const isDarkTheme = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
};
// fill prompt with random example
promptBtn.addEventListener("click", () => {
  const prompt =
    examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

const getImageDimensions = (aspectSelect, baseSize = 512) => {
  const [width, height] = aspectSelect.value.split("/").map(Number);
  const scaleFactor = baseSize / Math.sqrt(width * height);
  let calculatedWidth = Math.round(width * scaleFactor);
  let calculatedHeight = Math.round(height * scaleFactor);

  calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
  calculatedHeight = Math.floor(calculatedHeight / 16) * 16;
  return { width: calculatedWidth, height: calculatedHeight };
};
const apiData = {
  headers: {
    Authorization: `Bearer ${Token}`,
    "Content-Type": "application/json",
    "x-use-cache": "false",
  },
  method: "POST",
  body: JSON.stringify({
    inputs: promptInput.value.trim(),
    parameters: getImageDimensions(aspectSelect),
  }),
};

const generateImages = async (model, count, aspect, prompt) => {};
// create placeholder card with loading spinner
const createImageCards = (model, count, aspect, prompt) => {
  gridGallery.innerHTML = "";
  for (let i = 0; i < count; i++) {
    gridGallery.innerHTML += `
    
        <div class="img-card " id="img-card-${i}" style="aspect-ratio:${aspect}">
              <div class="status-container">
                <div class="spinner"></div>
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p class="status-text">Generating...</p>
              </div>
              <img src="test.png" alt="" class="result-img" />
              
            </div>

    
    `;
  }

  generateImages(model, count, aspect, prompt);
};

// handle form submition
const handleSubmit = (e) => {
  e.preventDefault();
  // Get form values
  const selectedModel = modelSelect.value;
  const selectedCount = parseInt(countSelect.value) || 1;
  const selectedAspect = aspectSelect.value || "1/1";
  const prompt = promptInput.value.trim();
  // console.log(selectedModel);
  // console.log(selectedCount);
  // console.log(selectedAspect);
  // console.log(prompt);

  // Generate images
  createImageCards(selectedModel, selectedCount, selectedAspect, prompt);
};
promptForm.addEventListener("submit", handleSubmit);
themeToggle.addEventListener("click", toggleTheme);
