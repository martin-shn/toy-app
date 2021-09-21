import React from 'react'
import { connect } from 'react-redux'

import {addReview} from '../store/review.actions.js'
import Button from '@material-ui/core/Button';
// import Rating from '@mui/lab/Rating';
import { Rating } from '@mui/material';

class _ReviewAdd extends React.Component{
    state={
        txt:'',
        rating: 1
    }

    handleChange=({target})=>{
        if (target.name==='rating') this.setState({[target.name]:+target.value})
        else this.setState({[target.name]:target.value})
    }
    
    onAdd= async ()=>{
      try {
        const reviewToAdd = {...this.state}
        reviewToAdd.aboutToyId = this.props.toyId
        await this.props.addReview(reviewToAdd)
        this.setState({
            txt:'',
            rating:0,
        })
      } catch(err){
        console.log('Cannot add review', err);
      }
    }

    render(){
        const {txt, rating} = this.state
        const {user} = this.props
        if (!user) return <></>
        return <section className="review-add-container">
          <h5>Add a new review:</h5>
          <div className="review-add">
            <div className="rating-stars">
                <label>{rating}/5</label>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={this.handleChange}
                    onChangeActive={this.handleChange}
                />
            </div>
            <textarea style={{resize: 'none'}} name="txt" onChange={this.handleChange} value={txt} placeholder="Review goes here..."/>
            <Button onClick={this.onAdd} variant="contained" color="secondary">Add review</Button>
          </div>
        </section>
    }
}

function mapStateToProps(state){
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    addReview,
}


export const ReviewAdd = connect(mapStateToProps, mapDispatchToProps)(_ReviewAdd)
