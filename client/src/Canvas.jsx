import React from 'react';
import {fabric} from 'fabric';
import style from './avatar.css';

class Canvas extends React.Component{

  constructor(props) {
    super(props);

    this.updateCanvasforImage = this.updateCanvasforImage.bind(this);
  }

	componentDidMount(){

		// Make a New Canvas
    this.canvas = new fabric.StaticCanvas('canvas', {
			preserveObjectStacking: true,
			height:375,
			width:375,
    });

	}

	componentWillReceiveProps(newprops) {

		// If Updated Item is not the same as the old one
		// 		=> Update the canvas with newer item
		if(newprops.selection !== this.props.selection){
			this.updateCanvasforImage(this.props.selection,newprops.selection);
		}
	}

	updateCanvasforImage (prevImage,nextImage) {

  
      let existingImage;

			// Find the same kind of element
			this.canvas.forEachObject( (image) => {

				if(image.the_type === nextImage.the_type){
          existingImage = image;   
				}
			});

      if (existingImage) {
        this.canvas.remove(existingImage);
      }
     

      this.canvas.add(nextImage);
      this.canvas.moveTo(nextImage, nextImage.zIndex);
      console.log('updated canvas', this.canvas);
    
  }
	
	render(){
		
		return (
			<div>
				
        <canvas id="canvas" className={style.canvas} />

			</div>
		);
	}
}

export default Canvas;