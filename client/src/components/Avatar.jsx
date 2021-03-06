import React from 'react';
import ReactDOM from 'react-dom';
import {fabric} from 'fabric';
import { Link } from 'react-router-dom';
import style from '../styles/avatar.css';
import {headlist, facelist, hairlist, haircolors} from '../images/templates/templatelist';
import Canvas from './Canvas.jsx';
const axios = require('axios');

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
    this.saveProfile = this.saveProfile.bind(this);
  }

  handleSelection (imgElement, index) {

    let imgInstance = new fabric.Image(imgElement, {  
      width: 400,
      height: 400,
      the_type: this.state.currentType,
      zIndex : this.state.currentZIndex
    });

    this.setState({
      currentSelection: imgInstance
    });

    if (this.state.currentType === 'hair') {
      this.setState({currentHairChoice: index});
    }

    this.props.handleProfile(
      this.state.currentType, this.state.currentChoices[index]
    );

  }

  handleTypeSelection (type) {

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

  saveProfile () {

    axios.post('/api/profile', this.state.profile)
    .then((response) => {
      console.log('here is response', response.data);
    })
    .catch((error) => {
      console.log('here is error', error);
    });

  }

  render () {

    return (

      <div className={style.avatarMaker}>
      <div className={style.title}>
            <div>Hi {this.props.name}!</div> 
            <div>First, let's design your character.</div>
      </div>
      <Canvas  selection={this.state.currentSelection}/>
      <div>
        <ListOfTypes list={this.state.listOfTypes} handleTypeSelection={this.handleTypeSelection} currentChoice={this.state.currentType}/>
        <List handleSelection={this.handleSelection} data={this.state.currentChoices}/>
      </div>
      <div>
      <Link to="/register"><button className={style.button}>Let's go!</button></Link>
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
          <img key={choice} className={style.choice} src={`${choice}`} onClick={(e)=> { handleSelection(e.target, i)}}/>
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