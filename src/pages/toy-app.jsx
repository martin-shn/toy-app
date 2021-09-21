import React from 'react'
import { connect } from 'react-redux'


import { loadToys, onAddToy, onEditToy, onRemoveToy } from '../store/toy.actions.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyAdd } from '../cmps/toy-add.jsx'
import { Filter as ToyFilter } from '../cmps/filter.jsx'
import { Loader } from '../cmps/loader';
// import { updateChart } from '../services/chart.service.js';
// import { showSuccessMsg } from '../services/event-bus.service.js'

class _ToyApp extends React.Component {
    state = {
    }

    componentDidMount() {
        this.props.filterBy?this.props.loadToys(this.props.filterBy):this.props.loadToys()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.filterBy!==this.props.filterBy){
            // console.log('new props', this.props.filterBy);
            this.props.loadToys(this.props.filterBy)
        }
    }
    

    onRemoveToy = (toy) => {
        this.props.onRemoveToy(toy)
    }

    onEditToy = (toy) => {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }
        this.props.onEditToy(toyToSave)
    }
    
    render() {
        const {toys,user}=this.props
        if (!toys) return <Loader/>
        return (
            <div className="full">
                <ToyFilter/>
                <hr/>
                <main className="main-container">
                    {user?.isAdmin&&<ToyAdd/>}
                    {toys.length>0&&<ToyList user={user} toys={toys} history={this.props.history} onRemoveToy={this.props.onRemoveToy}/>}
                    {toys.length===0&&<div>Nothing to show here yet. Please add some toys.</div>}
                    {!user&&<strong>To add/edit toys - you must login!</strong>}
                </main>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        toys: state.toyModule.toys,
        user: state.userModule.user,
        filterBy: state.toyModule.filterBy
    }
}

const mapDispatchToProps = {
    loadToys,
    onRemoveToy,
    onAddToy,
    onEditToy,
}


export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)
