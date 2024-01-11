import CustomError from './CustomError.js';

export default async function getRequest(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new CustomError(response.statusText, response.status);
  }

  const resData = await response.json();

  console.log(resData);

  return resData;
}
