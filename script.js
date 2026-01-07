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
const apiCallingData = {
  // simpleModelName:{model:realModelName,ModelUrl:realModelUrl}
  "FLUX.1-dev": {
    model: "black-forest-labs/flux-dev",
    ModelUrl: "https://router.huggingface.co/nebius/v1/images/generations",
  },
  "FLUX.1-schnell": {
    model: "black-forest-labs/flux-schnell",
    ModelUrl: "https://router.huggingface.co/nebius/v1/images/generations",
  },
  "Stable Diffusion XL": {
    model: "stabilityai/stable-diffusion-xl-base-1.0",
    ModelUrl: "https://router.huggingface.co/nscale/v1/images/generations",
  },
};
const apiData = {
  headers: {
    Authorization: `Bearer ${process.env.HF_TOKEN}`,
    "Content-Type": "application/json",
  },
  method: "POST",
  body: JSON.stringify(data),
};
async function query(data) {
  const response = await fetch(
    "https://router.huggingface.co/nscale/v1/images/generations",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}
async function query2(data) {
  const response = await fetch(
    "https://router.huggingface.co/nebius/v1/images/generations",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}
async function query3(data) {
  const response = await fetch(
    "https://router.huggingface.co/nebius/v1/images/generations"
  );
  const result = await response.blob();
  return result;
}
const generateImages = (model, count, aspect, prompt) => {
  query3({
    response_format: "b64_json",
    prompt: '"Astronaut riding a horse"',
    model: "black-forest-labs/flux-schnell",
  }).then((response) => {
    // Use image
  });

  query2({
    response_format: "b64_json",
    prompt: '"Astronaut riding a horse"',
    model: "black-forest-labs/flux-dev",
  }).then((response) => {
    // Use image
  });
  query({
    response_format: "b64_json",
    prompt: '"' + prompt + '"',
    model: "stabilityai/stable-diffusion-xl-base-1.0",
  }).then((response) => {
    // Use image
  });
};
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
