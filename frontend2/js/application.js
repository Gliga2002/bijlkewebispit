import Biljka from './biljka.js';

export class Application {
  constructor(osobine, podrucja) {
    (this.osobine = osobine), (this.podrucja = podrucja), (this.biljke = []);
  }

  draw(divElContainer) {
    const headerEl = document.createElement('header');
    headerEl.classList.add('header');
    this.drawHeader(headerEl);
    divElContainer.appendChild(headerEl);

    const divEl = document.createElement('div');
    divEl.classList.add('wrapper-div');

    const leftSectionEl = document.createElement('section');
    leftSectionEl.classList.add('left-section');
    this.drawLeftsection(leftSectionEl);
    divEl.appendChild(leftSectionEl);

    const rightSectionEl = document.createElement('section');
    rightSectionEl.classList.add('right-section');
    this.drawRightsection(rightSectionEl);
    divEl.appendChild(rightSectionEl);

    divElContainer.appendChild(divEl);
  }

  drawHeader(headerElContainer) {
    const h1 = document.createElement('h1');
    h1.innerText = 'Lekovito bilje';
    headerElContainer.appendChild(h1);
  }

  drawLeftsection(leftDivElContainer) {
    const formEl = document.createElement('form');
    formEl.classList.add('form');
    this.drawForm(formEl);
    formEl.addEventListener('submit', this.submitFormHandler);
    leftDivElContainer.appendChild(formEl);
  }

  drawForm(formElContainer) {
    this.drawPodrucja(formElContainer);
    this.drawOsobine(formElContainer);

    const buttonEl = document.createElement('button');
    buttonEl.classList.add('btn-form');
    buttonEl.innerText = 'Pretrazi';
    formElContainer.appendChild(buttonEl);
  }

  drawPodrucja(formElContainer) {
    const inputBoxEl = document.createElement('div');

    const labelEl = document.createElement('label');
    labelEl.innerText = 'Podrucja:';
    inputBoxEl.appendChild(labelEl);

    const dropdown = document.createElement('select');
    dropdown.setAttribute('name', 'Podrucja');
    this.podrucja.forEach((element) => {
      let option = document.createElement('option');
      option.value = element.identifikator;
      option.innerText = element.naziv;
      dropdown.appendChild(option);
    });
    inputBoxEl.appendChild(dropdown);

    formElContainer.appendChild(inputBoxEl);
  }

  drawOsobine(formElContainer) {
    this.osobine.forEach((osobina, index) => {
      // nece query selector
      let labela = formElContainer.querySelector(`.label-${osobina.naziv}`);
      let dropdown = formElContainer.querySelector(`.select-${osobina.naziv}`);

      if (labela && dropdown) {
        this.drawOsobineOption(dropdown, osobina);
        return;
      }
      const inputBoxEl = document.createElement('div');
      if (!labela) {
        labela = document.createElement('label');
        labela.innerText = `${osobina.naziv}:`;
        labela.classList.add(`label-${osobina.naziv}`);
        inputBoxEl.appendChild(labela);
      }

      if (!dropdown) {
        dropdown = document.createElement('select');
        dropdown.setAttribute('name', osobina.naziv);
        dropdown.classList.add(`select-${osobina.naziv}`);
        inputBoxEl.appendChild(dropdown);
      }

      this.drawOsobineOption(dropdown, osobina);

      formElContainer.appendChild(inputBoxEl);
    });
  }

  drawOsobineOption(dropdownElContainer, osobina) {
    let option = document.createElement('option');
    option.value = osobina.id;
    option.innerText = osobina.vrednost;
    dropdownElContainer.appendChild(option);
  }

  submitFormHandler = (event) => {
    event.preventDefault();

    const formEl = event.target;

    const formData = new FormData(formEl);

    const podrucjeId = Number(formData.get('Podrucja'));
    const cvetId = Number(formData.get('Cvet'));
    const listId = Number(formData.get('List'));
    const stabloId = Number(formData.get('Stablo'));

    const queryOsobine = {
      podrucjeId,
      cvetId,
      listId,
      stabloId,
    };

    // izmenio bih dodatnu util fju getRequest da prihvata query ali nemam vreme
    try {
      (async () => {
        const response = await fetch(
          `https://localhost:7011/Biljke/PreuzmiBiljke/${podrucjeId}?osobineIDs=${cvetId}&osobineIDs=${listId}&osobineIDs=${stabloId}`
        );

        if (!response.ok) {
          throw new CustomError(response.statusText, response.status);
        }

        const biljke = await response.json();

        if (biljke.length > 0) {
          this.biljke - [];
          this.biljke = biljke;
          this.drawRezultati(podrucjeId);
        } else {
          this.dodajNepronadjenu(queryOsobine);
        }
      })();
    } catch (err) {
      console.log(err.message, err.statusCode || 500);
    }
  };

  drawRezultati(podrucjeId) {
    console.log(this.biljke);
    const ulEl = document.querySelector('.items');
    ulEl.innerHTML = '';
    this.biljke.forEach((biljka) => {
      let plant = new Biljka(
        biljka.id,
        biljka.naziv,
        biljka.slika,
        biljka.brojVidjenja
      );
      // ovde je greska ako se desi
      plant.draw(ulEl);
      plant.upisiPodrucje(podrucjeId);
    });
  }

  dodajNepronadjenu(queryOsobine) {
    try {
      (async () => {
        const rezultat = await fetch(
          `https://localhost:7011/Biljke/DodajNepronadjenu?osobineIDs=${queryOsobine.cvetId}&osobineIDs=${queryOsobine.listId}&osobineIDs=${queryOsobine.stabloId}`,
          { method: 'POST' }
        );

        const resData = await rezultat.text();
        console.log(resData);
        alert(resData);
      })();
    } catch (err) {
      console.log(err.message, err.statusCode || 500);
    }
  }

  drawRightsection(rightDivElContainer) {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('items');
    rightDivElContainer.appendChild(ulEl);
  }
}
