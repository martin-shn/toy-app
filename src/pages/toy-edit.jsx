import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import chroma from 'chroma-js';

import { toyService } from '../services/toy.service';
import { onEditToy } from '../store/toy.actions';

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


class _ToyEdit extends React.Component{
    state={
        name:'',
        price:0,
        labels:[],
        inStock: false,
    }

    componentDidMount(){
      const {user} = this.props
      if(!user) this.onBack()
      else {
        const toyId = this.props.match.params.toyId
        toyService.getById(toyId)
        .then(toy=>{
          if(Object.keys(toy).length===0) this.onBack()
          const userAuth = user && (user._id===toy.owner._id || user.isAdmin)
          if (!userAuth) this.onBack()
          else this.setState({...toy})
          })
      }
    }

    handleChange=({target})=>{
        if (target.name==='inStock') this.setState({[target.name]:target.checked})
        else this.setState({[target.name]:target.value})
    }

    handleLabels=(labels)=>{
        this.setState({...this.state,labels})
    }

    onSave=()=>{
        this.props.onEditToy(this.state)
        .then(()=>this.onBack())
    }

    onBack=()=>{
      const sortBy = new URLSearchParams(window.location.search).get('sortBy')
        this.props.history.push({pathname:'/toy',search:sortBy?'sortBy='+sortBy:''})
    }

    render(){
        const toy = this.state
        if (!toy._id) return <div>Loading...</div>
        console.log(toy);
        return <section className="toy-edit">
            <h2>Name:</h2>
            <input type="text" autoComplete="off" autoFocus onChange={this.handleChange} name="name" value={toy.name}/>
            <h3>Price:</h3>
            <input type="number" onChange={this.handleChange} name="price" value={toy.price}/>
            <div className="labels">
                <Select 
                    value={toy.labels} 
                    onChange={this.handleLabels} 
                    name="labels" 
                    options={options} 
                    closeMenuOnSelect={false} 
                    isMulti 
                    styles={colourStyles}
                />
            </div>
            <h5>Created At: {new Date(toy.createdAt).toLocaleString('en-GB')}</h5>
            <h5>Created by: {toy.owner.fullname}</h5>
            <input id="inStock" type="checkBox" name="inStock" onChange={this.handleChange} checked={toy.inStock}/>
            <label htmlFor="inStock">In Stock?</label>
            <button onClick={this.onSave}>Save</button>
            <button onClick={this.onBack}>Back</button>
        </section>
    }
}

function mapStateToProps(state){
    return {
        toys: state.toyModule.toys,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onEditToy
}


export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)