import { Application } from './application.js';
import getRequest from '../util/getRequest.js';

try {
  const osobine = await getRequest(
    `https://localhost:7011/Osobine/PreuzmiOsobine`
  );
  const podrucja = await getRequest(
    `https://localhost:7011/Podrucja/PreuzmiPodrcuja`
  );

  const app = new Application(osobine, podrucja);
  const divEl = document.createElement('div');
  divEl.classList.add('main-div');
  app.draw(divEl);
  document.body.appendChild(divEl);
} catch (err) {
  console.trace(err);
  console.log(err.message, err.statusCode || 500);
}
