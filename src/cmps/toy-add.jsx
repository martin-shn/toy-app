import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import chroma from 'chroma-js';

import {onAddToy} from '../store/toy.actions.js'

const options = [
    {value:'on-wheels', label: 'On wheels',color:'blue'},
    {value:'box-game', label: 'Box game',color:'green'},
    {value:'art', label: 'Art',color:'purple'},
    {value:'baby', label: 'Baby',color:'hotpink'},
    {value:'doll', label: 'Doll',color:'red'},
    {value:'puzzle', label: 'Puzzle',color:'teal'},
    {value:'outdoor', label: 'Outdoor',color:'orange'}
];

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };


class _ToyAdd extends React.Component{
    state={
        name:'',
        price:0,
        labels: [],
        inStock: true,
    }

    handleChange=({target})=>{
        if (target.name==='inStock') this.setState({[target.name]:target.checked})
        else this.setState({[target.name]:target.value})
    }
    
    handleLabels=(labels)=>{
        this.setState({labels})
    }

    onAdd=()=>{
        this.props.onAddToy(this.state)
        this.setState({
            name:'',
            price:0,
            labels: [],
            inStock: true,
        })
    }

    render(){
        const {name,price,labels,inStock} = this.state
        return <section className="toy-add-title">
          <h5>Add a new toy:</h5>
          <div className="toy-add">
              <input type="text" autoComplete="off" name="name" onChange={this.handleChange} value={name} placeholder="Toy name"/>
              <input type="number" autoComplete="off" name="price" onChange={this.handleChange} value={price} title="Price"/>
              <Select 
                  value={labels} 
                  onChange={this.handleLabels} 
                  name="labels" 
                  options={options} 
                  closeMenuOnSelect={false} 
                  isMulti 
                  styles={colourStyles}
                  className="toy-add-labels"
                  classNamePrefix="labels"
                  placeholder="Labels"
              />
              <input type="checkBox" name="inStock" onChange={this.handleChange} checked={inStock} title="In Stock?"/>
              <button onClick={this.onAdd}>Add</button>
          </div>
        </section>
    }
}

function mapStateToProps(state){
    return {
        toys: state.toyModule.toys,
    }
}

const mapDispatchToProps = {
    onAddToy,
}


export const ToyAdd = connect(mapStateToProps, mapDispatchToProps)(_ToyAdd)
