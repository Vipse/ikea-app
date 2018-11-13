import React, { Component } from 'react';
import './index.css';
import { Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      login: "",
      password: ""
    }
  }
  handleSubmit = () => {
    if(!this.state.login || !this.state.password) {
      message.error("Please enter login and password")
      return
    }
    const obj = {
      login: this.state.login,
      password: this.state.password
    }
    console.log("WHAT WE SEND TO LOGIN", obj)
    axios.post('http://178.172.201.108/~api/json/fusers/login', JSON.stringify(obj))
            .then(res => {
                console.log("RES LOGIN", res)
                if(res.data.result===false) {
                  message.error("Login or password is incorrect")
                } else {
                  window.localStorage.setItem("userId", res.data.user.id);
                  window.localStorage.setItem("userName", res.data.user.params.name+" "+res.data.user.params.surname);
                  window.location = "/app/my-materials"
                }
            })
            .catch(err => {
                console.log(err);
            })
    console.log(this.state.login, this.state.password)
  }
  handleChange = (val, field) => {
    this.setState({[field]:val})
  }
  render() {
    if(window.localStorage.getItem("userId")) {
      return <Redirect to='/app/my-materials'/>
    }
    return (
      <div className="LoginPage">
        <div className="title">Sign In</div>
        <Input placeholder='Login' onChange={(e)=>this.handleChange(e.target.value, "login")} value={this.state.login}/>
        <Input placeholder='Password' type="password" onChange={(e)=>this.handleChange(e.target.value, "password")} value={this.state.password}/>
        <Button type='primary' onClick={this.handleSubmit}>Submit</Button>
      </div>
    );
  }
}

export default Login;
