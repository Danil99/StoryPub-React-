import React from 'react';

import SettLink from './SettLink.jsx';

import { changePassword } from './request';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passNoValid: false,
      diffPass: false
    }
  }

  handleAvatar(event) {
    let avatar = event.target.files[0]
    let formData = new FormData();

    let reader = new FileReader;
    reader.onload = () => {
      let image = new Image();
      image.src = reader.result;
      image.onload = () => {
        formData.append('avatar', avatar);
        formData.append('token', localStorage.jwtToken);
        formData.append('width', image.width);
        formData.append('height', image.height);
        this.props.changeAvatar(formData);
      };
    };

    reader.readAsDataURL(avatar);
  }

  settingsChange() {
    let username = this.refs.username.value;
    let email = this.refs.email.value;
    if(username !== this.props.user.username || email !== this.props.user.email) {
      this.props.editSettings(username, email);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let oldPass = this.refs.oldPass.value;
    let newPass = this.refs.newPass.value;
    let repNewPass = this.refs.repNewPass.value;
    if(newPass === repNewPass) {
      changePassword(oldPass, newPass)
        .then(res => {
          if(res === 'diffPass') {
            this.setState({diffPass: true, passNoValid: false})
          } else if(res === 'The token is not verify') {
            localStorage.removeItem('jwtToken');
            window.location.href = "/";
          } else if(res === 'notPass') {
            this.setState({passNoValid: true, diffPass: false})
          } else {
            localStorage.setItem('jwtToken', res);
            location.reload();
          }
        })
    }
  }

  passwordChange() {
    return (
      <div className="user-sett">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="item">
            <div className="label">
              <label htmlFor="oldPass">Старый пароль</label>
            </div>
            <input required ref="oldPass" type="password" id="oldPass" />
          </div>
          <div className="item">
            <div className="label">
              <label htmlFor="newPass">Новый пароль</label>
            </div>
            <input required ref="newPass" type="password" id="newPass" />
          </div>
          <div className="item">
            <div className="label">
              <label htmlFor="repNewPass">Подтвердите новый пароль</label>
            </div>
            <input required ref="repNewPass" type="password" id="repNewPass" />
          </div>
          {
            this.state.diffPass ?
              <span>Старый и новый пароль совпадают</span>
                :
                  this.state.passNoValid
                    ?
                      <span>Старый пароль введено неверно</span>
                        :
                          false
          }
          <input type="submit" value="Сохранить" />
        </form>
      </div>
    )
  }

  userChange() {
    return (
      <div className="user-sett">
        <div className="item">
          <div className="label">
            <label htmlFor="username">Имя пользователя</label>
          </div>
          <input ref="username" type="text" id="username" defaultValue={this.props.user.username} />
        </div>
        <div className="item">
          <div className="label">
            <label htmlFor="email">Эл. адрес</label>
          </div>
          <input ref="email" type="text" id="email" defaultValue={this.props.user.email} />
        </div>
        <input onClick={this.settingsChange.bind(this)} type="submit" value="Сохранить" />
      </div>
    )
  }

  render() {
    if(Boolean(this.props.user)) {
      return (
        <section>
          <div className="settings">
            <ul className="sidebar">
              <li><SettLink exact to="/settings">Редактировать профиль</SettLink></li>
              <li><SettLink to="/settings/password">Сменить пароль</SettLink></li>
            </ul>
            <div className="change-sett">
              <div className="user">
                <div className="image">
                  <label>
                    <input
                      type="file"
                      accept='image/png, image/jpeg'
                      onChange={this.handleAvatar.bind(this)}
                    />
                    <img className={this.props.user.resolveAvatar ? 'res' : ''} src={this.props.user.avatar} alt="Alt" />
                  </label>
                </div>
                <div className="username">
                  <h3>{this.props.user.username}</h3>
                </div>
              </div>

              {
                /password/.test(window.location.href) ?
                  this.passwordChange()
                    :
                      this.userChange()
              }

            </div>
          </div>
        </section>
      )
    } else return null;
  }
}

export default Settings;
