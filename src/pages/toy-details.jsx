import React from 'react'
import { connect } from 'react-redux'
import { toyService } from '../services/toy.service';


class _ToyDetails extends React.Component{
    state={
        toy:{}
    }

    componentDidMount(){
        const toyId = this.props.match.params.toyId
        toyService.getById(toyId)
            .then(toy=>{
                if(Object.keys(toy).length===0) this.onBack()
                this.setState({toy})
            })
    }

    onBack=()=>{
        const sortBy = new URLSearchParams(window.location.search).get('sortBy')
        this.props.history.push({pathname:'/toy',search:sortBy?'sortBy='+sortBy:''})
    }

    render(){
        const {toy} = this.state
        if (Object.keys(toy).length===0) return <div>Loading...</div>
        // console.log(toy);
        return <section className="toy-details">
            <h2>Name: {toy.name}</h2>
            <h3>Price: {toy.price}</h3>
            <div className="labels">
                <h4>{toy.labels.map(label=><label key={label.value} className={label.value}>{label.label}</label>)}</h4>
            </div>
            <h5>Created At: {new Date(toy.createdAt).toLocaleString('en-GB')}</h5>
            <h5>Created by: {toy.owner.fullname}</h5>
            <h4 className={toy.inStock?'in-stock':'out-stock'}>{toy.inStock?'In Stock':'NOT In Stock'}</h4>
            <div className="toy-details-reviews">
                {toy.reviews.map((review,idx)=><div key={idx}>{review}</div>)}
            </div>
            <button onClick={this.onBack}>Back</button>
        </section>
    }
}

function mapStateToProps(state){
    return {toys: state.toyModule.toys}
}

const mapDispatchToProps = {
}


export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)
