export default class UserInfo {
  constructor({ name, info }) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }

  getUserInfo() {
    this._profile = {
      name: this._name.textContent,
      info: this._info.textContent,
    }
    return this._profile;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent.data.info;
  }
}