import React from 'react';
import ReactDOM from 'react-dom';
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
  }

  handleInput(e) {
    let name = e.target.value;
    name = name[0].toUpperCase()+name.slice(1).toLowerCase();
    this.setState({
      name: name
    })
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

    if (!this.state.storyReady && !this.state.hasName) {

        return (
          <div className={style.app}>
  
  
            <div className={style.box}>
              <div className={style.title}>What's your name?</div>
              <div>
                <input className={style.input} onChange={this.handleInput} type='text' name='text' placeholder='your name here'></input>
              </div>
              <div>
              <button className={style.button} onClick={this.submitName}>Generate my story</button>
              </div>
            </div>
            <img className={style.image} src='../public/openbook.png' />
          </div>
        )
      } else if (!this.state.storyReady && this.state.hasName) {
        return (
          <div className={style.app}>

           <div className={style.box}>
              <div className={style.title}>Hi {this.state.name}! First, let's design your character.</div>
              <Avatar/>
              <div>
              <button className={style.button} onClick={this.handleGenerateStory}>Let's go!</button>
              </div>
            </div>
          </div>
        )
      } else {
      return (
        <div className={style.app}>
          <h1 className={style.title}>The Adventures of {this.state.name}</h1>
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

 }

 const Choice = ({text, handleChange, nextPage}) => {

  return (
    <button className={style.button} onClick={()=> {handleChange(nextPage)}}>{text}</button>
  )
 }


export default App;