import React from 'react'
import { connect } from 'react-redux'
import { toyService } from '../services/toy.service';
import {Chat} from '../cmps/chat'
import {Loader} from '../cmps/loader'
import {ReviewAdd} from '../cmps/review-add'
import {ReviewList} from '../cmps/review-list'
import Button from '@material-ui/core/Button';


class _ToyDetails extends React.Component{
    state={
        toy:{}
    }

    async componentDidMount(){
        try{
            const toyId = this.props.match.params.toyId
            const toy = await toyService.getById(toyId)
                if(Object.keys(toy).length===0) this.onBack()
                this.setState({toy})
        }catch(err){
            console.log('Cannot het by Id');
            this.onBack();
        }
    }

    onBack=()=>{
        this.props.history.push({pathname:'/toy'})
    }

    render(){
        const {toy} = this.state
        if (Object.keys(toy).length===0) return <Loader/>
        // console.log(toy);
        return <section className="toy-details">
            <img alt="Toy img" src={toy.imgUrl?toy.imgUrl:`https://robohash.org/${toy.name}?set=set4`} />
            <h2>Name: {toy.name}</h2>
            <h3>Price: {toy.price.toFixed(2)}$</h3>
            <div className="labels">
                <h4>{toy.labels.map(label=><label key={label.value} className={label.value}>{label.label}</label>)}</h4>
            </div>
            <h5><span>Created At:</span> {new Date(toy.createdAt).toLocaleString('en-GB')}</h5>
            <h5><span>Created by:</span> {toy.createdBy.fullname}</h5>
            {toy.updatedAt&&<h5><span>Last updated At:</span> {new Date(toy.updatedAt).toLocaleString('en-GB')}</h5>}
            {toy.lastUpdatedBy&&<h5><span>Last updated by:</span> {toy.lastUpdatedBy.fullname}</h5>}
            <h4 className={toy.inStock?'in-stock':'out-stock'}>{toy.inStock?'In Stock':'NOT In Stock'}</h4>
            <div className="toy-details-reviews">
                <ReviewAdd toyId={this.props.match.params.toyId}/>
                <ReviewList toyId={this.props.match.params.toyId}/>
            </div>
            <Button variant="contained" color="primary" onClick={this.onBack}>Back</Button>
            <Chat/>
        </section>
    }
}

function mapStateToProps(state){
    return {toys: state.toyModule.toys}
}

const mapDispatchToProps = {
}


export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)
