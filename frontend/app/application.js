import { Biljka } from "./biljka.js";

export class Application {
  constructor(podrucja, osobine) {
    this.podrucja = podrucja;
    this.osobine = osobine;
    this.biljke = [];
    this.containerRezultati = null;
  }

  drawApp(container) {
    const naslov = document.createElement("h1");
    naslov.innerHTML = "Lekovito bilje";
    container.appendChild(naslov);

    const sadrzaj = document.createElement("div");
    sadrzaj.classList.add("sadrzaj");
    container.appendChild(sadrzaj);

    const pretraga = document.createElement("div");
    sadrzaj.appendChild(pretraga);

    const rezultati = document.createElement("div");
    rezultati.classList.add("rezultati");
    sadrzaj.appendChild(rezultati);
    this.containerRezultati = rezultati;

    this.drawPretraga(pretraga);
    //this.drawRezultati(rezultati);
  }

  drawPretraga(container) {
    container.classList.add("forma");
    this.drawPodrucja(container);
    this.drawOsobine(container);

    const btnPretrazi = document.createElement("input");
    btnPretrazi.type = "button";
    btnPretrazi.value = "Pretrazi";
    btnPretrazi.classList.add("btn-pretrazi");
    btnPretrazi.onclick = this.onClickPretrazi;
    container.appendChild(btnPretrazi);
  }

  drawPodrucja(container) {
    const labela = document.createElement("label");
    labela.innerHTML = "Podrucja:";
    labela.classList.add("margin-10");
    container.appendChild(labela);

    const dropdown = document.createElement("select");
    this.podrucja.forEach((element) => {
      let option = document.createElement("option");
      option.value = element.identifikator;
      option.innerHTML = element.naziv;
      dropdown.appendChild(option);
    });
    dropdown.classList.add("margin-10", "dd-podrucja");
    container.appendChild(dropdown);
  }

  drawOsobine(container) {
    this.osobine.forEach((element) => {
      let labela = container.querySelector(`.label-${element.naziv}`);
      if (labela == null) {
        labela = document.createElement("label");
        labela.innerHTML = element.naziv;
        labela.classList.add(`label-${element.naziv}`, "margin-10");
        container.appendChild(labela);
      }

      let dropdown = container.querySelector(`.select-${element.naziv}`);
      if (dropdown == null) {
        dropdown = document.createElement("select");
        dropdown.classList.add(`select-${element.naziv}`, "margin-10");
        container.appendChild(dropdown);
      }

      let option = document.createElement("option");
      option.value = element.id;
      option.innerHTML = element.vrednost;
      dropdown.appendChild(option);
    });
  }

  drawRezultati() {
    this.biljke.forEach((biljka) => {
      let b = new Biljka(
        biljka.id,
        biljka.naziv,
        biljka.slika,
        biljka.brojVidjenja
      );
      b.drawBiljka(this.containerRezultati);
    });
  }

  onClickPretrazi = async () => {
    const ddPodrucja = document.querySelector(".dd-podrucja");
    const idPodrucja = ddPodrucja.value;

    let query = `https://localhost:7011/Biljke/PreuzmiBiljke/${idPodrucja}`;
    let queryOsobine = "?";

    let prvi = true;

    const unikati = new Set(this.osobine.map((osobina) => osobina.naziv));

    unikati.forEach((osobina) => {
      let ddOsobina = document.querySelector(`.select-${osobina}`);
      let idOsobine = ddOsobina.value;
      if (prvi) {
        prvi = false;
        queryOsobine += `osobineIDs=${idOsobine}`;
      } else {
        queryOsobine += `&osobineIDs=${idOsobine}`;
      }
    });

    console.log(query);

    const biljke = await fetch(query + queryOsobine).then((response) =>
      response.json()
    );
    console.log(biljke);

    // jedan nacin da se uklone potomci cvora u HTML-u jeste da se uklanja poslednji potomak sve dok postoji (slicno brisanju iz lancane liste)
    // while (this.containerRezultati.lastChild) {
    //   this.containerRezultati.removeChild(this.containerRezultati.lastChild);
    // }

    // bolji nacin koji radi od novijih ES standarda jeste replaceChildren koja listu potomaka menja novom listom
    // ako joj se prosledi prazno, samo brise stare potomke
    this.containerRezultati.replaceChildren();

    if (biljke.length > 0) {
      this.biljke = biljke;
      this.drawRezultati();
    } else {
      this.dodajNepronadjenu(queryOsobine);
    }
  };

  async dodajNepronadjenu(queryOsobine) {
    const rezultat = await fetch(
      "https://localhost:7011/Biljke/DodajNepronadjenu" + queryOsobine,
      { method: "POST" }
    )
      .then((response) => response.text())
      .catch((err) => console.error(err));
    alert(rezultat);
  }
}
