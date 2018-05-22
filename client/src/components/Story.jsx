import React from 'react';
import ReactDOM from 'react-dom';
import {fabric} from 'fabric';
import { Link } from 'react-router-dom';
import style from '../styles/story.css';
import example from '../exampleStory.js';
import example2 from '../../../db/exampleStory.json';
import img from '../images/1a.png';
import face from '../images/faceTest.png';
import {headlist, facelist, hairlist, haircolors} from '../images/templates/templatelist';
const axios = require('axios');

class Story extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
      story: example2,
    }
    this.handleStoryOutput = this.handleStoryOutput.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.loadIllustration = this.loadIllustration.bind(this);
  }

  componentDidMount () {

    this.canvas = new fabric.StaticCanvas('canvas2', {
			preserveObjectStacking: true,
			height:300,
			width:600,
    });
    this.loadIllustration();

  }

  componentDidUpdate(prevProps) {

    if (prevProps.profile !== this.props.profile && this.state.story[this.props.currentPage].leftPosition) {
      console.log('new profile', this.props.profile)
      this.loadProfile();
    }

    if (prevProps.currentPage !== this.props.currentPage) {
      this.setState({
        currentPage: this.props.currentPage
      });
      this.canvas.clear();

      this.loadIllustration(this.props.currentPage);
      this.loadProfile(this.props.currentPage);
    }

  }

  loadIllustration (choice) {
    let page = this.state.story[choice] || this.state.story[this.state.currentPage];
    this.canvas.setBackgroundImage(page.image, this.canvas.renderAll.bind(this.canvas));
  }

  loadProfile (choice) {
    let page = this.state.story[choice] || this.state.story[this.state.currentPage];

    if (page.leftPosition) {

      let context = this;
      for (var key in this.props.profile) {
        fabric.Image.fromURL(this.props.profile[key], function(oImg) {
          oImg.scale(0.2);  
          oImg.set({'left': page.leftPosition, 'top': page.topPosition});
          context.canvas.add(oImg);
        });
      }
    }
    
  }

  handleStoryOutput(type) {
    let newS = this.state.story[this.state.currentPage][type];
    while (newS.includes("${this.state.name}")) {  
      newS = newS.replace("${this.state.name}", this.props.name);
    }
    return newS;
  }

  handlePageChange(page) {

    this.setState({
      currentPage: page
    })

    this.canvas.clear();
    this.loadIllustration(page);
    this.loadProfile(page);

    const data = {
      currentPage: page
    }; 

    console.log('here is data', data);

    axios.post('/api/saveProgress', data)
      .then((response) => {
        console.log('here is response data', response.data)
      })
      .catch((error) => {
        console.log('here is error', error);
      });    

  }

  render () {
    
    return (
      <div className={style.app}>
        <h1 className={style.title}>The Adventures of {this.props.name}</h1>
        <div className={style.storyImage}>
          <canvas id="canvas2" className={style.canvas} />

          {/* <img className={style.image} src={img} /> */}
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

const Choice = ({text, handleChange, nextPage}) => {

  return (
    <button className={style.button} onClick={()=> {handleChange(nextPage)}}>{text}</button>
  )
 }

export default Story;