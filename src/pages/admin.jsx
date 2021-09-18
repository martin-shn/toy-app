import React from 'react'
import { connect } from 'react-redux'
import { userService } from '../services/user.service';
import {Loader} from '../cmps/loader'
import {UsersList} from '../cmps/users-list'
import {UserFilter} from '../cmps/user-filter'

class _Admin extends React.Component{
    state={
        users: null,
        filterBy: {name: '', isAdmin:'all'}
    }
    
    componentDidMount() {
        this.loadUsers()
    }
    
    loadUsers = async (filterBy={}) => {    
        const users = await userService.userQuery(filterBy)
        this.setState({users, filterBy})    
    }

    onRemoveUser= async (user)=>{
        await userService.removeUser(user)
        this.loadUsers()
    }

    render(){
        const user = userService.getLoggedinUser();
        const userAuth = user && user.isAdmin
        if (!userAuth) this.props.history.push('/')
        
        const users = this.state.users
        if (!users) return <Loader />
        return <section className="admin">
            <UserFilter  currFilter={this.state.filterBy} filter={(filterBy)=>{this.loadUsers(filterBy)}}/>
                    <hr/>
                    <main className="main-container">
                        {users.length>0&&<UsersList users={users} history={this.props.history} onRemoveUser={this.onRemoveUser}/>}
                        {users.length===0&&<div>No users yet. Please add some users.</div>}
                    </main>
        </section>
    }
}


function mapStateToProps(state){
    return {toys: state.toyModule.toys}
}

const mapDispatchToProps = {
}


export const Admin = connect(mapStateToProps, mapDispatchToProps)(_Admin)
