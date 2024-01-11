import { Application } from "./application.js";

const podrucja = await fetch("https://localhost:7011/Podrucja/PreuzmiPodrcuja")
  .then((response) => response.json())
  .catch((err) => console.log(err));

const osobine = await fetch("https://localhost:7011/Osobine/PreuzmiOsobine")
  .then((response) => response.json())
  .catch((err) => console.log(err));

// const p2 = await fetch("https://localhost:7011/Podrucja/PreuzmiPodrcuja");
// const p2json = await p2.json();

console.log(osobine);

const app = new Application(podrucja, osobine);
app.drawApp(document.body);
