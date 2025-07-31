export default class Mock {
  #source;
  #api_key;
  constructor(source, api_key, url) {
    this.#source = source;
    this.#api_key = api_key;
    localStorage.setItem(source, api_key);
  }
}
