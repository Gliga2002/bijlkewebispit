export default class Biljka {
  constructor(id, naziv, slikaUrl, brVidjenja) {
    this.brVidjenja = brVidjenja;
    this.id = id;
    this.naziv = naziv;
    this.slikaUrl = slikaUrl;
    this.podrucje = null;
  }

  draw(ulElContainer) {
    const liEl = document.createElement('li');
    liEl.classList.add('item');
    liEl.id = this.id;

    const imgEl = document.createElement('img');
    imgEl.src = this.slikaUrl;
    imgEl.alt = this.naziv;
    liEl.appendChild(imgEl);

    const divEl = document.createElement('div');
    divEl.classList.add('content');

    const title = document.createElement('p');
    title.innerText = this.naziv;
    divEl.appendChild(title);

    const brojVidjenja = document.createElement('p');
    const span = document.createElement('span');
    span.classList.add('broj-vidjenja');
    console.log(this.brVidjenja);
    span.innerText = this.brVidjenja;
    brojVidjenja.innerText =
      this.brVidjenja > 0 ? `Broj vidjenja:` : 'Nije vidjena: ';
    brojVidjenja.appendChild(span);
    divEl.appendChild(brojVidjenja);

    const buttonEl = document.createElement('button');
    buttonEl.type = 'button';
    buttonEl.innerText = 'Vidjena';
    buttonEl.classList.add('btn-form');
    buttonEl.addEventListener('click', this.clickVidjenaBtnHandler);
    divEl.appendChild(buttonEl);

    liEl.appendChild(divEl);

    ulElContainer.appendChild(liEl);
  }

  clickVidjenaBtnHandler = (event) => {
    try {
      (async () => {
        const rezultat = await fetch(
          `https://localhost:7011/Biljke/UpisiVidjenje/${this.id}/${this.podrucje}`,
          {
            method: 'POST',
            body: JSON.stringify({
              latitude: 90,
              longitude: 125,
              datumIVreme: '2019-01-11T08:51:54.632Z',
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const resData = await rezultat.text();
        const itemEl = document.querySelector(`.item[id="${this.id}"`);
        console.log(`.item[id="${this.id}]"`);
        console.log(itemEl);
        const spanEl = itemEl.querySelector('.broj-vidjenja');

        console.log(spanEl);
        this.brVidjenja++;
        spanEl.innerText = this.brVidjenja;
      })();
    } catch (err) {
      console.log(err.message, err.statusCode || 500);
    }
  };

  upisiPodrucje(podrucjeId) {
    this.podrucje = podrucjeId;
    console.log(this.podrucje);
  }
}
