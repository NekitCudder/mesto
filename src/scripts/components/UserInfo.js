export class UserInfo {
  constructor({ name, info, avatar }) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
    this._avatar = document.querySelector(avatar);
  }
  //получение данных профиля со страницы
  getUserInfo() {
    this._profile = {
      name: this._name.textContent,
      info: this._info.textContent
    }
    return this._profile;
  }
  //установка новых данных профиля
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    setUserAvatar(data);
  }
  //замена аватара
  setUserAvatar(data){
    this._avatar.src=data.avatar;
  }
}