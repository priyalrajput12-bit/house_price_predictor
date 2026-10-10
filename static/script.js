const form = document.getElementById("predictionForm");
const button = document.getElementById("predictBtn");
const resetButton = document.getElementById("resetBtn");
const price = document.getElementById("price");
const status = document.getElementById("resultStatus");
const resultCard = document.getElementById("resultCard");

const ids = ["house_size", "bedrooms", "bathrooms", "floors"];

function formatIndianNumber(value) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2
  }).format(value);
}

function setStatus(text, type = "") {
  status.textContent = text;
  status.className = "result-status " + type;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const values = Object.fromEntries(ids.map(id => [id, Number(document.getElementById(id).value)]));

  if (Object.values(values).some(v => !Number.isFinite(v) || v < 0)) {
    setStatus("Invalid input", "error");
    resultCard.classList.remove("shake");
    void resultCard.offsetWidth;
    resultCard.classList.add("shake");
    return;
  }

  button.disabled = true;
  button.classList.add("loading");
  button.querySelector("span:first-child").textContent = "Predicting...";
  setStatus("Calculating");

  try {
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Prediction failed.");

    price.textContent = formatIndianNumber(data.prediction);
    document.getElementById("sumSize").textContent = `${formatIndianNumber(values.house_size)} sqft`;
    document.getElementById("sumBedrooms").textContent = values.bedrooms;
    document.getElementById("sumBathrooms").textContent = values.bathrooms;
    document.getElementById("sumFloors").textContent = values.floors;

    setStatus("Prediction ready", "success");
  } catch (error) {
    price.textContent = "—";
    setStatus(error.message, "error");
  } finally {
    button.disabled = false;
    button.classList.remove("loading");
    button.querySelector("span:first-child").textContent = "Predict House Price";
  }
});

resetButton.addEventListener("click", () => {
  form.reset();
  price.textContent = "—";
  ["sumSize", "sumBedrooms", "sumBathrooms", "sumFloors"].forEach(id => {
    document.getElementById(id).textContent = "—";
  });
  setStatus("Ready");
});
