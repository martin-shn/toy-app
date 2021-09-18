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
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { NicePopup } from './nice-popup.jsx';

import { onLogin, onLogout } from '../store/user.actions.js';
// import { updateChart } from '../services/chart.service.js';
// import { UserMsg } from './user-msg.jsx';
// import { LoginSignup } from './login-signup.jsx';


class _AppHeader extends React.Component {

    state={
        anchorEl:null,
        username:'',
        password:'',
        isOpen:false,
        error: false,
        activeLink:null
    }

    
    componentDidMount() {
        // updateChart()
        this.setState({activeLink:this.props.location.pathname.substr(1)})
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user!==this.props.user){
            this.handleClose()
        }
    }
    
    onLogin = async () => {
        this.setState({isOpen:false})
        this.handleClose()
        const credentials = {username:this.state.username,password:this.state.password}
        try{
            await this.props.onLogin(credentials)
            this.setState({isOpen:false, activeLink:'toy'})
            this.props.history.push('/toy')
        } catch(err){
            this.setState({error:true})
        }
    };
    
    onLogout = () => {
        this.handleClose()
        this.props.onLogout().then(()=>{
            this.setState({isOpen:false, activeLink:'home'})
            this.props.history.push('/');
        });
    };

    form=null;
    handleMenu = (ev) => {
        ev.stopPropagation()
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

    toggleMenu=(ev)=>{
        ev.stopPropagation()
        this.setState({isOpen:!this.state.isOpen})
    }
    
    render() {
        const { user } = this.props;
        const open = Boolean(this.state.anchorEl)
        document.body.addEventListener('click',()=>{
            if (this.state.isOpen) this.setState({isOpen:false})
        })
        
        if (this.state.error===true) setTimeout(() => {
            this.setState({error:false})
        }, 10000);

        return (
            <header className="main-header">
                {this.state.error&&<NicePopup header={<h1>Cannot Login</h1>} footer='Please try again' top='50%' left='50%' bgc='#f66'>
                    Wrong username and/or password
                </NicePopup>}
                <AppBar position='static'>
                    <Toolbar>
                        {/* <IconButton edge='start' style={{marginRight: '10px'}} color='inherit' aria-label='menu'>
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant='h6' style={{flexGrow:'1'}}>
                            Toy Store
                        </Typography>
                        <div className={`hamburger-menu-btn ${this.state.isOpen?'open':'close'}`} onClick={(ev)=>{this.toggleMenu(ev)}}>{this.state.isOpen?<CloseIcon/>:<MenuIcon/>}</div>
                        <div className="hamburger">
                        <Button color='inherit' className={this.state.activeLink==='home'?'active':''} onClick={()=>{
                            this.setState({isOpen:false})
                            this.setState({activeLink:'home'})
                            this.props.history.push('/')
                            }}>Home</Button>
                        <Button color='inherit' className={this.state.activeLink==='toy'?'active':''} onClick={()=>{
                            this.setState({isOpen:false})
                            this.setState({activeLink:'toy'})
                            this.props.history.push('/toy')
                            }}>Our Toys</Button>
                        <Button color='inherit' className={this.state.activeLink==='dashboard'?'active':''} onClick={()=>{
                            this.setState({isOpen:false})
                            this.setState({activeLink:'dashboard'})
                            this.props.history.push('/dashboard')
                            }}>Dashboard</Button>
                        {user && user.isAdmin && <Button color='inherit' className={this.state.activeLink==='admin'?'active':''} onClick={()=>{
                            this.setState({isOpen:false})
                            this.setState({activeLink:'admin'})
                            this.props.history.push('/admin')
                            }}>Admin</Button>}
                        <Button color='inherit' className={this.state.activeLink==='about'?'active':''} onClick={()=>{
                            this.setState({isOpen:false})
                            this.setState({activeLink:'about'})
                            this.props.history.push('/about')
                            }}>About</Button>
                        {user && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={(ev)=>{this.handleMenu(ev)}}
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
                                <form noValidate autoComplete="off" onSubmit={this.onLogin} style={{padding:'15px',display:'flex',gap:'15px',flexDirection:'column'}}>
                                    <TextField id="username" size="small" inputRef={el=>{this.form=el}} name="username" label="Username" variant="outlined" onChange={this.handleChange} onKeyDown={this.handleKey}/>
                                    <TextField id="password" size="small" name="password" label="Password" variant="outlined" type="password" onChange={this.handleChange} onKeyDown={this.handleKey}/>
                                    <Button variant="contained" color="primary" onClick={this.onLogin}>Login</Button>
                                </form>
                                <MenuItem onClick={()=>{
                                    this.setState({isOpen:false, activeLink:null})
                                    this.handleClose()
                                    this.props.history.push('/signup')
                                    }}>Signup</MenuItem>
                                {/* <MenuItem onClick={this.handleClose}>Close</MenuItem> */}
                            </Menu>
                            </div> 
                        }
                        </div>   
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
