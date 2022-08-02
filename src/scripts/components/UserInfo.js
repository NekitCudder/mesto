export class UserInfo {
  constructor({ name, info }) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }
  //получение данных профиля со страницы
  getUserInfo() {
    this._profile = {
      name: this._name.textContent,
      info: this._info.textContent,
    }
    return this._profile;
  }
  //установка новых данных профиля
  setUserInfo(newName, newInfo) {
    this._name.textContent = newName;
    this._info.textContent = newInfo;
  }
}