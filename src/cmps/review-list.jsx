import React from 'react'
import { connect } from 'react-redux'

import {loadReviews, removeReview} from '../store/review.actions.js'
import Button from '@material-ui/core/Button';
// import Rating from '@mui/lab/Rating';
import { Rating } from '@mui/material';

class _ReviewList extends React.Component{
    state={}

    componentDidMount() {
        if (this.props.userId) this.props.loadReviews({userId:this.props.userId, sort:'date'});
        else if (this.props.toyId) this.props.loadReviews({toyId:this.props.toyId, sort:'date'});
        else this.props.loadReviews();
    }
    
    render(){
        const {user,reviews} = this.props
        if (!user) return <></>
        return <div className="reviews">
            {reviews.map((review,idx)=>{
            return <div key={idx} className="review">
                {(review.byUser._id===user._id||user.isAdmin)&&<Button onClick={()=>{this.props.removeReview(review._id)}} color="secondary" title="Delete review">X</Button>}
                <a className="name" href={`/user/${review.byUser._id}`}><span>Name:</span>{review.byUser.fullname}</a> 
                <label className="date"><span>Date:</span>{new Date(Date.parse(review.date)).toLocaleString('en-GB')}</label> 
                <div className="reviews-stars">
                    <label className="rating">{review.rating}/5</label>
                    <Rating className="stars" value={review.rating} readOnly />
                </div>
                <textarea className="txt" readOnly value={review.txt} />
            </div>})}
          </div>
    }
}

function mapStateToProps(state){
    return {
        user: state.userModule.user,
        reviews: state.reviewModule.reviews
    }
}

const mapDispatchToProps = {
    loadReviews,
    removeReview
}


export const ReviewList = connect(mapStateToProps, mapDispatchToProps)(_ReviewList)
