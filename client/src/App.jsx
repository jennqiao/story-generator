import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
import style from './styles/app.css';
import Avatar from './components/Avatar.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import example from './exampleStory.js';
import { withRouter } from 'react-router'
const axios = require('axios');

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
    }
    this.handleInput = this.handleInput.bind(this);
   
  }

  handleInput(e) {
    let name = e.target.value;
    name = name[0].toUpperCase()+name.slice(1).toLowerCase();
    this.setState({
      name: name
    })
  }

  render() {
   

    return (
      <div>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal"><Link to="/">Story Generator</Link></h5>
      <nav className="my-2 my-md-0 mr-md-3">
      <Link to="/profile"><a className="p-2 text-dark" >Profile</a></Link>
        <a className="p-2 text-dark">My Story</a>
      </nav>
      <Link to="/register"><a className="btn btn-outline-primary">Sign up / Login</a></Link>
    </div>

    <Switch>
      <Route
      exact path='/'
      render={(props) => <Home {...props} handleInput={this.handleInput}/>}
      />  
      <Route
      path='/avatar'
      render={(props) => <Avatar {...props} name={this.state.name} />}
      />       
      <Route
      path='/story'
      render={(props) => <Story {...props} name={this.state.name} />}
      />  
      <Route
      path='/register'
      render={(props) => <Register {...props} />}
      />  
      <Route
      path='/login'
      render={(props) => <Login {...props} />}
      />
    </Switch>
    </div>
    )
  }
 }

 const Choice = ({text, handleChange, nextPage}) => {

  return (
    <button className={style.button} onClick={()=> {handleChange(nextPage)}}>{text}</button>
  )
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





class Story extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: '0',
      story: example
    }
    this.name = this.props.name;
    this.handleStoryOutput = this.handleStoryOutput.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleStoryOutput(type) {
    let str = this.state.story[this.state.currentPage][type];
    let newS = str.replace("${this.state.name}", this.name);
    return newS;
  }

  handlePageChange(page) {

    this.setState({
      currentPage: page
    })

  }

  render () {
    return (
      <div className={style.app}>
        <h1 className={style.title}>The Adventures of {this.name}</h1>
        <div className={style.storyImage}>
          <img className={style.image} src={''+this.handleStoryOutput('image')} />
        </div>
        <div className={style.storyText}>
          {this.handleStoryOutput('text')}
        </div>
        <div>
          {
            this.state.story[this.state.currentPage].children.map((choice, index) => {
              return <Choice key={index} text={choice.buttonText} nextPage={choice.pageId} handleChange={this.handlePageChange}/>
            })
          }
        </div>
      </div>
     
    )

  }

}


export default App;