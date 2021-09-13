import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';

import { onLogin, onLogout } from '../store/user.actions.js';
// import { updateChart } from '../services/chart.service.js';
// import { UserMsg } from './user-msg.jsx';
// import { LoginSignup } from './login-signup.jsx';


class _AppHeader extends React.Component {

    state={
        anchorEl:null,
        username:'',
        password:''
    }

    activeLink=this.props.location.pathname.substr(1);

    componentDidMount() {
        // updateChart()
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user!==this.props.user){
            this.handleClose()
        }
    }
    
    onLogin = () => {
        this.handleClose()
        const credentials = {username:this.state.username,password:this.state.password}
        this.props.onLogin(credentials)
        .then(()=>this.props.history.push('/toy'));
    };
    
    onLogout = () => {
        this.handleClose()
        this.props.onLogout();
    };

    form=null;
    handleMenu = (ev) => {
        this.setState({anchorEl:ev.currentTarget},()=>{if (this.form) this.form.focus()});
    };
    
    handleClose = () => {
        this.setState({anchorEl:null});
    };

    handleChange =({target})=>{
        this.setState({[target.name]:target.value})
    }

    handleKey = (ev) => {
        ev.stopPropagation()
        if (ev.code==='Enter') this.onLogin()
    }
    
    render() {
        const { user } = this.props;
        const open = Boolean(this.state.anchorEl)

        return (
            <header style={{flexGrow:'1'}}>
                <AppBar position='static'>
                    <Toolbar>
                        {/* <IconButton edge='start' style={{marginRight: '10px'}} color='inherit' aria-label='menu'>
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant='h6' style={{flexGrow:'1'}}>
                            Toy Store
                        </Typography>
                        <Button color='inherit' className={this.activeLink==='home'?'active':''} onClick={()=>{
                            this.activeLink='home'
                            this.props.history.push('/')
                            }}>Home</Button>
                        <Button color='inherit' className={this.activeLink==='toy'?'active':''} onClick={()=>{
                            this.activeLink='toy'
                            this.props.history.push('/toy')
                            }}>Our Toys</Button>
                        <Button color='inherit' className={this.activeLink==='dashboard'?'active':''} onClick={()=>{
                            this.activeLink='dashboard'
                            this.props.history.push('/dashboard')
                            }}>Dashboard</Button>
                        <Button color='inherit' className={this.activeLink==='about'?'active':''} onClick={()=>{
                            this.activeLink='about'
                            this.props.history.push('/about')
                            }}>About</Button>
                        {user && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                    {user.fullname}
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.onLogout}>Logout</MenuItem>
                                    {/* <MenuItem onClick={this.handleClose}>Close</MenuItem> */}
                                </Menu>
                            </div>
                        )}
                        {!user&&<div>
                            <Button color='inherit' onClick={this.handleMenu}>Login</Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <form noValidate autoComplete="off" onSubmit={this.onLogin} style={{padding:'15px'}}>
                                    <TextField id="username" size="small" inputRef={el=>{this.form=el}} name="username" label="Username" variant="outlined" onChange={this.handleChange} onKeyDown={this.handleKey}/>
                                    <TextField id="password" size="small" name="password" label="Password" variant="outlined" type="password" onChange={this.handleChange} onKeyDown={this.handleKey} style={{margin:'0 10px'}}/>
                                    <Button variant="contained" color="primary" onClick={this.onLogin}>Login</Button>
                                </form>
                                <MenuItem onClick={()=>{
                                    this.handleClose()
                                    this.props.history.push('/signup')
                                    }}>Signup</MenuItem>
                                {/* <MenuItem onClick={this.handleClose}>Close</MenuItem> */}
                            </Menu>
                            </div>    
                        }
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        toys: state.toyModule.toys
    };
}
const mapDispatchToProps = {
    onLogin,
    onLogout
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader));
