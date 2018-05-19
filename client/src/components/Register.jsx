import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import style from '../styles/register.css';
const axios = require('axios');

class Register extends React.Component {

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

  componentDidMount() {
    console.log('name?', this.props.name);
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
      password: this.state.password,
      name: this.props.name
    };

    console.log('here is data', data);

    axios.post('/register', data)
      .then((response) => {
        // alert('Account created');
        // console.log('in here', this.props.history);
        console.log('here is response data', response.data)
        this.handleAuthentication(response.data);
        this.props.history.push('/story');

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
        <div className={style.title}>Sign up to save your progress!</div>

      {this.state.errors.length ? <div>{this.state.errors.map(err => {return (<div className="alert alert-danger" role="alert">{err.msg}</div>)})}</div> : <div></div>}
      <div className="form-group">
      <label>Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailInput} />
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePassword} />
      </div>
      <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      <div>
        <br></br>
      <Link to="/login"><span className="p-2 text-dark" >Already signed up? Login here.</span></Link>
      </div>
      </div>
    )
  }

}

export default Register; 