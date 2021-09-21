import React from 'react'
import { connect } from 'react-redux'

import { Loader } from '../cmps/loader';
import Button from '@material-ui/core/Button';
import { userService } from '../services/user.service';


class _UserEdit extends React.Component{
    state={
        _id: null,
        fullname: '',
        username: 0,
        isAdmin: false,
        isSaving: false
    }

    async componentDidMount(){
      const userId = this.props.match.params.userId
      const currUser = userService.getLoggedinUser()
      if (!(userId && currUser && currUser.isAdmin)) this.onBack()
      try{
          const user = await userService.getUserById(userId)
          if(Object.keys(user).length===0) this.onBack()
          else this.setState({...user})
      } catch(err){
        console.log('Cannot get user by Id');
      }
    }
  

    handleChange=({target})=>{
        if (target.name==='isAdmin') this.setState({[target.name]:target.checked})
        else this.setState({[target.name]:target.value})
    }

    onSave = async ()=>{
      this.setState({isSaving:true})
      try{
        const userToSave = {...this.state}
        delete userToSave.isSaving
        await userService.update(userToSave)
        this.onBack()
      } catch(err){
        console.log('Cannot edit toy');
        this.setState({isSaving:false})
      }
    }

    onBack=()=>{
        this.props.history.push({pathname:'/admin'})
    }

    render(){
        const user = this.state
        if (!user._id || this.state.isSaving) return <Loader/>
        // console.log(toy);
        return <section className="user-edit">
            <h2>Full Name:</h2>
            <input type="text" autoComplete="off" autoFocus onChange={this.handleChange} name="fullname" value={user.fullname}/>
            <h3>Username:</h3>
            <input type="text" autoComplete="off" onChange={this.handleChange} name="username" value={user.username}/>
            <h5>Created At: {new Date(Date.parse(user.createdAt)).toLocaleString('en-GB')}</h5>
            {user.updatedAt&&<h5>Last updated At: {new Date(user.updatedAt).toLocaleString('en-GB')}</h5>}
            <input id="isAdmin" type="checkBox" disabled={user.isOwner?true:false} name="isAdmin" onChange={this.handleChange} checked={user.isAdmin}/>
            <label htmlFor="isAdmin">Is Admin?</label>
            <div className="btns">
              <Button variant="contained" color="primary" onClick={this.onSave}>Save</Button>
              <Button variant="contained" onClick={this.onBack}>Back</Button>
            </div>
        </section>
    }
}

function mapStateToProps(state){
    return state
}

const mapDispatchToProps = {
}


export const UserEdit = connect(mapStateToProps, mapDispatchToProps)(_UserEdit)
