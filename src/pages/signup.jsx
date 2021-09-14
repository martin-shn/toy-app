import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { onSignup } from '../store/user.actions.js';
import * as yup from 'yup';
import { useFormik } from 'formik';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NicePopup } from '../cmps/nice-popup.jsx';

const validateInput = yup.object({
    fullname: yup.string('Enter your full name').required('Full name is required'),
    username: yup.string('Enter your username').required('Username is required'),
    password: yup.string('Enter your password').required('Password is required'),
});

let form=null;

function _Signup(props) {

    useEffect( () => {
        if (form) form.focus()
     }, []);


    const [isError, setIsError] = useState(false)


    const signup = async (credentials) => {
        try {
            await props.onSignup(credentials);
            props.history.push('/toy')
        } catch(err){
            setIsError(true)
        }
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
            {isError&&<NicePopup header={<h1>Cannot Signup</h1>} footer='Please contact admin' top='50%' left='50%' bgc='#f66'>
                    Something went wrong.
                </NicePopup>}
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
