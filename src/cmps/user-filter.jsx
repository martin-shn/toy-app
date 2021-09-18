import React from 'react'
import { connect } from 'react-redux'
import {DebounceInput} from 'react-debounce-input';


class _UserFilter extends React.Component{
    state={
        filterBy:{
          fullname: this.props.currFilter.name||'',
          isAdmin: this.props.currFilter.isAdmin?'admin':'user'||'all'
        }
    }

    componentDidMount() {
    }
    

    handleChange=({target})=>{
        this.setState({filterBy:{...this.state.filterBy,[target.name]:target.value}},()=>this.setFilter())
    }
    
    setFilter=()=>{
      const filterBy = this.state.filterBy
      switch (filterBy.isAdmin){
        case 'all':
          delete filterBy.isAdmin
          break
        case 'admin':
          filterBy.isAdmin=true;
          break
        case 'user':
          filterBy.isAdmin=false
          break
        default:
      }
        this.props.filter(filterBy)
    }
    

    render(){
      let isAdmin;
      if (!Object.keys(this.props.currFilter).includes('isAdmin')) isAdmin='all'
      else isAdmin = this.props.currFilter.isAdmin?'admin':'user'
        return <div className="main-container filter-container">
        <div className="filter">
                    <label>User Filter:</label>
                    <DebounceInput
                      // minLength={2}
                      debounceTimeout={400}
                      type="search" 
                      name="fullname" 
                      autoComplete="off"
                      placeholder="Filter"
                      value={this.state.filterBy.fullname}
                      style={{flexGrow:'1'}}
                      onChange={this.handleChange} />

                    <select name="isAdmin" onChange={this.handleChange} value={isAdmin}>
                        <option value="all" defaultValue>All</option>
                        <option value="admin">Admins</option>
                        <option value="user">Users</option>
                    </select>

            </div>
        </div>
    }
}



function mapStateToProps (state){
    return state
}

export const UserFilter = connect(mapStateToProps)(_UserFilter)
