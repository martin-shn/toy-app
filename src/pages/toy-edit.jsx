import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import chroma from 'chroma-js';
import Button from '@material-ui/core/Button';

import { Loader } from '../cmps/loader';
import { toyService } from '../services/toy.service';
import {uploadImg} from '../services/cloudinary-service'
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

    async componentDidMount(){
      const {user} = this.props
      if(!user) this.onBack()
      else {
        const toyId = this.props.match.params.toyId
        try{
            const toy = await toyService.getById(toyId)
            if(Object.keys(toy).length===0) this.onBack()
            const userAuth = user && user.isAdmin
            if (!userAuth) this.onBack()
            else this.setState({...toy})
        } catch(err){
          console.log('Cannot get toy by Id');
        }
      }
    }

    handleChange=({target})=>{
        if (target.name==='inStock') this.setState({[target.name]:target.checked})
        else this.setState({[target.name]:target.value})
    }

    handleLabels=(labels)=>{
        this.setState({...this.state,labels})
    }

    handleFile = async (ev) => {
      const imgUrl = await uploadImg(ev)
      this.setState({imgUrl})
    }

    onSave= async ()=>{
      try{  
        await this.props.onEditToy(this.state)
        this.onBack()
      } catch(err){
        console.log('Cannot edit toy');
      }
    }

    onBack=()=>{
        this.props.history.push({pathname:'/toy'})
    }

    render(){
        const toy = this.state
        if (!toy._id) return <Loader/>
        // console.log(toy);
        return <section className="toy-edit">
            <img alt="Toy img" src={toy.imgUrl?toy.imgUrl:`https://robohash.org/${toy.name}?set=set4`} />
            <label htmlFor="toy-pic">Choose a toy image:</label>
            <input type="file"
              id="toy-pic" name="toy-img"
              accept="image/png, image/jpeg"
              onChange={this.handleFile}/>
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
            <h5>Created by: {toy.createdBy.fullname}</h5>
            {toy.updatedAt&&<h5>Last updated At: {new Date(toy.updatedAt).toLocaleString('en-GB')}</h5>}
            {toy.lastUpdatedBy&&<h5>Last updated by: {toy.lastUpdatedBy.fullname}</h5>}
            <input id="inStock" type="checkBox" name="inStock" onChange={this.handleChange} checked={toy.inStock}/>
            <label htmlFor="inStock">In Stock?</label>
            <div className="btns">
              <Button variant="contained" color="primary" onClick={this.onSave}>Save</Button>
              <Button variant="contained" onClick={this.onBack}>Back</Button>
            </div>
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
