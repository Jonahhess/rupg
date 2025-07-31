async function getData(url, apiKey, textAfterKey = "") {
  const fullpath = `${url}?api_key=${apiKey}${
    textAfterKey ? `&${textAfterKey}` : ""
  }`;

  const cached = localStorage.getItem(fullpath);
  if (cached) return JSON.parse(cached);

  const response = await fetch(fullpath);
  if (!response.ok) throw new Error("bad path");

  const data = await response.json();

  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(fullpath, stringifiedData);

  return data;
}

export default getData;
