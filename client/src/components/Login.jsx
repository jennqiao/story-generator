import React from 'react';
import style from '../styles/login.css';
const axios = require('axios');

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      errors: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleAuthentication = this.props.handleAuthentication;

  }

  handleEmailInput(e) {
    let email = e.target.value;
    this.setState({
      emailAddress: email
    })
  }

  handlePassword(e) {
    let pword = e.target.value;
    this.setState({
      password: pword
    })
  }

  handleSubmit () {
    const data = {
      emailAddress: this.state.emailAddress,
      password: this.state.password
    }; 
    console.log('here is data', data);

    axios.post('/login', data)
      .then((response) => {
        // alert('Account created');
        // console.log('in here', this.props.history);
        console.log('got response', response.data);
        this.handleAuthentication(true);
        this.props.history.push('/');
        

      })
      .catch((error) => {
        this.setState({
          errors: error.response.data.errors
        })
        console.log('here is error', error.response.data.errors);
      });
  }



  render () {

    return (
      <div className={style.app}>
        <div className={style.title}>Welcome back! Please log in.</div>

        {this.state.errors.length ? <div>{this.state.errors.map(err => {return (<div className="alert alert-danger" role="alert">{err.msg}</div>)})}</div> : <div></div>}
      <div className="form-group">
      <label>Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailInput} />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePassword} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }

}

export default Login; 