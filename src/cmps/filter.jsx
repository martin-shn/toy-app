import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import chroma from 'chroma-js';
import {DebounceInput} from 'react-debounce-input';

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

class _Filter extends React.Component{
    state={
        filterBy:{...this.props.filterBy}||{}
    }

    componentDidMount() {
        this.setFilter(this.props.filterBy)
    }
    

    handleChange=({target})=>{
        this.setState({filterBy:{...this.state.filterBy,[target.name]:target.value}},()=>this.setFilter())
    }
    
    handleLabels=(labels)=>{
        this.setState({filterBy:{...this.state.filterBy,labels:labels}},()=>this.setFilter())
    }

    setFilter=(filterBy=this.state.filterBy)=>{
      
        this.props.dispatch({
            type: 'SET_FILTER',
            filterBy
        })
    }
    

    render(){
        return <div className="main-container filter-container">
        <div className="filter">
                    <label>Filter:</label>
                    <DebounceInput
                      // minLength={2}
                      debounceTimeout={1000}
                      type="search" 
                      name="txt" 
                      autoComplete="off"
                      placeholder="Filter"
                      value={this.state.filterBy.txt}
                      onChange={this.handleChange} />

                    <select name="inStock" onChange={this.handleChange} value={this.state.filterBy.inStock}>
                        <option value="all" defaultValue>All</option>
                        <option value="inStock">In stock</option>
                        <option value="outStock">Out of stock</option>
                    </select>

                    <Select 
                    value={this.state.filterBy.labels} 
                    onChange={this.handleLabels} 
                    name="labels" 
                    options={options} 
                    closeMenuOnSelect={true} 
                    isMulti 
                    styles={colourStyles}
                    className="filter-labels"
                    classNamePrefix="labels"
                    placeholder="Labels"
                />
                    <select name="sort" onChange={this.handleChange} value={this.state.filterBy.sort} title="Sort by...">
                        <option value="name" defaultValue>Name (A-&gt;Z)</option>
                        <option value="reverse-name" defaultValue>Name (Z-&gt;A)</option>
                        <option value="price">Price (Low-&gt;High)</option>
                        <option value="reverse-price">Price (High-&gt;Low)</option>
                        <option value="created">Created date (Newer-&gt;Oldest)</option>
                        <option value="reverse-created">Created date (Oldest-&gt;Newest)</option>
                    </select>
            </div>
            </div>
    }
}



function mapStateToProps (state){
    return {
        filterBy:state.toyModule.filterBy
    }
}

export const Filter = connect(mapStateToProps)(_Filter)
