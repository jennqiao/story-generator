import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import style from './styles/app.css';
import Avatar from './components/Avatar.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import Story from './components/Story.jsx';
import TicTacToeGame from './components/TicTacToe.jsx';
import { withRouter } from 'react-router'
const axios = require('axios');

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      profile: {},
      isLoggedIn: false,
      currentPage: "0"
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handlePageUpdate = this.handlePageUpdate.bind(this);
  }

  handleAuthentication(data) {
    let isLoggedIn = data.isLoggedIn;
    if (isLoggedIn) {
      this.setState({
        name: data.user.name,
        isLoggedIn: isLoggedIn,
        profile: data.user.profile,
        currentPage: data.user.currentPage
      });
      // this.props.history.push('/dashboard'); 
    }
  }

  componentDidMount() {
    axios.get('/isAuthenticated')
      .then((response) => {
        console.log('here is response', response.data);
        this.handleAuthentication(response.data);
      })
      .catch((error) => {
        console.log('here is error', error);
      });
  }

  handlePageUpdate(page) {
    this.setState({
      currentPage: page
    })
  }

  

  handleInput(e) {
    let name = e.target.value;
    name = name[0].toUpperCase()+name.slice(1).toLowerCase();
    this.setState({
      name: name
    })
  }

  handleProfile (type, imageUrl) {
    let profile = this.state.profile;
    profile[type] = imageUrl;

    this.setState({
      profile: profile
    })
  }

  render() {
    return (
      <div>

        <NavBar isLoggedIn={this.state.isLoggedIn}/>

        <Switch>
          <Route
          exact path='/'
          render={(props) => <Home {...props} handleInput={this.handleInput} isLoggedIn={this.state.isLoggedIn}/>}
          />  
          <Route
          path='/avatar'          
          render={(props) => <Avatar {...props} name={this.state.name} handleProfile={this.handleProfile} />}
          />       
          <Route
          path='/story'
          render={(props) => <Story {...props} handlePageUpdate={this.handlePageUpdate} name={this.state.name} profile={this.state.profile} currentPage={this.state.currentPage} />}
          />  
          <Route
          path='/register'
          render={(props) => <Register {...props} handleAuthentication={this.handleAuthentication} name={this.state.name} profile={this.state.profile}/>}
          />  
          <Route
          path='/login'
          render={(props) => <Login {...props} handleAuthentication={this.handleAuthentication}/>}
          />
          <Route
          path='/dashboard'
          render={(props) => <Dashboard {...props} name={this.state.name}/>}
          />
          <Route
          path='/game'
          render={(props) => <TicTacToeGame {...props}/>}
          />
        </Switch>
      </div>
    )
  }
 }





 const NavBar = ({isLoggedIn}) => {

  if (isLoggedIn) {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal"><Link to="/">Choose Your Own Adventure</Link></h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link to="/dashboard"><span className="p-2 text-dark">Profile</span></Link>
        <Link to="/story"><span className="p-2 text-dark" >My Story</span></Link>
      </nav>
      <a className="btn btn-outline-primary" href="/logout">Logout</a>
      </div>

    )
  } else {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal"><Link to="/">Choose Your Own Adventure</Link></h5>
      <Link to="/login"><span className="btn btn-outline-primary">Login</span></Link>
      </div>
    )

  }
  
 }



class Home extends React.Component {

  constructor(props) {
    super(props);

    this.handleInput = this.props.handleInput;
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }


  handleKeyPress(e) {
    if (e.keyCode === 13 || e.charCode ===13) {
      e.preventDefault();
      e.stopPropagation();
      this.props.history.push('/avatar');
    }
  }

  render () {

    if (this.props.isLoggedIn) {
      return <Redirect to={`/dashboard`} />
    } else {

      return (
        <div className={style.app}>
  
          <div className={style.box}>
            <div className={style.title}>What's your name?</div>
            <div>
              <input className={style.input} onKeyDown={this.handleKeyPress} onChange={this.handleInput} type='text' name='text' placeholder='your name here'></input>
            </div>
            <div>
            <Link to="/avatar"><button className={style.button}>Generate my story</button></Link>
            </div>
          </div>
          <img className={style.image} src='/openbook.png' />
        </div>
      )
    }

  }

}







export default App;