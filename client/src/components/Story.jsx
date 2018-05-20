import React from 'react';
import ReactDOM from 'react-dom';
import {fabric} from 'fabric';
import { Link } from 'react-router-dom';
import style from '../styles/story.css';
import example from '../exampleStory.js';
import img from '../images/bedroomWithModel.jpg';
import face from '../images/faceTest.png';


class Story extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: '0',
      story: example
    }
    this.handleStoryOutput = this.handleStoryOutput.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount () {

    let canvas = new fabric.StaticCanvas('canvas2', {
			preserveObjectStacking: true,
			height:300,
			width:600,
    });

   

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

    fabric.Image.fromURL(face, function(oImg) {
      oImg.scale(0.1);

      oImg.set({'height': 600});
      oImg.set({'left': 235, 'top': 85});
      canvas.add(oImg);
    });



  }

  handleStoryOutput(type) {
    let str = this.state.story[this.state.currentPage][type];
    let newS = str.replace("${this.state.name}", this.props.name);
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