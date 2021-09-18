import React from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/user.service';
import {Loader} from '../cmps/loader.jsx'


class _UserDetails extends React.Component{
    state={
        user:{}
    }

    async componentDidMount(){
        try{
            const userId = this.props.match.params.userId
            const user = await userService.getUserById(userId)
                if(Object.keys(user).length===0) this.onBack()
                this.setState({user})
        }catch(err){
            console.log('Cannot get by Id');
            this.onBack();
        }
    }

    onBack=()=>{
        this.props.history.push({pathname:'/admin'})
    }

    render(){
        const currUser = userService.getLoggedinUser()
        if (!(currUser && currUser.isAdmin)) this.props.history.push('/')
        const {user} = this.state
        if (Object.keys(user).length===0) return <Loader/>
        // console.log(user);
        return <section className="user-details">
            <h2>Full Name: {user.fullname}</h2>
            <h3 style={{textTransform:'none'}}>Username: {user.username}</h3>
            <h5>Created At: {new Date(Date.parse(user.createdAt)).toLocaleString('en-GB')}</h5>
            {user.updatedAt&&<h5>Last updated At: {new Date(user.updatedAt).toLocaleString('en-GB')}</h5>}
            <h4 className={user.isAdmin?'in-stock':'out-stock'}>{user.isAdmin?'Admin':'NOT Admin'}</h4>
            <button onClick={this.onBack}>Back</button>
        </section>
    }
}

function mapStateToProps(state){
    return state
}

const mapDispatchToProps = {
}


export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)
