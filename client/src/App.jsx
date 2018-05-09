import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Switch, Route } from 'react-router-dom';
import style from './styles/app.css';
import Avatar from './components/Avatar.jsx';
import example from './exampleStory.js';

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      customPart: 1,
      hasName: false,
      storyReady: false,
      story: example,
      currentPage: '0'
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleGenerateStory = this.handleGenerateStory.bind(this);
    this.handleStoryOutput = this.handleStoryOutput.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.submitName = this.submitName.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInput(e) {
    let name = e.target.value;
    name = name[0].toUpperCase()+name.slice(1).toLowerCase();
    this.setState({
      name: name
    })
  }

  handleKeyPress(e) {
    if (e.keyCode === 13 || e.charCode ===13) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        hasName: true
      })
    }
  }

  handleGenerateStory() {
    this.setState({
      storyReady:true
    })
  }

  submitName() {
    this.setState({
      hasName: true
    })
  }

  handleStoryOutput(type) {
    let str = this.state.story[this.state.currentPage][type];
    let newS = str.replace("${this.state.name}", this.state.name);
    return newS;
  }

  handlePageChange(page) {

    this.setState({
      currentPage: page
    })

  }

  render() {

    return (

    <Switch>
      <Route
      exact path='/'
      render={(props) => <Home {...props} handleKeyPress={this.handleKeyPress} handleInput={this.handleInput} submitName={this.submitName} />}
      />  
      <Route
      path='/avatar'
      render={(props) => <Avatar {...props} name={this.state.name} />}
      />       
      {/* <Route path='/avatar' component={Avatar}></Route>
        <Route path='/story' component={Story}></Route> */}
    </Switch>
    )



    // if (!this.state.storyReady && !this.state.hasName) {

    //     return (
    //       <div className={style.app}>
  
  
    //         <div className={style.box}>
    //           <div className={style.title}>What's your name?</div>
    //           <div>
    //             <input className={style.input} onKeyDown={this.handleKeyPress} onChange={this.handleInput} type='text' name='text' placeholder='your name here'></input>
    //           </div>
    //           <div>
    //           <button className={style.button} onClick={this.submitName}>Generate my story</button>
    //           </div>
    //         </div>
    //         <img className={style.image} src='../public/openbook.png' />
    //       </div>
    //     )
    //   } else if (!this.state.storyReady && this.state.hasName) {
    //     return (
    //       <div className={style.app}>

    //        <div className={style.box}>
    //           <div className={style.title}>
    //               <div>Hi {this.state.name}!</div> 
    //               <div>First, let's design your character.</div>
    //           </div>
    //           <Avatar/>
    //           <div>
    //           <button className={style.button} onClick={this.handleGenerateStory}>Let's go!</button>
    //           </div>
    //         </div>
    //       </div>
    //     )
    //   } else {
    //   return (
    //     <div className={style.app}>
    //       <h1 className={style.title}>The Adventures of {this.state.name}</h1>
    //       <div className={style.storyImage}>
    //         <img className={style.image} src={''+this.handleStoryOutput('image')} />
    //       </div>
    //       <div className={style.storyText}>
    //         {this.handleStoryOutput('text')}
    //       </div>
    //       <div>
    //         {
    //           this.state.story[this.state.currentPage].children.map((choice, index) => {
    //             return <Choice key={index} text={choice.buttonText} nextPage={choice.pageId} handleChange={this.handlePageChange}/>
    //           })
    //         }
    //       </div>
    //     </div>
    //   )

    // }

  }

 }

 const Choice = ({text, handleChange, nextPage}) => {

  return (
    <button className={style.button} onClick={()=> {handleChange(nextPage)}}>{text}</button>
  )
 }


const Home = ({handleKeyPress, handleInput, submitName}) => {

  return (
    <div className={style.app}>

      <div className={style.box}>
        <div className={style.title}>What's your name?</div>
        <div>
          <input className={style.input} onKeyDown={handleKeyPress} onChange={handleInput} type='text' name='text' placeholder='your name here'></input>
        </div>
        <div>
        <Link to="/avatar"><button className={style.button} onClick={submitName}>Generate my story</button></Link>
        </div>
      </div>
      <img className={style.image} src='/openbook.png' />
    </div>
  )


}


export default App;