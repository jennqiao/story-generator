import React from 'react';
import ReactDOM from 'react-dom';
import {fabric} from 'fabric';
import style from '../styles/avatar.css';
import {bglist, headlist, facelist, hairlist, haircolors} from '../images/templates/templatelist';
import Canvas from './Canvas.jsx';
import image from '../images/templates/heads/1.png';

class Avatar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentSelection: {},
      currentChoices: headlist,
      currentType: 'head',
      currentZIndex: 0,
      listOfTypes: ['head', 'face', 'hair', 'haircolor'],
      currentHairChoice: 0
    }

    this.handleSelection = this.handleSelection.bind(this);
    this.handleTypeSelection = this.handleTypeSelection.bind(this);
  }

  handleSelection (imgElement, hairNum) {

    console.log('hairnum', hairNum);


    let imgInstance = new fabric.Image(imgElement, {  
      width: 400,
      height: 400,
      the_type: this.state.currentType,
      zIndex : this.state.currentZIndex
    });

    this.setState({currentSelection: imgInstance });

    if (this.state.currentType === 'hair') {
      this.setState({currentHairChoice: hairNum});
    }

  }

  handleTypeSelection (type) {
    console.log('clicked', type);

    if (type==='head') {
      this.setState({
        currentChoices: headlist,
        currentType: type,
        currentZIndex: 0
      })
    } else if (type === 'face') {
      this.setState({
        currentChoices: facelist,
        currentType: type,
        currentZIndex: 2
      })
    } else if (type === 'hair') {
      this.setState({
        currentChoices: hairlist,
        currentType: type,
        currentZIndex: 2
      })
    } else if (type === 'haircolor') {
      this.setState({
        currentChoices: haircolors[this.state.currentHairChoice],
        currentType: type, 
        currentZIndex: 2
      })

    }
  }

  render () {
    console.log('here is image', image);

    return (

      <div className={style.avatarMaker}>
      <Canvas  selection={this.state.currentSelection}/>
      <div>
        <ListOfTypes list={this.state.listOfTypes} handleTypeSelection={this.handleTypeSelection} currentChoice={this.state.currentType}/>
        <List handleSelection={this.handleSelection} data={this.state.currentChoices}/>
      </div>
      </div>

    )
  }
}



const List = ({handleSelection, data}) => {
  

  return (
    <ul className={style.list}>

    {
      data.map((choice, i)=> {
        return (
          <li key={i} >
          <img key={choice} className={style.choice} src={choice} onClick={(e)=> { handleSelection(e.target, i)}}/>
         </li>
        )
      })
    }
     </ul>
  );
};

const ListOfTypes = ({list, handleTypeSelection, currentChoice}) => {


  return (
    <div>
      <ul className={style.list}>

      {
        list.map( (type, index) => {
          return (
            <li  key={index} className={ (currentChoice===type) ? style.selectedChoice : style.choice} onClick={()=> {handleTypeSelection(type)}} >{type}</li>

          )
        })
      }
                </ul>

    </div>
  )
}

export default Avatar;