import React from 'react';
import ReactDOM from 'react-dom';
import {fabric} from 'fabric';
import style from './avatar.css';
import {bglist, facelist, eyeslist, faciallist, hairlist} from './images/templates/templatelist';
import Canvas from './Canvas.jsx';

class Avatar extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentSelection: {},
      currentChoices: facelist,
      currentType: 'face',
      currentZIndex: 0,
      listOfTypes: ['face', 'eyes', 'hair']
    }

    this.handleSelection = this.handleSelection.bind(this);
    this.handleTypeSelection = this.handleTypeSelection.bind(this);
  }

  handleSelection (imgElement) {

    let imgInstance = new fabric.Image(imgElement, {  
      width: 400,
      height: 400,
      the_type: this.state.currentType,
      zIndex : this.state.currentZIndex
    });

    this.setState({currentSelection: imgInstance });

  }

  handleTypeSelection (type) {
    console.log('clicked', type);

    if (type==='face') {
      this.setState({
        currentChoices: facelist,
        currentType: type,
        currentZIndex: 0
      })
    } else if (type === 'eyes') {
      this.setState({
        currentChoices: eyeslist,
        currentType: type,
        currentZIndex: 2
      })
    } else if (type === 'hair') {
      this.setState({
        currentChoices: hairlist,
        currentType: type,
        currentZIndex: 2
      })
    }
  }

  render () {

    return (

      <div className={style.avatarMaker}>
      <Canvas  selection={this.state.currentSelection}/>
      <ListOfTypes list={this.state.listOfTypes} handleTypeSelection={this.handleTypeSelection}/>
      <List handleSelection={this.handleSelection} data={this.state.currentChoices}/>

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
          <img key={choice} className={style.choice} src={choice} onClick={(e)=> { handleSelection(e.target)}}/>
         </li>
        )
      })
    }
     </ul>
  );
};

const ListOfTypes = ({list, handleTypeSelection}) => {


  return (
    <div>
      {
        list.map(type => {
          return (
          <ul className={style.list}>
            <li className={style.choice} onClick={()=> {handleTypeSelection(type)}} >{type}</li>
          </ul>

          )
        })
      }
    </div>
  )
}

export default Avatar;