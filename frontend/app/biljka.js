export class Biljka {
  constructor(id, naziv, slikaUrl, brVidjenja) {
    this.brVidjenja = brVidjenja;
    this.id = id;
    this.naziv = naziv;
    this.slikaUrl = slikaUrl;
  }

  drawBiljka(container) {
    const div = document.createElement("div");
    div.classList.add("margin-10", "biljka");

    const img = document.createElement("img");
    img.src = this.slikaUrl;
    div.appendChild(img);

    const ime = document.createElement("p");
    ime.innerHTML = this.naziv;
    div.appendChild(ime);

    const brVidjenja = document.createElement("p");
    brVidjenja.classList.add(`biljka-${this.id}`);
    brVidjenja.innerHTML = `Broj vidjenja: ${this.brVidjenja}`;
    div.appendChild(brVidjenja);

    const btnVidjena = document.createElement("button");
    btnVidjena.innerHTML = "Vidjena";
    btnVidjena.onclick = this.onClickVidjena;
    btnVidjena.classList.add("btn-vidjena");
    div.appendChild(btnVidjena);

    container.appendChild(div);
  }

  onClickVidjena = async () => {
    const ddPodrucja = document.querySelector(".dd-podrucja");
    const idPodrucja = ddPodrucja.value;
    let url = `https://localhost:7011/Biljke/UpisiVidjenje/${this.id}/${idPodrucja}`;

    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        latitude: 90,
        longitude: 180,
        datumIVreme: "2023-12-28T10:24:44.362Z",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          this.brVidjenja++;
          const brVidjenja = document.querySelector(`.biljka-${this.id}`);
          if (brVidjenja != null) {
            brVidjenja.innerHTML = `Broj vidjenja: ${this.brVidjenja}`;
          }
        }
        return response.text();
      })
      .catch((error) => console.error(error));

    alert(result);
  };
}
