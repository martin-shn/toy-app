import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { onSignup } from '../store/user.actions.js';
import * as yup from 'yup';
import { useFormik } from 'formik';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const validateInput = yup.object({
    fullname: yup.string('Enter your full name').required('Full name is required'),
    username: yup.string('Enter your username').required('Username is required'),
    password: yup.string('Enter your password').required('Password is required'),
});

function _Signup(props) {
    // state = {};

    // handleChange = ({ target }) => {
    //     this.setState({ [target.name]: target.value });
    // };

    let form=null;
    setTimeout(()=>{
        if (form) form.focus()
    },50)


    const signup = (credentials) => {
        props.onSignup(credentials);
        props.history.push('/toy')
    };


    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            password: '',
        },
        validationSchema: validateInput,
        onSubmit: (values) => {
            signup({ ...values });
        },
        onReset: (ev) => {
            ev.preventDefault()
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
            <TextField
                id='fullname'
                fullWidth
                autoFocus
                // size='small'
                name='fullname'
                label='Full Name *'
                variant='outlined'
                style={{marginTop:'25px'}}
                // required
                inputRef={el=>{form=el}}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                helperText={formik.touched.fullname && formik.errors.fullname}
            />
            <TextField
                id='username'
                fullWidth
                // size='small'
                name='username'
                label='Username *'
                variant='outlined'
                style={{margin:'25px 0'}}
                // required
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
                id='password'
                fullWidth
                // size='small'
                name='password'
                label='Password *'
                variant='outlined'
                type='password'
                style={{marginBottom:'25px'}}
                // required
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button type='submit' variant='contained' color='primary' style={{margin: '0 auto', display: "flex",marginBottom:'40px'}}>
                Sign up
            </Button>
        </form>
    );
}

const mapDispatchToProps = {
    onSignup,
};
export const Signup = connect(null, mapDispatchToProps)(withRouter(_Signup));
