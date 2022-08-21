export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items) {
    items.forEach(item =>
      this._renderer(item));
  }

  addNewItem(element) {
    this._containerSelector.prepend(element);
  }

  addItem(element) {
    this._containerSelector.append(element);
  }

}