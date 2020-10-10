import {Form} from "react-bootstrap";
import React from "react";
import {Button} from '@rmwc/button';
import UsesIcon from "./assets/user-icon.png";
import {loginApi, createAccountApi} from "./Api";
class Login extends React.Component{
  state = {
    showLogin: true
  }
  handleClick = (e)=>{
    e.preventDefault()
    this.setState({
      showLogin: !this.state.showLogin
    })
  }
  fetchData = e=>{
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log(email, password)
    loginApi(email, password).then(data => {
      if (data.action === 'successful') {
        console.log(data)
        return this.props.storeToken(data, email)
      }
      alert('wrong email or password')
    })
  }
  singuphandle = e=>{
    e.preventDefault()
    const email = document.getElementById('email').value
    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    console.log(name, email, password)
    createAccountApi(email, password, name).then(data=>{
      if (data.action === 'successful'){
        alert('signup successful')
        this.setState({
          showLogin: true
        })
      }
    })
  }
  render() {
    if (this.state.showLogin) return (
      <div>
        <div id='loginForm'>
          <Form>
            <h1 className='text-center'>Login Page</h1>
            <img src={UsesIcon} className='rounded mx-auto d-block' alt='icon'/>
            <hr/>
            <Form.Group>
              <Form.Control type="email" placeholder="Enter email" id='email' className='inputFields' required/>
              <Form.Text>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group >
              <Form.Control type="password" placeholder="Password" id='password' className='inputFields' required/>
            </Form.Group>
            <Button type="submit" onClick={this.handleClick} raised>
              Goto SignUp Form
            </Button>
            <Button type="submit" onClick={this.fetchData} className='float-right' raised>
              Login
            </Button>
          </Form>
        </div>
      </div>
    )
    else {
      return (
        <div>
        <div id='loginForm'>
          <Form>
            <h1 className='text-center'>Signup Page</h1>
            <img src={UsesIcon} className='rounded mx-auto d-block' alt='icon'/>
            <hr/>
            <Form.Group>
              <Form.Control type="text" placeholder="Name" id='name' className='inputFields' required/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="email" placeholder="Enter email" id='email' className='inputFields' required/>
              <Form.Text>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group >
              <Form.Control type="password" placeholder="Password" id='password' className='inputFields' required/>
            </Form.Group>
            <Button type="submit" onClick={this.handleClick} raised>
              Goto Login Form
            </Button>
            <Button type="submit" onClick={this.singuphandle} className='float-right' raised>
              SignUp
            </Button>
          </Form>
        </div>
      </div>
      )
    }
  }
}

export default Login