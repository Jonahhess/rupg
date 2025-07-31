export default class Mock {
  add(api_name, api_key) {
    localStorage.setItem(api_name, api_key);
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  async getData(api_name, url, textAfterKey = "") {
    const api_key = localStorage.getItem(api_name);
    if (!api_key) throw new Error("No API Key");

    const fullpath = `${url}?api_key=${api_key}${
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
}
