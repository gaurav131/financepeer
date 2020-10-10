import React from 'react';
import './App.css';
import Navigation from "./navigation";
import '@material/button/dist/mdc.button.css';
import BackgroundImageData from './assets/bugati-backgroud.jpg'
import Login from "./Login";
import AddData from "./pages/addData";
import ShowData from "./pages/showData";
import {Route} from 'react-router-dom';

class App extends React.Component {
  state={
    login: false,
    accessToken: null,
  }
  storeToken = (token, email)=>{
    localStorage.login = !this.state.login
    localStorage.accessToken = token.token
    localStorage.email = email
    this.setState({
      login: !this.state.login,
      accessToken: token.token
    })
  }
  componentDidMount() {
    if (localStorage.login){
      this.setState({
        login: localStorage.login,
        accessToken: localStorage.accessToken,
      })
    }
  }
  handleLogout = ()=>{
    localStorage.clear()
    this.setState({
      login: false,
      accessToken: null,
    })
  }
  render() {
    console.log(this.state)
    if (this.state.login){
      return (
        <div style={{backgroundImage: `url(${BackgroundImageData})`, width: '100%',
          height: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
          <Navigation login={this.state.login} handleLogout={() => this.handleLogout()}/>
          <Route exact path='/' render={()=> <AddData/>}/>
          <Route exact path='/showData' render={() => <ShowData/>}/>
        </div>
      )
    }
  else {
    return (
      <div style={{backgroundImage: `url(${BackgroundImageData})`, width: '100%',
          height: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <Navigation login={this.state.login}/>
        <Login login={this.state.login} storeToken={this.storeToken} accessToken={this.state.accessToken}/>
        </div>
    )
  }
  }
}

export default App;
