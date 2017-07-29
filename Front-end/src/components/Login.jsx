import React from 'react';

import { login, registration } from './request';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logMess: false,
      regMess: false,
      repeatName: false,
      reg: false
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    if(username && password !== '') {
      login(username, password)
        .then(res => {
          if(res !== 'error') {
            localStorage.setItem('jwtToken', res);
            window.location.href = "/";
            // this.props.history.push('/');
          } else this.setState({logMess: true})
        })
    }
  }

  login() {
    return (
      <div className="log">
        <h1>Вход</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input required ref="username" type="text" name="name" placeholder="Username" />
          <input required ref="password" type="password" placeholder="Password" />
          {
            this.state.logMess ?
              <span>Имя или пароль введено неверно</span>
              : false
          }
          <input type="submit" value="Войти" />
          <input type="button" onClick={() => this.setState({reg: true, logMess: false, repeatName: false, regMess: false})} value="Регистрация" />
        </form>
      </div>
    )
  }

  handleReg() {
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let repPass = this.refs.repPass.value;
    if(username !== '' && password !== '' && password === repPass) {
      registration(username, password)
        .then(res => {
          if(res === 'Repeat name') {
            this.setState({repeatName: true})
          } else this.setState({reg: false})
        })
    } else this.setState({regMess: true})
  }

  registration() {
    return (
      <div className="reg">
        <h1>Регистрация</h1>
        <div className="form">
          <input ref="username" type="text" name="name" placeholder="Username" />
          <input ref="password" type="password" placeholder="Password" />
          <input ref="repPass" type="password" placeholder="Repeat password" />
          {
            this.state.regMess ?
              <span>Неверно введены данные</span>
              : false
          }
          {
            this.state.repeatName ?
              <span>Пользователь с таким именем уже существует</span>
              : false
          }
          <input type="submit" onClick={this.handleReg.bind(this)} value="Зарегистрироваться" />
          <input type="button" onClick={() => this.setState({reg: false, repeatName: false, regMess: false})} value="Назад" />
        </div>
      </div>
    )
  }

  render() {
    return (
      <section className="login-form">
        {
          this.state.reg ?
            this.registration()
              :
                this.login()
        }
      </section>
    )
  }
}

export default Login;
